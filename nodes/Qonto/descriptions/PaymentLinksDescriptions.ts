import { INodeProperties } from 'n8n-workflow';

export const paymentLinksOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
			},
		},
		options: [
			{ name: 'Connect Provider', value: 'connectPaymentLinksProvider', action: 'Connect to payment links provider' },
			{ name: 'Create Payment Link', value: 'createPaymentLink', action: 'Create a payment link' },
			{
				name: 'Deactivate Payment Link',
				value: 'deactivatePaymentLink',
				action: 'Deactivate a payment link',
			},
			{
				name: 'Get Connection Status',
				value: 'getPaymentLinksConnectionStatus',
				action: 'Get payment links connection status',
			},
			{ name: 'Get Payment Link', value: 'showPaymentLink', action: 'Get a payment link' },
			{
				name: 'List Available Payment Methods',
				value: 'listPaymentLinkMethods',
				action: 'List available payment methods',
			},
			{
				name: 'List Payment Link Payments',
				value: 'listPaymentLinkPayments',
				action: 'List payments for a payment link',
			},
			{ name: 'List Payment Links', value: 'listPaymentLinks', action: 'List payment links' },
		],
		default: 'listPaymentLinks',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
				operation: ['listPaymentLinks', 'listPaymentLinkPayments'],
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
				resource: ['paymentLinks'],
				operation: ['listPaymentLinks', 'listPaymentLinkPayments'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Payment Link ID',
		name: 'paymentLinkId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
				operation: ['showPaymentLink', 'deactivatePaymentLink', 'listPaymentLinkPayments'],
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
				resource: ['paymentLinks'],
				operation: ['connectPaymentLinksProvider', 'createPaymentLink'],
			},
		},
		description: 'Request payload as JSON',
	},
	{
		displayName: 'Query (JSON)',
		name: 'query',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
				operation: ['listPaymentLinks', 'listPaymentLinkPayments', 'listPaymentLinkMethods'],
			},
		},
		description: 'Optional query object',
	},
];
