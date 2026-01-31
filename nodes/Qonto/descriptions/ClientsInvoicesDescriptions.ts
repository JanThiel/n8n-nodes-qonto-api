// clientInvoicesDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "List client invoices" operation
export const clientsInvoicesOperations: INodeProperties[] = [

// ------------------------
//      Client Invoice
// ------------------------

{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'clientsInvoices',
			],
		},
	},
	options: [
		{
			name: 'List Client Invoices',
			value: 'listInvoices',
			action: 'List client invoices',
		},
		{
			name: 'Create a Client Invoice',
			value: 'createClientInvoice',
			action: 'Create a client invoice',
		},
		{
			name: 'Update a Draft Client Invoice',
			value: 'updateClientInvoice',
			action: 'Update a draft client invoice',
		},
		{
			name: 'Show Client Invoice',
			value: 'showClientInvoice',
			action: 'Show client invoice',
		},
	],
	default: 'listInvoices',
},
// ------------------------
//      Client Invoice - List client invoices
// ------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'listInvoices',
				],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'listInvoices',
				],
				returnAll: [
					false,
				],
			},
		},
		typeOptions: {
			minValue: 1,
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
                resource: [
                    'clientsInvoices',
                ],
                operation: [
                    'listInvoices',
                ],
            },
        },
        options: [
            {
                displayName: 'Created At From',
                name: 'created_at_from',
                type: 'dateTime',
                default: '',
                description: 'Filter invoices created from this date (ISO 8601 format)',
            },
            {
                displayName: 'Created At To',
                name: 'created_at_to',
                type: 'dateTime',
                default: '',
                description: 'Filter invoices created up to this date (ISO 8601 format)',
            },
            {
                displayName: 'Exclude Imported',
                name: 'exclude_imported',
                type: 'boolean',
                default: true,
                description: 'Whether to exclude imported invoices. Default is true.',
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
                ],
                default: 'created_at:desc',
                description: 'Sort invoices by created_at property',
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'Canceled', value: 'canceled' },
                    { name: 'Draft', value: 'draft' },
                    { name: 'Paid', value: 'paid' },
                    { name: 'Unpaid', value: 'unpaid' },
                ],
                default: 'draft',
                description: 'Filter client invoices by status',
            },
            {
                displayName: 'Updated At From',
                name: 'updated_at_from',
                type: 'dateTime',
                default: '',
                description: 'Filter invoices updated from this date (ISO 8601 format)',
            },
            {
                displayName: 'Updated At To',
                name: 'updated_at_to',
                type: 'dateTime',
                default: '',
                description: 'Filter invoices updated up to this date (ISO 8601 format)',
            },
        ],
    },

