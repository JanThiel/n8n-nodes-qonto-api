import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class QontoOAuth2Api implements ICredentialType {
	name = 'qontoOAuth2Api';
	extends = ['oAuth2Api'];
	displayName = 'Qonto OAuth2 API';
	documentationUrl = 'https://api-doc.qonto.com/docs/business-api';
	icon: Icon = 'file:../icons/qonto.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'Environment Type',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Production',
					value: 'production',
				},
				{
					name: 'Sandbox',
					value: 'sandbox',
				},
			],
			default: 'production',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			required: true,
			default:
				'={{ $self["environment"] === "sandbox" ? "https://sandbox.staging.qonto.co/oauth2/auth" : "https://oauth.qonto.com/oauth2/auth" }}',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			required: true,
			default:
				'={{ $self["environment"] === "sandbox" ? "https://sandbox.staging.qonto.co/oauth2/token" : "https://oauth.qonto.com/oauth2/token" }}',
		},
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			required: true,
			default: '',
			description:
				'OAuth2 in Qonto requires manual user interaction and is not recommended for unattended automation. Scope details: https://api-doc.qonto.com/docs/business-api/6434cbb9d968d-qonto',
		},
		{
			displayName: 'X-Qonto-Staging-Token',
			name: 'stagingToken',
			type: 'string',
			typeOptions: { password: true },
			displayOptions: {
				show: {
					environment: ['sandbox'],
				},
			},
			default: '',
			description: 'Required for Machine-to-Machine access in sandbox environment',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			required: false,
			default: '',
			description: '',
		},
	];
}
