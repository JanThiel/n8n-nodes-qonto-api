import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	formatDateTime,
	formatDate,
	handleListing,
	qontoApiRequest
} from './helpers';

import {
	attachmentOperations,
	attachmentsInATransactionOperations,
	beneficiariesOperations,
	externalTransfersOperations,
	internalTransactionsOperations,
	labelsOperations,
	membershipsOperations,
	organizationsOperations,
	requestsOperations,
	transactionsOperations,
	supplierInvoicesOperations,
  clientsInvoicesOperations,
  creditNotesOperations,
  clientsOperations,
  teamsOperations,
  statementsOperations,
  insuranceContractsOperations,
  cardsOperations,
} from './descriptions';

// Simple isEmpty implementation to avoid external dependency
function isEmpty(value: IDataObject): boolean {
	return value === null || value === undefined || 
	       (typeof value === 'object' && Object.keys(value).length === 0);
}

function uuid(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = Math.random() * 16 | 0;
		const v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

export class Qonto implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Qonto',
		name: 'qonto',
		icon: 'file:Qonto.svg',
		group: ['output'],
		version: 2,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Qonto API',
		defaults: {
			name: 'Qonto',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'qontoApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['logKey'],
					},
				},
			},
			{
				name: 'qontoOAuth2Api',
				required: true,
				displayOptions: {
					show: {
						authentication: ['oAuth2'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Login and Secret-Key',
						value: 'logKey',
					},
					{
						name: 'OAuth2',
						value: 'oAuth2',
					},
				],
				default: 'oAuth2',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Attachment', value: 'attachment' },
					{ name: 'Attachments in a Transaction', value: 'attachmentsInATransaction' },
					{ name: 'Beneficiary', value: 'beneficiaries' },
					{ name: 'Card', value: 'cards' },
					{ name: 'Client', value: 'clients' },
					{ name: 'Client Invoice', value: 'clientsInvoices' },
					{ name: 'Credit Note', value: 'creditNotes' },
					{ name: 'External Transfer', value: 'externalTransfers' },
					{ name: 'Insurance Contract', value: 'insuranceContracts' },
					{ name: 'Internal Transaction', value: 'internalTransactions' },
					{ name: 'Label', value: 'labels' },
					{ name: 'Membership', value: 'memberships' },
					{ name: 'Organization', value: 'organizations' },
					{ name: 'Request', value: 'requests' },
					{ name: 'Statement', value: 'statements' },
					{ name: 'Supplier Invoice', value: 'supplierInvoices' },
					{ name: 'Team', value: 'teams' },
					{ name: 'Transaction', value: 'transactions' },
				],
				default: 'organizations',
				required: true,
			},
			...externalTransfersOperations,
			...beneficiariesOperations,
			...attachmentOperations,
			...labelsOperations,
			...membershipsOperations,
			...organizationsOperations,
			...attachmentsInATransactionOperations,
			...transactionsOperations,
			...internalTransactionsOperations,
			...requestsOperations,
			...supplierInvoicesOperations,
      ...clientsInvoicesOperations,
      ...creditNotesOperations,
      ...clientsOperations,
      ...teamsOperations,
      ...statementsOperations,
      ...insuranceContractsOperations,
      ...cardsOperations,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let headers: IDataObject = {};
		const query: IDataObject = {};

		let responseData;
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			try {

// ------------------------
//      EXTERNAL TRANSFERS
// ------------------------
if (resource === 'externalTransfers') {

	// -----------------------------------------
	// SHOW AN EXTERNAL TRANSFER
	// GET /external_transfers/:id
	// -----------------------------------------
	if (operation === 'showAnExternalTransfer') {
		const id = this.getNodeParameter('id', i) as string;
		const endpoint = `external_transfers/${id}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}

	// -----------------------------------------
	// CREATE AN EXTERNAL TRANSFER (using existing beneficiary)
	// POST /external_transfers
	// -----------------------------------------
	if (operation === 'createAnExternalTransfer') {
		const endpoint = 'external_transfers';

		const idempotencyKey = uuid();
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey,
		};

		const externalTransfer: IDataObject = {
			beneficiary_id: this.getNodeParameter('beneficiary_id', i) as string,
			debit_iban:     this.getNodeParameter('debit_iban', i)     as string,
			reference:      this.getNodeParameter('reference', i)      as string,
			note:           this.getNodeParameter('note', i)           as string,
			currency:       this.getNodeParameter('currency', i)       as string,
			scheduled_date: formatDate(this.getNodeParameter('scheduled_date', i) as string),
			amount:         this.getNodeParameter('amount', i)         as string,
			attachment_ids: this.getNodeParameter('attachment_ids', i) as IDataObject,
		};

		const body: IDataObject = {
			external_transfer: externalTransfer,
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// CREATE EXTERNAL TRANSFER WITH CREDITOR DATA
	// POST /external_transfers/checkout
	// -----------------------------------------
	if (operation === 'createExternalTransfersWithCreditorData') {
		const endpoint = 'external_transfers/checkout';

		const idempotencyKey = this.getNodeParameter('idempotency_key', i, null) as string | null;
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey || uuid(),
		};

		const debit_iban = this.getNodeParameter('debit_iban', i) as string;

		const externalTransfer: IDataObject = {
			credit_iban:            this.getNodeParameter('credit_iban', i)            as string,
			credit_account_name:    this.getNodeParameter('credit_account_name', i)    as string,
			credit_account_currency:this.getNodeParameter('credit_account_currency', i)as string,
			reference:              this.getNodeParameter('reference', i)              as string,
			note:                   this.getNodeParameter('note', i)                   as string,
			currency:               this.getNodeParameter('currency', i)               as string,
			scheduled_date:         formatDate(this.getNodeParameter('scheduled_date', i) as string),
			amount:                 this.getNodeParameter('amount', i)                 as string,
			attachment_ids:         this.getNodeParameter('attachment_ids', i)         as IDataObject,
		};

		const body: IDataObject = {
			debit_iban,
			external_transfer: externalTransfer,
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// LIST EXTERNAL TRANSFERS
	// GET /external_transfers
	// -----------------------------------------
	if (operation === 'listExternalTransfers') {
		const endpoint = 'external_transfers';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.scheduled_date_from) {
				query.scheduled_date_from = formatDate(filters.scheduled_date_from as string);
			}
			if (filters.scheduled_date_to) {
				query.scheduled_date_to = formatDate(filters.scheduled_date_to as string);
			}
			if (filters.status && (filters.status as string[]).length > 0) {
				query['status[]'] = filters.status;
			}
			if (filters.updated_at_from) {
				query.updated_at_from = formatDateTime(filters.updated_at_from as string);
			}
			if (filters.updated_at_to) {
				query.updated_at_to = formatDateTime(filters.updated_at_to as string);
			}
			if (filters.beneficiary_ids) {
				query['beneficiary_ids[]'] = filters.beneficiary_ids;
			}
			if (filters.ids) {
				const ids = (filters.ids as string).split(',').map(id => id.trim());
				query['ids[]'] = ids;
			}
			if (filters.recurring_transfer_ids) {
				const rIds = (filters.recurring_transfer_ids as string).split(',').map(id => id.trim());
				query['recurring_transfer_ids[]'] = rIds;
			}
			if (filters.sort_by) {
				query.sort_by = filters.sort_by;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}
}

// ------------------------
//      BENEFICIARIES
// ------------------------
if (resource === 'beneficiaries') {

	// -----------------------------------------
	// LIST BENEFICIARIES
	// GET /beneficiaries
	// -----------------------------------------
	if (operation === 'listBeneficiaries') {
		const endpoint = 'beneficiaries';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {

			if (filters.iban) {
				query['iban[]'] = filters.iban as string;
			}

			if (typeof filters.trusted !== 'undefined') {
				query.trusted = filters.trusted;
			}

			if (filters.status && (filters.status as string[]).length > 0) {
				query['status[]'] = filters.status;
			}

			if (filters.updated_at_from) {
				query.updated_at_from = formatDateTime(filters.updated_at_from as string);
			}
			if (filters.updated_at_to) {
				query.updated_at_to = formatDateTime(filters.updated_at_to as string);
			}
			if (filters.sort_by) {
				query.sort_by = filters.sort_by;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// SHOW A BENEFICIARY
	// GET /beneficiaries/:id
	// -----------------------------------------
	if (operation === 'showBeneficiary') {
		const id = this.getNodeParameter('id', i) as string;
		const endpoint = `beneficiaries/${id}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}

	// -----------------------------------------
	// UNTRUST A LIST OF BENEFICIARIES
	// PATCH /sepa/beneficiaries/untrust
	// -----------------------------------------
	if (operation === 'untrustBeneficiaries') {
		const endpoint = 'sepa/beneficiaries/untrust';

		const idsRaw = this.getNodeParameter('ids', i) as string;
		const ids = idsRaw.split(',').map((id: string) => id.trim());

		const body: IDataObject = {
			ids,
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PATCH',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// TRUST A LIST OF BENEFICIARIES
	// PATCH /sepa/beneficiaries/trust
	// -----------------------------------------
	if (operation === 'trustBeneficiaries') {
		const endpoint = 'sepa/beneficiaries/trust';

		const idsRaw = this.getNodeParameter('ids', i) as string;
		const ids = idsRaw.split(',').map((id: string) => id.trim());

		const body: IDataObject = {
			ids,
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PATCH',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// ADD A SEPA BENEFICIARY
	// POST /sepa/beneficiaries
	// -----------------------------------------
	if (operation === 'createBeneficiary') {
		const endpoint = 'sepa/beneficiaries';

		const beneficiaryData: IDataObject = {
			name: this.getNodeParameter('beneficiaryName', i) as string,
			iban: this.getNodeParameter('iban', i) as string,
		};

		// Add optional fields
		const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;
		if (additionalOptions.bic) {
			beneficiaryData.bic = additionalOptions.bic;
		}
		if (additionalOptions.email) {
			beneficiaryData.email = additionalOptions.email;
		}
		if (additionalOptions.activityTag) {
			beneficiaryData.activity_tag = additionalOptions.activityTag;
		}

		const body: IDataObject = {
			beneficiary: beneficiaryData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// UPDATE A SEPA BENEFICIARY
	// PATCH /sepa/beneficiaries/:id
	// -----------------------------------------
	if (operation === 'updateBeneficiary') {
		const id = this.getNodeParameter('id', i) as string;
		const endpoint = `sepa/beneficiaries/${id}`;
		const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

		const beneficiaryData: IDataObject = {};
		if (updateFields.name) {
			beneficiaryData.name = updateFields.name;
		}
		if (updateFields.email) {
			beneficiaryData.email = updateFields.email;
		}
		if (updateFields.activityTag) {
			beneficiaryData.activity_tag = updateFields.activityTag;
		}

		const body: IDataObject = {
			beneficiary: beneficiaryData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PATCH',
			endpoint,
			body,
			{},
		);
	}
}

// ------------------------
//      ATTACHMENTS
// ------------------------
if (resource === 'attachment') {

	// -----------------------------------------
	// UPLOAD AN ATTACHMENT
	// POST /attachments
	// -----------------------------------------
	if (operation === 'uploadAttachment') {
		const endpoint = 'attachments';

		const idempotencyKey = uuid();
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey,
			'Content-Type': 'application/json',
		};

		const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;

		const fileBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
		const base64File = fileBuffer.toString('base64');

		const fileName = this.getNodeParameter('fileName', i, 'upload.bin') as string;

		const body: IDataObject = {
			attachments: [
				{
					file: base64File,
					filename: fileName,
				},
			],
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// SHOW ATTACHMENT
	// GET /attachments/:attachment_id
	// -----------------------------------------
	if (operation === 'showAttachment') {
		const attachmentId = this.getNodeParameter('id', i) as string;
		const endpoint = `attachments/${attachmentId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}
}

// ------------------------
//      LABELS
// ------------------------
if (resource === 'labels') {

	// -----------------------------------------
	// LIST LABELS
	// GET /labels
	// -----------------------------------------
	if (operation === 'listLabels') {
		const endpoint = 'labels';

		const organizationId = this.getNodeParameter('organizationId', i) as string;
		query.organization_id = organizationId;

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// SHOW LABEL
	// GET /labels/:label_id
	// -----------------------------------------
	if (operation === 'showLabel') {
		const labelId = this.getNodeParameter('id', i) as string;
		const endpoint = `labels/${labelId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}
}


// ------------------------
//      MEMBERSHIPS
// ------------------------
if (resource === 'memberships') {
		// ------------------------
	// LIST MEMBERSHIPS
	// GET /memberships
	// ------------------------
	if (operation === 'listMemberships') {
		const endpoint = 'memberships';

		responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, {}, i);
	}

	// ------------------------
	// GET A SINGLE MEMBERSHIP
	// GET /memberships/:membership_id
	// ------------------------
	if (operation === 'getMembership') {
		const membershipId = this.getNodeParameter('membership_id', i) as string;
		const endpoint = `memberships/${membershipId}`;

		responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, {}, i);
	}

	// ------------------------
	// CREATE & INVITE A MEMBERSHIP
	// POST /memberships/invite_employee_or_accountant
	// ------------------------
	if (operation === 'createMembership') {
		const endpoint = 'memberships/invite_employee_or_accountant';

		const email     = this.getNodeParameter('email', i) as string;
		const firstName = this.getNodeParameter('first_name', i) as string;
		const lastName  = this.getNodeParameter('last_name', i) as string;
		const role      = this.getNodeParameter('role', i) as string;
		const teamId    = this.getNodeParameter('team_id', i, '') as string;

		const body: IDataObject = {
			membership: {
				email,
				first_name: firstName,
				last_name : lastName,
				role,
			},
		};

		if (teamId) {
			(body.membership as IDataObject).team_id = teamId;
		}

		responseData = await handleListing.call(this, headers, 'POST', endpoint, body, {}, i);
	}
}

// ------------------------
//      ORGANIZATIONS
// ------------------------
if (resource === 'organizations') {

	// -----------------------------------------
	// GET ORGANIZATION AND ITS BANK ACCOUNTS
	// GET /organization
	// -----------------------------------------
	if (operation === 'getOrganizationAndItsBank_accounts') {
		const endpoint = 'organization';

		const includeExternalAccounts = this.getNodeParameter('include_external_accounts', i) as boolean;

		const query: IDataObject = {};
		if (includeExternalAccounts) {
			query.include_external_accounts = 'true';
		}

		// Appel de l'API
		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
		);
	}
}

// ------------------------
//      ATTACHMENTS IN TRANSACTIONS
// ------------------------
if (resource === 'attachmentsInATransaction') {

	// ------------------------------------------
	// UPLOAD ATTACHMENT TO A TRANSACTION
	// POST /transactions/{transaction_id}/attachments
	// ------------------------------------------
	if (operation === 'uploadAttachmentToATransaction') {
		const transactionId = this.getNodeParameter('transaction_id', i) as string;
		const endpoint = `transactions/${transactionId}/attachments`;

		const idempotencyKey = uuid();
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey,
		};

		const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
		const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
		const fileBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

		// Use multipart/form-data as required by Qonto API
		const formData = {
			file: {
				value: fileBuffer,
				options: {
					filename: binaryData.fileName || 'attachment',
					contentType: binaryData.mimeType || 'application/octet-stream',
				},
			},
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			formData,
			{},
			true
		);
		
		// Qonto API returns empty response for successful uploads, provide meaningful data
		if (!responseData || (typeof responseData === 'object' && Object.keys(responseData).length === 0)) {
			responseData = { 
				success: true, 
				message: 'Attachment uploaded successfully to transaction',
				transaction_id: transactionId,
				uploaded_at: new Date().toISOString()
			};
		}
	}

	// ------------------------------------------
	// LIST ATTACHMENTS IN A TRANSACTION
	// GET /transactions/{transaction_id}/attachments
	// ------------------------------------------
	if (operation === 'listAttachmentsInATransaction') {
		const transactionId = this.getNodeParameter('id', i) as string;
		const endpoint = `transactions/${transactionId}/attachments`;

		responseData = await qontoApiRequest.call(this, headers, 'GET', endpoint, {}, {});
	}

	// ------------------------------------------
	// REMOVE ALL ATTACHMENTS FROM A TRANSACTION
	// DELETE /transactions/{transaction_id}/attachments
	// ------------------------------------------
	if (operation === 'removeAllAttachmentsFromATransaction') {
		const transactionId = this.getNodeParameter('id', i) as string;
		const endpoint = `transactions/${transactionId}/attachments`;

		responseData = await qontoApiRequest.call(this, headers, 'DELETE', endpoint, {}, {});
	}

	// ------------------------------------------
	// REMOVE A SINGLE ATTACHMENT FROM A TRANSACTION
	// DELETE /transactions/{transaction_id}/attachments/{attachment_id}
	// ------------------------------------------
	if (operation === 'removeAnAttachmentFromATransaction') {
		const transactionId = this.getNodeParameter('transaction_id', i) as string;
		const attachmentId = this.getNodeParameter('attachment_id', i) as string;

		const endpoint = `transactions/${transactionId}/attachments/${attachmentId}`;

		responseData = await qontoApiRequest.call(this, headers, 'DELETE', endpoint, {}, {});
	}
}

// ------------------------
//      TRANSACTIONS
// ------------------------
if (resource === 'transactions') {

	// -----------------------------------------
	// LIST TRANSACTIONS
	// GET /transactions
	// -----------------------------------------
	if (operation === 'listTransactions') {
		const endpoint = 'transactions';
		const identifierType = this.getNodeParameter('identifierType', i) as string;

		if (identifierType === 'bankAccountId') {
				const bankAccountId = this.getNodeParameter('bankAccountId', i) as string;
				query.bank_account_id = bankAccountId;
		} else {
				const iban = this.getNodeParameter('iban', i) as string;
				query.iban = iban;
		}

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.status && (filters.status as string[]).length > 0) {
				query['status[]'] = filters.status as string[];
			}
			if (filters.updated_at_from) {
				query.updated_at_from = formatDateTime(filters.updated_at_from as string);
			}
			if (filters.updated_at_to) {
				query.updated_at_to = formatDateTime(filters.updated_at_to as string);
			}
			if (filters.created_at_from) {
				query.created_at_from = formatDateTime(filters.created_at_from as string);
			}
			if (filters.created_at_to) {
				query.created_at_to = formatDateTime(filters.created_at_to as string);
			}
			if (filters.emitted_at_from) {
				query.emitted_at_from = formatDateTime(filters.emitted_at_from as string);
			}
			if (filters.emitted_at_to) {
				query.emitted_at_to = formatDateTime(filters.emitted_at_to as string);
			}
			if (filters.settled_at_from) {
				query.settled_at_from = formatDateTime(filters.settled_at_from as string);
			}
			if (filters.settled_at_to) {
				query.settled_at_to = formatDateTime(filters.settled_at_to as string);
			}
			if (filters.side) {
				query.side = filters.side;
			}
			if (filters.operation_type) {
				query['operation_type[]'] = filters.operation_type as string[];
			}
			if (typeof filters.with_attachments !== 'undefined') {
				query.with_attachments = filters.with_attachments;
			}
			if (filters.sort_by) {
				query.sort_by = filters.sort_by;
			}
			if (filters.includes && (filters.includes as string[]).length > 0) {
				query['includes[]'] = filters.includes as string[];
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// SHOW A TRANSACTION
	// GET /transactions/:transaction_id
	// -----------------------------------------
	if (operation === 'showTransaction') {
		const id = this.getNodeParameter('id', i) as string;
		const endpoint = `transactions/${id}`;

		const includes = this.getNodeParameter('includes', i, []) as string[];
		const showQuery: IDataObject = {};
		if (includes && includes.length > 0) {
			showQuery['includes[]'] = includes;
		}

		responseData = await qontoApiRequest.call(
			this,
			{},
			'GET',
			endpoint,
			{},
			showQuery,
		);
	}
}

// ------------------------
//      INTERNAL TRANSFERS
// ------------------------
if (resource === 'internalTransactions') {
	// CREATE INTERNAL TRANSFER
	if (operation === 'createInternalTransfer') {
		const endpoint = 'internal_transfers';
		const idempotencyKey = uuid();
		headers = { 'X-Qonto-Idempotency-Key': idempotencyKey };

		const internalTransfer = {
			debit_iban:  this.getNodeParameter('debit_iban', i)  as string,
			credit_iban: this.getNodeParameter('credit_iban', i) as string,
			reference:   this.getNodeParameter('reference', i)   as string,
			currency:    this.getNodeParameter('currency', i)    as string,
			amount:      this.getNodeParameter('amount', i)      as string,
		};

		const body = {
			internal_transfer: internalTransfer,
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}
}

// ------------------------
//      REQUESTS
// ------------------------
if (resource === 'requests') {

	// -----------------------------------------
	// LIST REQUESTS
	// GET /requests
	// -----------------------------------------
	if (operation === 'listRequests') {
		const endpoint = 'requests';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {

			if (filters.status) {
				query.status = filters.status;
			}

			if (filters.request_type) {
				query.request_type = filters.request_type;
			}

			if (filters.created_at_from) {
				query.created_at_from = formatDateTime(filters.created_at_from as string);
			}
			if (filters.processed_at_from) {
				query.processed_at_from = formatDateTime(filters.processed_at_from as string);
			}
		}

		responseData = await qontoApiRequest.call(
			this,
			{},
			'GET',
			endpoint,
			{},
			query,
		);
	}

	// -----------------------------------------
	// APPROVE A REQUEST
	// POST /requests/:request_type/:request_id/approve
	// -----------------------------------------
	if (operation === 'approveARequest') {
		const requestId   = this.getNodeParameter('id', i) as string;
		const requestType = this.getNodeParameter('request_type', i) as string;

		const endpoint = `requests/${requestType}/${requestId}/approve`;

		const idempotencyKey = uuid();
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey,
		};

		const body: IDataObject = {};
		const debitIban = this.getNodeParameter('debit_iban', i) as string;
		if (debitIban) {
			body.debit_iban = debitIban;
		}

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// DECLINE A REQUEST
	// POST /requests/:request_type/:request_id/decline
	// -----------------------------------------
	if (operation === 'declineARequest') {
		const requestId   = this.getNodeParameter('id', i) as string;
		const requestType = this.getNodeParameter('request_type', i) as string;

		const endpoint = `requests/${requestType}/${requestId}/decline`;

		const idempotencyKey = uuid();
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey,
		};

		const body: IDataObject = {};
		const declinedNote = this.getNodeParameter('declined_note', i) as string;
		if (declinedNote) {
			body.declined_note = declinedNote;
		}

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}
}

// ------------------------
//      SUPPLIER INVOICES
// ------------------------
if (resource === 'supplierInvoices') {

	// -----------------------------------------
	// GET A LIST OF SUPPLIER INVOICES
	// GET /supplier_invoices
	// -----------------------------------------
	if (operation === 'getSupplierInvoices') {
		const endpoint = 'supplier_invoices';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.status && filters.status !== 'all') {
				query.status = filters.status;
			}
			if (filters.start_date) {
				query.start_date = formatDateTime(filters.start_date as string);
			}
			if (filters.end_date) {
				query.end_date = formatDateTime(filters.end_date as string);
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// CREATE SUPPLIER INVOICES (BULK)
	// POST /supplier_invoices/bulk
	// -----------------------------------------
	if (operation === 'createSupplierInvoices') {
		const endpoint = 'supplier_invoices/bulk';

		const invoices = this.getNodeParameter('supplierInvoices', i) as IDataObject[];
		const organizationId = this.getNodeParameter('organizationId', i) as string;

		const body: IDataObject = {
			organization_id: organizationId,
			supplier_invoices: invoices.map((invoice) => ({
				invoice_number:  invoice.invoiceNumber,
				invoice_date:    invoice.invoiceDate,
				amount:          invoice.amount,
				currency:        invoice.currency,
				attachment_ids:  invoice.attachmentIds,
			})),
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}
}

// ------------------------
//      CLIENT INVOICES
// ------------------------
if (resource === 'clientsInvoices') {

	// -----------------------------------------
	// GET A LIST OF CLIENT INVOICES
	// GET /client_invoices
	// -----------------------------------------
	if (operation === 'listInvoices') {
		const endpoint = 'client_invoices';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.status) {
				query['filter[status]'] = filters.status;
			}
			if (filters.created_at_from) {
				query['filter[created_at_from]'] = formatDateTime(filters.created_at_from as string);
			}
			if (filters.created_at_to) {
				query['filter[created_at_to]'] = formatDateTime(filters.created_at_to as string);
			}
			if (filters.updated_at_from) {
				query['filter[updated_at_from]'] = formatDateTime(filters.updated_at_from as string);
			}
			if (filters.updated_at_to) {
				query['filter[updated_at_to]'] = formatDateTime(filters.updated_at_to as string);
			}
			if (typeof filters.exclude_imported !== 'undefined') {
				query.exclude_imported = filters.exclude_imported;
			}
			if (filters.sort_by) {
				query.sort_by = filters.sort_by;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// CREATE A CLIENT INVOICE
	// POST /client_invoices
	// -----------------------------------------
	if (operation === 'createClientInvoice') {
		const endpoint = 'client_invoices';

		const clientId = this.getNodeParameter('clientId', i) as string;
		const issueDate = formatDate(this.getNodeParameter('issueDate', i) as string);
		const dueDate = formatDate(this.getNodeParameter('dueDate', i) as string);
		const currency = this.getNodeParameter('currency', i) as string;
		const paymentIban = this.getNodeParameter('paymentIban', i) as string;
		const itemsData = this.getNodeParameter('items', i) as IDataObject;

		// Build items array
		const items: IDataObject[] = [];
		if (itemsData.item && Array.isArray(itemsData.item)) {
			for (const item of itemsData.item as IDataObject[]) {
				const invoiceItem: IDataObject = {
					title: item.title,
					quantity: item.quantity,
					unit_price: {
						value: item.unitPriceValue,
						currency: item.unitPriceCurrency,
					},
					vat_rate: item.vatRate,
				};
				if (item.description) {
					invoiceItem.description = item.description;
				}
				if (item.unit) {
					invoiceItem.unit = item.unit;
				}
				items.push(invoiceItem);
			}
		}

		const body: IDataObject = {
			client_id: clientId,
			issue_date: issueDate,
			due_date: dueDate,
			currency,
			payment_methods: {
				iban: paymentIban,
			},
			items,
		};

		// Add optional fields
		const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;
		if (additionalOptions.status) {
			body.status = additionalOptions.status;
		}
		if (additionalOptions.number) {
			body.number = additionalOptions.number;
		}
		if (additionalOptions.purchaseOrder) {
			body.purchase_order = additionalOptions.purchaseOrder;
		}
		if (additionalOptions.termsAndConditions) {
			body.terms_and_conditions = additionalOptions.termsAndConditions;
		}
		if (additionalOptions.header) {
			body.header = additionalOptions.header;
		}
		if (additionalOptions.footer) {
			body.footer = additionalOptions.footer;
		}
		if (additionalOptions.performanceStartDate) {
			body.performance_start_date = formatDate(additionalOptions.performanceStartDate as string);
		}
		if (additionalOptions.performanceEndDate) {
			body.performance_end_date = formatDate(additionalOptions.performanceEndDate as string);
		}

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// UPDATE A DRAFT CLIENT INVOICE
	// PATCH /client_invoices/:id
	// -----------------------------------------
	if (operation === 'updateClientInvoice') {
		const invoiceId = this.getNodeParameter('invoiceId', i) as string;
		const endpoint = `client_invoices/${invoiceId}`;
		const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

		const body: IDataObject = {};

		if (updateFields.clientId) {
			body.client_id = updateFields.clientId;
		}
		if (updateFields.issueDate) {
			body.issue_date = formatDate(updateFields.issueDate as string);
		}
		if (updateFields.dueDate) {
			body.due_date = formatDate(updateFields.dueDate as string);
		}
		if (updateFields.number) {
			body.number = updateFields.number;
		}
		if (updateFields.purchaseOrder) {
			body.purchase_order = updateFields.purchaseOrder;
		}
		if (updateFields.termsAndConditions) {
			body.terms_and_conditions = updateFields.termsAndConditions;
		}
		if (updateFields.header) {
			body.header = updateFields.header;
		}
		if (updateFields.footer) {
			body.footer = updateFields.footer;
		}
		if (updateFields.paymentIban) {
			body.payment_methods = { iban: updateFields.paymentIban };
		}

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PATCH',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// SHOW A CLIENT INVOICE
	// GET /client_invoices/:id
	// -----------------------------------------
	if (operation === 'showClientInvoice') {
		const invoiceId = this.getNodeParameter('invoiceId', i) as string;
		const endpoint = `client_invoices/${invoiceId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}
}

// ------------------------
//      CREDIT NOTES
// ------------------------
if (resource === 'creditNotes') {

	// -----------------------------------------
	// GET A LIST OF CREDIT NOTES
	// GET /credit_notes
	// -----------------------------------------
	if (operation === 'getListCreditNotes') {
		const endpoint = 'credit_notes';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.created_at_from) {
				query.created_at_from = formatDateTime(filters.created_at_from as string);
			}
			if (filters.created_at_to) {
				query.created_at_to = formatDateTime(filters.created_at_to as string);
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// GET DETAILS OF A SPECIFIC CREDIT NOTE
	// GET /credit_notes/:credit_note_id
	// -----------------------------------------
	if (operation === 'getDetailsCreditNotes') {
		const creditNoteId = this.getNodeParameter('creditNoteId', i) as string;
		const endpoint = `credit_notes/${creditNoteId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}
}

// ------------------------
//      CLIENTS
// ------------------------
if (resource === 'clients') {

	// -----------------------------------------
	// GET A LIST OF CLIENTS
	// GET /clients
	// -----------------------------------------
	if (operation === 'getListClients') {
		const endpoint = 'clients';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.tax_identification_number) {
				query['filter[tax_identification_number]'] = filters.tax_identification_number;
			}
			if (filters.vat_number) {
				query['filter[vat_number]'] = filters.vat_number;
			}
			if (filters.email) {
				query['filter[email]'] = filters.email;
			}
			if (filters.name) {
				query['filter[name]'] = filters.name;
			}
			if (filters.sort_by) {
				query.sort_by = filters.sort_by;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// GET CLIENT DETAILS
	// GET /clients/:client_id
	// -----------------------------------------
	if (operation === 'getClientDetails') {
		const clientId = this.getNodeParameter('clientId', i) as string;
		const endpoint = `clients/${clientId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}

	// -----------------------------------------
	// CREATE A CLIENT
	// POST /clients
	// -----------------------------------------
	if (operation === 'createClient') {
		const endpoint = 'clients';

		const kind = this.getNodeParameter('kind', i) as string;
		const clientName = this.getNodeParameter('clientName', i, '') as string;
		const firstName = this.getNodeParameter('firstName', i, '') as string;
		const lastName = this.getNodeParameter('lastName', i, '') as string;
		const email = this.getNodeParameter('email', i, '') as string;

		const body: IDataObject = {
			kind,
		};

		if (clientName) {
			body.name = clientName;
		}
		if (firstName) {
			body.first_name = firstName;
		}
		if (lastName) {
			body.last_name = lastName;
		}
		if (email) {
			body.email = email;
		}

		// Add optional fields
		const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;
		if (additionalOptions.vatNumber) {
			body.vat_number = additionalOptions.vatNumber;
		}
		if (additionalOptions.taxIdentificationNumber) {
			body.tax_identification_number = additionalOptions.taxIdentificationNumber;
		}
		if (additionalOptions.currency) {
			body.currency = additionalOptions.currency;
		}
		if (additionalOptions.locale) {
			body.locale = additionalOptions.locale;
		}
		if (additionalOptions.recipientCode) {
			body.recipient_code = additionalOptions.recipientCode;
		}
		if (additionalOptions.eInvoicingAddress) {
			body.e_invoicing_address = additionalOptions.eInvoicingAddress;
		}
		if (additionalOptions.phoneCountryCode || additionalOptions.phoneNumber) {
			body.phone = {
				country_code: additionalOptions.phoneCountryCode || '',
				number: additionalOptions.phoneNumber || '',
			};
		}
		if (additionalOptions.extraEmails) {
			body.extra_emails = (additionalOptions.extraEmails as string).split(',').map((e: string) => e.trim());
		}
		if (additionalOptions.billingStreetAddress || additionalOptions.billingCity || additionalOptions.billingZipCode || additionalOptions.billingCountryCode) {
			body.billing_address = {};
			if (additionalOptions.billingStreetAddress) {
				(body.billing_address as IDataObject).street_address = additionalOptions.billingStreetAddress;
			}
			if (additionalOptions.billingCity) {
				(body.billing_address as IDataObject).city = additionalOptions.billingCity;
			}
			if (additionalOptions.billingZipCode) {
				(body.billing_address as IDataObject).zip_code = additionalOptions.billingZipCode;
			}
			if (additionalOptions.billingProvinceCode) {
				(body.billing_address as IDataObject).province_code = additionalOptions.billingProvinceCode;
			}
			if (additionalOptions.billingCountryCode) {
				(body.billing_address as IDataObject).country_code = additionalOptions.billingCountryCode;
			}
		}

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// UPDATE A CLIENT
	// PATCH /clients/:id
	// -----------------------------------------
	if (operation === 'updateClient') {
		const clientId = this.getNodeParameter('clientId', i) as string;
		const endpoint = `clients/${clientId}`;
		const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

		const body: IDataObject = {};

		if (updateFields.name) {
			body.name = updateFields.name;
		}
		if (updateFields.firstName) {
			body.first_name = updateFields.firstName;
		}
		if (updateFields.lastName) {
			body.last_name = updateFields.lastName;
		}
		if (updateFields.email) {
			body.email = updateFields.email;
		}
		if (updateFields.vatNumber) {
			body.vat_number = updateFields.vatNumber;
		}
		if (updateFields.taxIdentificationNumber) {
			body.tax_identification_number = updateFields.taxIdentificationNumber;
		}
		if (updateFields.currency) {
			body.currency = updateFields.currency;
		}
		if (updateFields.locale) {
			body.locale = updateFields.locale;
		}
		if (updateFields.recipientCode) {
			body.recipient_code = updateFields.recipientCode;
		}
		if (updateFields.eInvoicingAddress) {
			body.e_invoicing_address = updateFields.eInvoicingAddress;
		}
		if (updateFields.phoneCountryCode || updateFields.phoneNumber) {
			body.phone = {
				country_code: updateFields.phoneCountryCode || '',
				number: updateFields.phoneNumber || '',
			};
		}
		if (updateFields.billingStreetAddress || updateFields.billingCity || updateFields.billingZipCode || updateFields.billingCountryCode) {
			body.billing_address = {};
			if (updateFields.billingStreetAddress) {
				(body.billing_address as IDataObject).street_address = updateFields.billingStreetAddress;
			}
			if (updateFields.billingCity) {
				(body.billing_address as IDataObject).city = updateFields.billingCity;
			}
			if (updateFields.billingZipCode) {
				(body.billing_address as IDataObject).zip_code = updateFields.billingZipCode;
			}
			if (updateFields.billingProvinceCode) {
				(body.billing_address as IDataObject).province_code = updateFields.billingProvinceCode;
			}
			if (updateFields.billingCountryCode) {
				(body.billing_address as IDataObject).country_code = updateFields.billingCountryCode;
			}
		}

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PATCH',
			endpoint,
			body,
			{},
		);
	}
}

// ------------------------
//      TEAMS
// ------------------------
if (resource === 'teams') {

	// -----------------------------------------
	// LIST TEAMS IN AN ORGANIZATION
	// GET /teams
	// -----------------------------------------
	if (operation === 'listTeams') {
		const endpoint = 'teams';

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// CREATE A NEW TEAM
	// POST /teams
	// -----------------------------------------
	if (operation === 'createTeam') {
		const endpoint = 'teams';

		const body: IDataObject = {
			name: this.getNodeParameter('teamName', i) as string,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}
}


// ------------------------
//      STATEMENTS
// ------------------------
if (resource === 'statements') {

	// -----------------------------------------
	// LIST STATEMENTS
	// GET /statements
	// -----------------------------------------
	if (operation === 'listStatement') {
		const endpoint = 'statements';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.bank_account_ids) {
				const ids = (filters.bank_account_ids as string).split(',').map(id => id.trim());
				query['bank_account_ids[]'] = ids;
			}
			if (filters.ibans) {
				const ibans = (filters.ibans as string).split(',').map(iban => iban.trim());
				query['ibans[]'] = ibans;
			}
			if (filters.period_from) {
				query.period_from = filters.period_from;
			}
			if (filters.period_to) {
				query.period_to = filters.period_to;
			}
			if (filters.sort_by) {
				query.sort_by = filters.sort_by;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// SHOW STATEMENT DETAILS
	// GET /statements/:statement_id
	// -----------------------------------------
	if (operation === 'showStatement') {
		const statementId = this.getNodeParameter('statementId', i) as string;
		const endpoint = `statements/${statementId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}
}

// ------------------------
//  INSURANCE CONTRACTS
// ------------------------
if (resource === 'insuranceContracts') {

	// -----------------------------------------
	// CREATE A NEW INSURANCE CONTRACT
	// POST /insurance_contracts
	// -----------------------------------------
	if (operation === 'createInsuranceContract') {
		const endpoint = 'insurance_contracts';

		const contractData: IDataObject = {
			name: this.getNodeParameter('contractName', i) as string,
			contract_id: this.getNodeParameter('contractId', i) as string,
			origin: this.getNodeParameter('origin', i) as string,
			provider_slug: this.getNodeParameter('providerSlug', i) as string,
			type: this.getNodeParameter('contractType', i) as string,
			status: this.getNodeParameter('status', i) as string,
		};

		// Add optional fields
		const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;
		if (additionalOptions.troubleshootingUrl) {
			contractData.troubleshooting_url = additionalOptions.troubleshootingUrl;
		}
		if (additionalOptions.serviceUrl) {
			contractData.service_url = additionalOptions.serviceUrl;
		}
		if (additionalOptions.expirationDate) {
			contractData.expiration_date = formatDate(additionalOptions.expirationDate as string);
		}
		if (additionalOptions.startDate) {
			contractData.start_date = formatDate(additionalOptions.startDate as string);
		}
		if (additionalOptions.renewalDate) {
			contractData.renewal_date = formatDate(additionalOptions.renewalDate as string);
		}
		if (additionalOptions.paymentFrequency) {
			contractData.payment_frequency = additionalOptions.paymentFrequency;
		}
		if (additionalOptions.priceValue || additionalOptions.priceCurrency) {
			contractData.price = {
				value: additionalOptions.priceValue || '',
				currency: additionalOptions.priceCurrency || 'EUR',
			};
		}

		const body: IDataObject = {
			insurance_contract: contractData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// GET DETAILS OF AN INSURANCE CONTRACT
	// GET /insurance_contracts/:contract_id
	// -----------------------------------------
	if (operation === 'getInsuranceContract') {
		const contractId = this.getNodeParameter('contractId', i) as string;
		const endpoint = `insurance_contracts/${contractId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}

	// -----------------------------------------
	// UPDATE AN INSURANCE CONTRACT
	// PATCH /insurance_contracts/:id
	// -----------------------------------------
	if (operation === 'updateInsuranceContract') {
		const contractIdToUpdate = this.getNodeParameter('contractIdToUpdate', i) as string;
		const endpoint = `insurance_contracts/${contractIdToUpdate}`;
		const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

		const contractData: IDataObject = {};

		if (updateFields.name) {
			contractData.name = updateFields.name;
		}
		if (updateFields.contractId) {
			contractData.contract_id = updateFields.contractId;
		}
		if (updateFields.origin) {
			contractData.origin = updateFields.origin;
		}
		if (updateFields.providerSlug) {
			contractData.provider_slug = updateFields.providerSlug;
		}
		if (updateFields.type) {
			contractData.type = updateFields.type;
		}
		if (updateFields.status) {
			contractData.status = updateFields.status;
		}
		if (updateFields.troubleshootingUrl) {
			contractData.troubleshooting_url = updateFields.troubleshootingUrl;
		}
		if (updateFields.serviceUrl) {
			contractData.service_url = updateFields.serviceUrl;
		}
		if (updateFields.expirationDate) {
			contractData.expiration_date = formatDate(updateFields.expirationDate as string);
		}
		if (updateFields.startDate) {
			contractData.start_date = formatDate(updateFields.startDate as string);
		}
		if (updateFields.renewalDate) {
			contractData.renewal_date = formatDate(updateFields.renewalDate as string);
		}
		if (updateFields.paymentFrequency) {
			contractData.payment_frequency = updateFields.paymentFrequency;
		}
		if (updateFields.priceValue || updateFields.priceCurrency) {
			contractData.price = {
				value: updateFields.priceValue || '',
				currency: updateFields.priceCurrency || 'EUR',
			};
		}

		const body: IDataObject = {
			insurance_contract: contractData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PATCH',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// UPLOAD A PDF FOR A SPECIFIC CONTRACT
	// POST /insurance_contracts/:id/attachments
	// -----------------------------------------
	if (operation === 'uploadInsuranceDocument') {
		const contractId = this.getNodeParameter('contractId', i) as string;
		const binaryProperty = this.getNodeParameter('binaryProperty', i) as string;
		const endpoint = `insurance_contracts/${contractId}/attachments`;

		const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
		const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);

		const formData: IDataObject = {
			file: {
				value: dataBuffer,
				options: {
					filename: binaryData.fileName || 'attachment',
					contentType: binaryData.mimeType || 'application/octet-stream',
				},
			},
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			formData,
			{},
			true,
		);
	}

	// -----------------------------------------
	// DELETE UPLOADED DOCUMENT
	// DELETE /insurance_contracts/:id/attachments/:attachment_id
	// -----------------------------------------
	if (operation === 'deleteInsuranceDocument') {
		const contractId = this.getNodeParameter('contractId', i) as string;
		const attachmentId = this.getNodeParameter('attachmentId', i) as string;
		const endpoint = `insurance_contracts/${contractId}/attachments/${attachmentId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'DELETE',
			endpoint,
			{},
			{},
		);
	}
}


// ------------------------
//      CARDS
// ------------------------
if (resource === 'cards') {

	// -----------------------------------------
	// LIST CARDS
	// GET /cards
	// -----------------------------------------
	if (operation === 'listCards') {
		const endpoint = 'cards';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.holder_id) {
				query.holder_id = filters.holder_id;
			}
			if (filters.status && (filters.status as string[]).length > 0) {
				query['status[]'] = filters.status;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// CREATE A CARD
	// POST /cards
	// -----------------------------------------
	if (operation === 'createCard') {
		const endpoint = 'cards';

		const cardData: IDataObject = {
			holder_id: this.getNodeParameter('holderId', i) as string,
			bank_account_id: this.getNodeParameter('bankAccountId', i) as string,
			card_level: this.getNodeParameter('cardLevel', i) as string,
			payment_monthly_limit: this.getNodeParameter('paymentMonthlyLimit', i) as number,
		};

		// Add optional fields
		const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;
		if (additionalOptions.organizationId) {
			cardData.organization_id = additionalOptions.organizationId;
		}
		if (additionalOptions.initiatorId) {
			cardData.initiator_id = additionalOptions.initiatorId;
		}
		if (additionalOptions.atmOption !== undefined) {
			cardData.atm_option = additionalOptions.atmOption;
		}
		if (additionalOptions.atmMonthlyLimit) {
			cardData.atm_monthly_limit = additionalOptions.atmMonthlyLimit;
		}
		if (additionalOptions.atmDailyLimitOption !== undefined) {
			cardData.atm_daily_limit_option = additionalOptions.atmDailyLimitOption;
		}
		if (additionalOptions.atmDailyLimit) {
			cardData.atm_daily_limit = additionalOptions.atmDailyLimit;
		}
		if (additionalOptions.nfcOption !== undefined) {
			cardData.nfc_option = additionalOptions.nfcOption;
		}
		if (additionalOptions.onlineOption !== undefined) {
			cardData.online_option = additionalOptions.onlineOption;
		}
		if (additionalOptions.foreignOption !== undefined) {
			cardData.foreign_option = additionalOptions.foreignOption;
		}
		if (additionalOptions.paymentDailyLimitOption !== undefined) {
			cardData.payment_daily_limit_option = additionalOptions.paymentDailyLimitOption;
		}
		if (additionalOptions.paymentDailyLimit) {
			cardData.payment_daily_limit = additionalOptions.paymentDailyLimit;
		}
		if (additionalOptions.paymentTransactionLimitOption !== undefined) {
			cardData.payment_transaction_limit_option = additionalOptions.paymentTransactionLimitOption;
		}
		if (additionalOptions.paymentTransactionLimit) {
			cardData.payment_transaction_limit = additionalOptions.paymentTransactionLimit;
		}
		if (additionalOptions.shipToBusiness !== undefined) {
			cardData.ship_to_business = additionalOptions.shipToBusiness;
		}
		if (additionalOptions.cardDesign) {
			cardData.card_design = additionalOptions.cardDesign;
		}

		const body: IDataObject = {
			card: cardData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// RETRIEVE CARD DATA VIEW URL
	// GET /cards/:id/data_view
	// -----------------------------------------
	if (operation === 'retrieveCard') {
		const cardId = this.getNodeParameter('cardId', i) as string;
		const endpoint = `cards/${cardId}/data_view`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}

	// -----------------------------------------
	// UPDATE CARD LIMITS
	// PATCH /cards/:id/limits
	// -----------------------------------------
	if (operation === 'updateCardLimits') {
		const cardId = this.getNodeParameter('cardId', i) as string;
		const endpoint = `cards/${cardId}/limits`;
		const updateLimits = this.getNodeParameter('updateLimits', i, {}) as IDataObject;

		const cardData: IDataObject = {};
		if (updateLimits.paymentMonthlyLimit !== undefined) {
			cardData.payment_monthly_limit = updateLimits.paymentMonthlyLimit;
		}
		if (updateLimits.atmMonthlyLimit !== undefined) {
			cardData.atm_monthly_limit = updateLimits.atmMonthlyLimit;
		}
		if (updateLimits.atmDailyLimitOption !== undefined) {
			cardData.atm_daily_limit_option = updateLimits.atmDailyLimitOption;
		}
		if (updateLimits.atmDailyLimit !== undefined) {
			cardData.atm_daily_limit = updateLimits.atmDailyLimit;
		}
		if (updateLimits.paymentDailyLimitOption !== undefined) {
			cardData.payment_daily_limit_option = updateLimits.paymentDailyLimitOption;
		}
		if (updateLimits.paymentDailyLimit !== undefined) {
			cardData.payment_daily_limit = updateLimits.paymentDailyLimit;
		}
		if (updateLimits.paymentTransactionLimitOption !== undefined) {
			cardData.payment_transaction_limit_option = updateLimits.paymentTransactionLimitOption;
		}
		if (updateLimits.paymentTransactionLimit !== undefined) {
			cardData.payment_transaction_limit = updateLimits.paymentTransactionLimit;
		}

		const body: IDataObject = {
			card: cardData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PATCH',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// UPDATE CARD OPTIONS
	// PATCH /cards/:id/options
	// -----------------------------------------
	if (operation === 'updateCardOptions') {
		const cardId = this.getNodeParameter('cardId', i) as string;
		const endpoint = `cards/${cardId}/options`;
		const updateOptions = this.getNodeParameter('updateOptions', i, {}) as IDataObject;

		const cardData: IDataObject = {};
		if (updateOptions.atmOption !== undefined) {
			cardData.atm_option = updateOptions.atmOption;
		}
		if (updateOptions.nfcOption !== undefined) {
			cardData.nfc_option = updateOptions.nfcOption;
		}
		if (updateOptions.onlineOption !== undefined) {
			cardData.online_option = updateOptions.onlineOption;
		}
		if (updateOptions.foreignOption !== undefined) {
			cardData.foreign_option = updateOptions.foreignOption;
		}

		const body: IDataObject = {
			card: cardData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PATCH',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// LOCK A CARD
	// PUT /cards/:id/lock
	// -----------------------------------------
	if (operation === 'lockCard') {
		const cardId = this.getNodeParameter('cardId', i) as string;
		const endpoint = `cards/${cardId}/lock`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PUT',
			endpoint,
			{},
			{},
		);
	}

	// -----------------------------------------
	// UNLOCK A CARD
	// PUT /cards/:id/unlock
	// -----------------------------------------
	if (operation === 'unlockCard') {
		const cardId = this.getNodeParameter('cardId', i) as string;
		const endpoint = `cards/${cardId}/unlock`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PUT',
			endpoint,
			{},
			{},
		);
	}
}

			} catch (error) {
				// ------------------------
				//      SEND RESULTS
				// ------------------------

				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
			
			if (responseData) {
				if (Array.isArray(responseData)) {
					returnData.push(...responseData);
				} else {
					returnData.push(responseData);
				}
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
