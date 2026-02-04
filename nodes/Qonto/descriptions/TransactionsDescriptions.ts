import { INodeProperties } from 'n8n-workflow';

export const transactionsOperations: INodeProperties[] = [
	// ------------------------
	//      TRANSACTIONS
	// ------------------------
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
			},
		},
		options: [
			{
				name: 'List Transactions',
				value: 'listTransactions',
				action: 'List transactions a transactions',
			},
			{
				name: 'Retrieve a Transaction',
				value: 'showTransaction',
				action: 'Returns the transaction identified by the id path parameter',
			},
		],
		default: 'listTransactions',
	},

	// ------------------------
	//      TRANSACTIONS - List transactions
	// ------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['listTransactions'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['listTransactions'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Identifier Type',
		name: 'identifierType',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['listTransactions'],
			},
		},
		options: [
			{
				name: 'IBAN',
				value: 'iban',
				description: 'Use the IBAN to identify the account',
			},
			{
				name: 'Bank Account ID',
				value: 'bankAccountId',
				description: 'Use the internal Qonto ID to identify the account',
			},
		],
		default: 'iban',
	},
	{
		displayName: 'IBAN',
		name: 'iban',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['listTransactions'],
				identifierType: ['iban'],
			},
		},
		placeholder: 'FR7616798000010000005663951',
		default: '',
		description: 'The IBAN of the account to retrieve transactions from',
	},
	{
		displayName: 'Bank Account ID',
		name: 'bankAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['listTransactions'],
				identifierType: ['bankAccountId'],
			},
		},
		placeholder: '018f71db-c635-78b5-b90a-ea05de98c2bf',
		default: '',
		description: 'The ID of the account to retrieve transactions from',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['listTransactions'],
			},
		},
		options: [
			{
				displayName: 'Created At From',
				name: 'created_at_from',
				type: 'dateTime',
				placeholder: '2019-01-10T11:47:53.123Z',
				default: '',
				description: 'Filter by created_at from (valid datetime format, e.g. ISO 8601)',
			},
			{
				displayName: 'Created At To',
				name: 'created_at_to',
				type: 'dateTime',
				placeholder: '2019-01-10T11:47:53.123Z',
				default: '',
				description: 'Filter by created_at to (valid datetime format, e.g. ISO 8601)',
			},
			{
				displayName: 'Emitted At From',
				name: 'emitted_at_from',
				type: 'dateTime',
				placeholder: '2019-01-10T11:47:53.123Z',
				default: '',
				description: 'Filter by emitted_at from (valid datetime format, e.g. ISO 8601)',
			},
			{
				displayName: 'Emitted At To',
				name: 'emitted_at_to',
				type: 'dateTime',
				placeholder: '2019-01-10T11:47:53.123Z',
				default: '',
				description: 'Filter by emitted_at to (valid datetime format, e.g. ISO 8601)',
			},
			{
				displayName: 'Includes',
				name: 'includes',
				type: 'multiOptions',
				options: [
					{
						name: 'Attachments',
						value: 'attachments',
					},
					{
						name: 'Labels',
						value: 'labels',
					},
					{
						name: 'VAT Details',
						value: 'vat_details',
					},
				],
				default: [],
				description:
					'Embed the associated resources (labels, attachments and/or VAT details) of the transactions in the JSON response',
			},
			{
				displayName: 'Operation Type',
				name: 'operation_type',
				type: 'string',
				placeholder: 'transfer',
				default: '',
				description: 'Filter by operation_type (e.g. card, transfer, income, account_remuneration)',
			},
			{
				displayName: 'Settled At From',
				name: 'settled_at_from',
				type: 'dateTime',
				placeholder: '2019-01-10T11:47:53.123Z',
				default: '',
				description: 'Filter by settled_at from (valid datetime format, e.g. ISO 8601)',
			},
			{
				displayName: 'Settled At To',
				name: 'settled_at_to',
				type: 'dateTime',
				placeholder: '2019-01-10T11:47:53.123Z',
				default: '',
				description: 'Filter by settled_at to (valid datetime format, e.g. ISO 8601)',
			},
			{
				displayName: 'Side',
				name: 'side',
				type: 'options',
				options: [
					{
						name: 'Credit',
						value: 'credit',
					},
					{
						name: 'Debit',
						value: 'debit',
					},
				],
				default: 'credit',
				description: 'Filter by side (credit or debit)',
			},
			{
				displayName: 'Sort By',
				name: 'sort_by',
				type: 'options',
				options: [
					{
						name: 'Created At (Ascending)',
						value: 'created_at:asc',
					},
					{
						name: 'Created At (Descending)',
						value: 'created_at:desc',
					},
					{
						name: 'Emitted At (Ascending)',
						value: 'emitted_at:asc',
					},
					{
						name: 'Emitted At (Descending)',
						value: 'emitted_at:desc',
					},
					{
						name: 'Settled At (Ascending)',
						value: 'settled_at:asc',
					},
					{
						name: 'Settled At (Descending)',
						value: 'settled_at:desc',
					},
					{
						name: 'Updated At (Ascending)',
						value: 'updated_at:asc',
					},
					{
						name: 'Updated At (Descending)',
						value: 'updated_at:desc',
					},
				],
				default: 'settled_at:desc',
				description: 'Sort by a specific property and order',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{
						name: 'Completed',
						value: 'completed',
					},
					{
						name: 'Declined',
						value: 'declined',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
				],
				default: [],
				description:
					'Filter by status. When not specified, only completed transactions will be returned.',
			},
			{
				displayName: 'Updated At From',
				name: 'updated_at_from',
				type: 'dateTime',
				placeholder: '2019-01-10T11:47:53.123Z',
				default: '',
				description: 'Filter by updated_at from (valid datetime format, e.g. ISO 8601)',
			},
			{
				displayName: 'Updated At To',
				name: 'updated_at_to',
				type: 'dateTime',
				placeholder: '2019-01-10T11:47:53.123Z',
				default: '',
				description: 'Filter by updated_at to (valid datetime format, e.g. ISO 8601)',
			},
			{
				displayName: 'With Attachments',
				name: 'with_attachments',
				type: 'boolean',
				default: false,
				description: 'Whether to filter based on presence of one or more attachments',
			},
		],
	},

	// ------------------------
	//      TRANSACTIONS - Show transaction
	// ------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['showTransaction'],
			},
		},
		placeholder: '7b7a5ed6-3903-4782-889d-b4f64bd7bef9',
		default: '',
		description: 'Retrieve a single transaction within a particular bank account',
	},
	{
		displayName: 'Includes',
		name: 'includes',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['showTransaction'],
			},
		},
		options: [
			{
				name: 'Attachments',
				value: 'attachments',
			},
			{
				name: 'Labels',
				value: 'labels',
			},
			{
				name: 'VAT Details',
				value: 'vat_details',
			},
		],
		default: [],
		description:
			'Embed the associated resources (labels, attachments and/or VAT details) of the transaction in the JSON response',
	},
];