// ------------------------
//      Client Invoice - Create a client invoice
// ------------------------

	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'createClientInvoice',
				],
			},
		},
		default: '',
		required: true,
		description: 'The unique identifier of the client for the invoice',
	},
	{
		displayName: 'Issue Date',
		name: 'issueDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'createClientInvoice',
				],
			},
		},
		default: '',
		required: true,
		description: 'The issue date of the invoice (YYYY-MM-DD)',
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'createClientInvoice',
				],
			},
		},
		default: '',
		required: true,
		description: 'The due date for the invoice payment (YYYY-MM-DD)',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'createClientInvoice',
				],
			},
		},
		default: 'EUR',
		required: true,
		description: 'Currency of the invoice (e.g., EUR)',
	},
	{
		displayName: 'Payment IBAN',
		name: 'paymentIban',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'createClientInvoice',
				],
			},
		},
		default: '',
		required: true,
		description: 'The IBAN for payment',
	},
	{
		displayName: 'Invoice Items',
		name: 'items',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'createClientInvoice',
				],
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		required: true,
		description: 'Items to include in the invoice',
		options: [
			{
				displayName: 'Item',
				name: 'item',
				values: [
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Description of the item',
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'string',
						default: '1',
							required:	true,
						description: 'Quantity of the item',
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
							required:	true,
						description: 'Title of the invoice item',
					},
					{
						displayName: 'Unit',
						name: 'unit',
						type: 'string',
						default: '',
						description: 'Unit of measurement (e.g., \'hour\', \'piece\')',
					},
					{
						displayName: 'Unit Price Currency',
						name: 'unitPriceCurrency',
						type: 'string',
						default: 'EUR',
							required:	true,
						description: 'Currency of the unit price',
					},
					{
						displayName: 'Unit Price Value',
						name: 'unitPriceValue',
						type: 'string',
						default: '',
							required:	true,
						description: 'Unit price value (as string, e.g., \'100.00\')',
					},
					{
						displayName: 'VAT Rate',
						name: 'vatRate',
						type: 'string',
						default: '0',
							required:	true,
						description: 'VAT rate (e.g., \'20\' for 20%)',
					},
				],
			},
		],
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'createClientInvoice',
				],
			},
		},
		options: [
			{
				displayName: 'Footer',
				name: 'footer',
				type: 'string',
				default: '',
				description: 'Footer text for the invoice',
			},
			{
				displayName: 'Header',
				name: 'header',
				type: 'string',
				default: '',
				description: 'Header text for the invoice',
			},
			{
				displayName: 'Invoice Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Custom invoice number',
			},
			{
				displayName: 'Performance End Date',
				name: 'performanceEndDate',
				type: 'dateTime',
				default: '',
				description: 'End date of the performance period',
			},
			{
				displayName: 'Performance Start Date',
				name: 'performanceStartDate',
				type: 'dateTime',
				default: '',
				description: 'Start date of the performance period',
			},
			{
				displayName: 'Purchase Order',
				name: 'purchaseOrder',
				type: 'string',
				default: '',
				description: 'Purchase order reference',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Draft', value: 'draft' },
					{ name: 'Pending', value: 'pending' },
				],
				default: 'draft',
				description: 'Status of the invoice',
			},
			{
				displayName: 'Terms and Conditions',
				name: 'termsAndConditions',
				type: 'string',
				default: '',
				description: 'Terms and conditions text',
			},
		],
	},

// ------------------------
//      Client Invoice - Update a draft client invoice
// ------------------------

	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'updateClientInvoice',
				],
			},
		},
		default: '',
		required: true,
		description: 'The unique identifier of the invoice to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'updateClientInvoice',
				],
			},
		},
		options: [
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'string',
				default: '',
				description: 'The unique identifier of the client',
			},
			{
				displayName: 'Issue Date',
				name: 'issueDate',
				type: 'dateTime',
				default: '',
				description: 'The issue date of the invoice (YYYY-MM-DD)',
			},
			{
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'dateTime',
				default: '',
				description: 'The due date for the invoice payment (YYYY-MM-DD)',
			},
			{
				displayName: 'Invoice Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Custom invoice number',
			},
			{
				displayName: 'Purchase Order',
				name: 'purchaseOrder',
				type: 'string',
				default: '',
				description: 'Purchase order reference',
			},
			{
				displayName: 'Terms and Conditions',
				name: 'termsAndConditions',
				type: 'string',
				default: '',
				description: 'Terms and conditions text',
			},
			{
				displayName: 'Header',
				name: 'header',
				type: 'string',
				default: '',
				description: 'Header text for the invoice',
			},
			{
				displayName: 'Footer',
				name: 'footer',
				type: 'string',
				default: '',
				description: 'Footer text for the invoice',
			},
			{
				displayName: 'Payment IBAN',
				name: 'paymentIban',
				type: 'string',
				default: '',
				description: 'The IBAN for payment',
			},
		],
	},

// ------------------------
//      Client Invoice - Show client invoice
// ------------------------

	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'clientsInvoices',
				],
				operation: [
					'showClientInvoice',
				],
			},
		},
		default: '',
		required: true,
		description: 'The unique identifier of the invoice to show',
	},

];
