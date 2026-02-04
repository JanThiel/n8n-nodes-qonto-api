import { INodeProperties } from 'n8n-workflow';

export const internationalTransfersOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['internationalTransfers'],
			},
		},
		options: [
			{
				name: 'Check Eligibility',
				value: 'checkInternationalEligibility',
				action: 'Check international transfer eligibility',
			},
			{
				name: 'Create International Beneficiary',
				value: 'createInternationalBeneficiary',
				action: 'Create an international beneficiary',
			},
			{
				name: 'Create International Transfer',
				value: 'createInternationalTransfer',
				action: 'Create an international transfer',
			},
			{ name: 'Create Quote', value: 'createInternationalQuote', action: 'Create an international quote' },
			{
				name: 'Delete International Beneficiary',
				value: 'deleteInternationalBeneficiary',
				action: 'Delete an international beneficiary',
			},
			{
				name: 'Get Available Currencies',
				value: 'getInternationalCurrencies',
				action: 'Get available currencies for international transfers',
			},
			{
				name: 'List Beneficiary Requirements',
				value: 'listInternationalBeneficiaryRequirements',
				action: 'List requirements for an international beneficiary',
			},
			{
				name: 'List International Beneficiaries',
				value: 'listInternationalBeneficiaries',
				action: 'List international beneficiaries',
			},
			{
				name: 'List International Transfer Requirements',
				value: 'listInternationalTransferRequirements',
				action: 'List international transfer requirements',
			},
			{
				name: 'Update International Beneficiary',
				value: 'updateInternationalBeneficiary',
				action: 'Update an international beneficiary',
			},
		],
		default: 'checkInternationalEligibility',
	},
	{
		displayName: 'Source Currency',
		name: 'source',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['internationalTransfers'],
				operation: ['getInternationalCurrencies'],
			},
		},
		description: 'Optional source currency',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['internationalTransfers'],
				operation: ['listInternationalBeneficiaries'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 50,
		displayOptions: {
			show: {
				resource: ['internationalTransfers'],
				operation: ['listInternationalBeneficiaries'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Query (JSON)',
		name: 'query',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['internationalTransfers'],
				operation: ['listInternationalBeneficiaries'],
			},
		},
		description: 'Optional query object for listing beneficiaries',
	},
	{
		displayName: 'Beneficiary ID',
		name: 'beneficiaryId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['internationalTransfers'],
				operation: ['updateInternationalBeneficiary', 'deleteInternationalBeneficiary'],
			},
		},
	},
	{
		displayName: 'Payload (JSON)',
		name: 'payload',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['internationalTransfers'],
				operation: [
					'createInternationalQuote',
					'listInternationalBeneficiaryRequirements',
					'createInternationalBeneficiary',
					'updateInternationalBeneficiary',
					'createInternationalTransfer',
					'listInternationalTransferRequirements',
				],
			},
		},
		description: 'Request payload as JSON object',
	},
];
