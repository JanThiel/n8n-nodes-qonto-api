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
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'All', value: 'all' },
                    { name: 'Pending', value: 'pending' },
                    { name: 'Paid', value: 'paid' },
                ],
                default: 'all',
                description: 'Filter client invoices by their payment status',
            },
            {
                displayName: 'Start Date',
                name: 'start_date',
                type: 'dateTime',
                default: '',
                description: 'Fetch invoices created after this date',
            },
            {
                displayName: 'End Date',
                name: 'end_date',
                type: 'dateTime',
                default: '',
                description: 'Fetch invoices created before this date',
            },
        ],
    },

// ------------------------
//      Client Invoice - Create a client invoice
// ------------------------

    {
        displayName: 'Organization ID',
        name: 'organizationId',
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
        description: 'The unique identifier of the organization for which the client invoice will be created',
    },
    {
        displayName: 'Client Invoice',
        name: 'clientInvoice',
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
            multipleValues: false,
        },
        default: {},
        required: true,
        description: 'Details of the client invoice to be created',
        options: [
            {
                displayName: 'Invoice Details',
                name: 'invoiceDetails',
                values: [
													{
														displayName: 'Amount',
														name: 'amount',
														type: 'number',
														default: '',
															required:	true,
														description: 'Amount of the client invoice',
													},
													{
														displayName: 'Currency',
														name: 'currency',
														type: 'string',
														default: 'EUR',
															required:	true,
														description: 'Currency of the client invoice',
													},
													{
														displayName: 'Description',
														name: 'description',
														type: 'string',
														default: '',
														description: 'Description or details of the client invoice',
													},
													{
														displayName: 'Due Date',
														name: 'dueDate',
														type: 'dateTime',
														default: '',
															required:	true,
														description: 'Due date for the client invoice payment',
													},
													{
														displayName: 'Invoice Date',
														name: 'invoiceDate',
														type: 'dateTime',
														default: '',
															required:	true,
														description: 'Date of the client invoice',
													},
													{
														displayName: 'Invoice Number',
														name: 'invoiceNumber',
														type: 'string',
														default: '',
															required:	true,
														description: 'Unique number of the client invoice',
													},
												],
            },
        ],
    },

// ------------------------
//      Client Invoice - Show client invoice
// ------------------------

];
