import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	NodeApiError,
	IHttpRequestMethods,
	IHttpRequestOptions,
	JsonObject,
} from 'n8n-workflow';

/**
 * Format a DateTime value to ISO 8601 format required by Qonto API.
 * The Qonto API requires DateTime values in the format: "2025-12-20T10:00:00Z"
 *
 * @param {string} dateTimeValue - The input DateTime value from the n8n UI
 * @returns {string} - The formatted DateTime string in ISO 8601 format with UTC timezone (without milliseconds)
 */
export function formatDateTime(dateTimeValue: string): string {
	const date = new Date(dateTimeValue);
	// Format as ISO 8601 without milliseconds: "2025-12-20T10:00:00Z"
	return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

/**
 * Format a Date value to date-only format required by Qonto API.
 * The Qonto API requires Date values in the format: "2025-12-20"
 *
 * @param {string} dateValue - The input Date value from the n8n UI
 * @returns {string} - The formatted Date string in YYYY-MM-DD format
 */
export function formatDate(dateValue: string): string {
	const date = new Date(dateValue);
	// Format as date only: "2025-12-20"
	return date.toISOString().split('T')[0];
}

/**
 * Format a single error item into a string
 */
function formatErrorItem(item: unknown): string {
	if (typeof item === 'string') return item;
	if (item && typeof item === 'object' && 'message' in item) {
		return String((item as JsonObject).message);
	}
	return JSON.stringify(item);
}

/**
 * Extract error message from Qonto API error response
 */
function extractErrorMessage(error: unknown): string {
	if (error && typeof error === 'object') {
		const err = error as JsonObject;
		// Check for Qonto API error format
		if (err.message) {
			return String(err.message);
		}
		if (err.error) {
			return String(err.error);
		}
		if (err.errors && Array.isArray(err.errors)) {
			return err.errors.map(formatErrorItem).join(', ');
		}
		// Check for response body with error
		if (err.response && typeof err.response === 'object') {
			const response = err.response as JsonObject;
			if (response.body && typeof response.body === 'object') {
				const body = response.body as JsonObject;
				if (body.message) return String(body.message);
				if (body.error) return String(body.error);
			}
		}
		// Check for cause with response
		if (err.cause && typeof err.cause === 'object') {
			const cause = err.cause as JsonObject;
			if (cause.message) return String(cause.message);
		}
	}
	return '';
}

/**
 * Make an API request to Qonto
 *
 * @param {IExecuteFunctions} this
 * @param {IDataObject} headers
 * @param {string} method
 * @param {string} endpoint
 * @param {IDataObject} body
 * @param {IDataObject} query
 * @returns {Promise<IDataObject>}
 */
export async function qontoApiRequest(
	this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	headers: IDataObject,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	isFileUpload: boolean = false,
): Promise<IDataObject> {
	const authenticationMethod = this.getNodeParameter('authentication', 0) as string;
	const credentials = await this.getCredentials(
		authenticationMethod === 'logKey' ? 'qontoApi' : 'qontoOAuth2Api',
	);

	const baseUrl =
		credentials.environment === 'sandbox'
			? 'https://thirdparty-sandbox.staging.qonto.co/v2'
			: 'https://thirdparty.qonto.com/v2';

	const url = `${baseUrl}/${endpoint}`;

	// Ensure that url is always defined
	if (!url || typeof url !== 'string') {
		throw new NodeApiError(this.getNode(), { message: 'The URL for the API request is invalid.' });
	}

	const options: IHttpRequestOptions = {
		method,
		url,
		qs: query,
		body,
		headers: {
			...headers,
		},
	};

	// Add X-Qonto-Staging-Token header for sandbox environment
	if (credentials.environment === 'sandbox' && credentials.stagingToken) {
		options.headers!['X-Qonto-Staging-Token'] = credentials.stagingToken as string;
	}

	// Set content type based on upload type
	if (isFileUpload) {
		// For file uploads, don't set Content-Type, let the request library handle it
		// and keep the body as formData structure
	} else {
		options.headers!['Content-Type'] = 'application/json';
		options.json = true;
	}

	// Handle authentication
	try {
		if (authenticationMethod === 'logKey') {
			options.headers!.Authorization = `${credentials.login}:${credentials.secretKey}`;
			return await this.helpers.httpRequest!(options);
		} else {
			return await this.helpers.httpRequestWithAuthentication!.call(
				this,
				'qontoOAuth2Api',
				options,
			);
		}
	} catch (error: unknown) {
		// Extract and surface API error message
		const apiErrorMessage = extractErrorMessage(error);
		if (apiErrorMessage) {
			throw new NodeApiError(this.getNode(), error as JsonObject, { message: apiErrorMessage });
		}
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Handles a Qonto listing by returning all items or up to a limit.
 *
 * @param {IDataObject} headers
 * @param {IHttpRequestMethods} method
 * @param {string} endpoint
 * @param {IDataObject} body
 * @param {IDataObject} query
 * @param {number} i
 * @returns {Promise<IDataObject[]>}
 */
export async function handleListing(
	this: IExecuteFunctions,
	headers: IDataObject,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	i: number,
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let responseData: IDataObject;

	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = this.getNodeParameter('limit', i, 0) as number;

	query.current_page = 1;

	try {
		let hasMorePages = true;
		while (hasMorePages) {
			responseData = await qontoApiRequest.call(this, headers, method, endpoint, body, query);

			if (!responseData[endpoint]) {
				throw new NodeApiError(this.getNode(), {
					message: 'Unexpected API response format',
				});
			}

			const items = responseData[endpoint] as IDataObject[];
			returnData.push(...items);

			if (!returnAll && returnData.length >= limit) {
				return returnData.slice(0, limit);
			}

			query.current_page++;

			const responseMetadata = responseData.meta as IDataObject | undefined;
			if (
				!responseMetadata ||
				(responseMetadata.current_page as number) >= (responseMetadata.total_pages as number)
			) {
				hasMorePages = false;
			}
		}

		return returnData;
	} catch (error: unknown) {
		// Extract and surface API error message
		const apiErrorMessage = extractErrorMessage(error);
		if (apiErrorMessage) {
			throw new NodeApiError(this.getNode(), error as JsonObject, { message: apiErrorMessage });
		}
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
