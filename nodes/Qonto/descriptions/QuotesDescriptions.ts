import { INodeProperties } from 'n8n-workflow';

export const quotesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['quotes'],
			},
		},
		options: [
			{ name: 'Create Quote', value: 'createQuote', action: 'Create a quote' },
			{ name: 'Delete Quote', value: 'deleteQuote', action: 'Delete a quote' },
			{ name: 'Get Quote', value: 'showQuote', action: 'Get a quote' },
			{ name: 'List Quotes', value: 'listQuotes', action: 'List quotes' },
			{ name: 'Send Quote', value: 'sendQuote', action: 'Send a quote by email' },
			{ name: 'Update Quote', value: 'updateQuote', action: 'Update a quote' },
		],
		default: 'listQuotes',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['quotes'],
				operation: ['listQuotes'],
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
				resource: ['quotes'],
				operation: ['listQuotes'],
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
				resource: ['quotes'],
				operation: ['listQuotes'],
			},
		},
		description: 'Optional list query object',
	},
	{
		displayName: 'Quote ID',
		name: 'quoteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['quotes'],
				operation: ['sendQuote', 'showQuote', 'updateQuote', 'deleteQuote'],
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
				resource: ['quotes'],
				operation: ['createQuote', 'updateQuote', 'sendQuote'],
			},
		},
		description: 'Request payload as JSON',
	},
];
