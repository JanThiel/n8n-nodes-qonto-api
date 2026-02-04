// statementsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

export const statementsOperations: INodeProperties[] = [
	// ------------------------
	//      statements
	// ------------------------

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['statements'],
			},
		},
		options: [
			{
				name: 'Show Statement',
				value: 'showStatement',
				action: 'Show statement',
			},
			{
				name: 'List Statements',
				value: 'listStatement',
				action: 'List statements',
			},
		],
		default: 'showStatement',
	},

	// ------------------------
	//      statements - Show statement
	// ------------------------

	{
		displayName: 'Statement ID',
		name: 'statementId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['statements'],
				operation: ['showStatement'],
			},
		},
		default: '',
		required: true,
		description: 'The unique identifier of the statement to be fetched',
	},

	// ------------------------
	//      statements - List statements
	// ------------------------

	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['statements'],
				operation: ['listStatement'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['statements'],
				operation: ['listStatement'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['statements'],
				operation: ['listStatement'],
			},
		},
		options: [
			{
				displayName: 'Bank Account IDs',
				name: 'bank_account_ids',
				type: 'string',
				default: '',
				description:
					'Filter by bank_account_id. Comma-separated list of IDs. Mutually exclusive with IBANs.',
			},
			{
				displayName: 'IBANs',
				name: 'ibans',
				type: 'string',
				default: '',
				description:
					'Filter by IBAN. Comma-separated list of IBANs. Mutually exclusive with Bank Account IDs.',
			},
			{
				displayName: 'Period From',
				name: 'period_from',
				type: 'string',
				placeholder: '01-2023',
				default: '',
				description: 'Filter by period from (format: MM-YYYY)',
			},
			{
				displayName: 'Period To',
				name: 'period_to',
				type: 'string',
				placeholder: '12-2023',
				default: '',
				description: 'Filter by period to (format: MM-YYYY)',
			},
			{
				displayName: 'Sort By',
				name: 'sort_by',
				type: 'options',
				options: [
					{
						name: 'Period (Ascending)',
						value: 'period:asc',
					},
					{
						name: 'Period (Descending)',
						value: 'period:desc',
					},
				],
				default: 'period:desc',
				description: 'Sort by period in ascending or descending order',
			},
		],
	},
];
