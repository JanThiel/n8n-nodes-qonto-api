import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class QontoApi implements ICredentialType {
	name = 'qontoApi';
	displayName = 'Qonto API';
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
			displayName: 'Login',
			name: 'login',
			type: 'string',
			default: '',
			placeholder: 'scep-1111',
		},
		{
			displayName: 'Secret Key',
			name: 'secretKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'f8952b8244c0ce693c8f793a07e807f8',
		},
		{
			displayName: 'X-Qonto-Staging-Token',
			name: 'stagingToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			displayOptions: {
				show: {
					environment: ['sandbox'],
				},
			},
			default: '',
			description: 'Required for Machine-to-Machine access in sandbox environment',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.login}}:{{$credentials.secretKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL:
				'={{$credentials.environment === "sandbox" ? "https://thirdparty-sandbox.staging.qonto.co/v2" : "https://thirdparty.qonto.com/v2"}}',
			url: '/organization',
			method: 'GET',
			headers: {
				'X-Qonto-Staging-Token':
					'={{$credentials.environment === "sandbox" ? $credentials.stagingToken : undefined}}',
			},
		},
	};
}
