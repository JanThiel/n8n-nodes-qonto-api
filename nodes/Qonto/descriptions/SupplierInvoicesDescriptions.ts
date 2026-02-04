// supplierInvoicesOperations.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "Get a list of supplier invoices" operation
export const supplierInvoicesOperations: INodeProperties[] = [
	// ------------------------
	//      SUPPLIER INVOICES
	// ------------------------

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['supplierInvoices'],
			},
		},
		options: [
			{
				name: 'Get a List of Supplier Invoices',
				value: 'getSupplierInvoices',
				action: 'Get a list of supplier invoices',
			},
			{
				name: 'Create Supplier Invoices with Attachments',
				value: 'createSupplierInvoices',
				action: 'Create supplier invoices with attachments',
			},
			{
				name: 'Retrieve Supplier Invoice',
				value: 'showSupplierInvoice',
				action: 'Retrieve a supplier invoice',
			},
		],
		default: 'getSupplierInvoices',
	},

	// ------------------------
	//      SUPPLIER INVOICES - Get a list of supplier invoices
	// ------------------------

	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['supplierInvoices'],
				operation: ['getSupplierInvoices'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['supplierInvoices'],
				operation: ['getSupplierInvoices'],
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
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['supplierInvoices'],
				operation: ['getSupplierInvoices'],
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
				description: 'Filter supplier invoices by their payment status',
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
	//      SUPPLIER INVOICES - Create supplier invoices with attachments
	// ------------------------

	{
		displayName: 'Supplier Invoice ID',
		name: 'supplierInvoiceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['supplierInvoices'],
				operation: ['showSupplierInvoice'],
			},
		},
		default: '',
		required: true,
		description: 'The unique identifier of the supplier invoice to retrieve',
	},
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['supplierInvoices'],
				operation: ['createSupplierInvoices'],
			},
		},
		default: '',
		required: true,
		description:
			'The unique identifier of the organization for which supplier invoices will be created',
	},
	{
		displayName: 'Supplier Invoices',
		name: 'supplierInvoices',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['supplierInvoices'],
				operation: ['createSupplierInvoices'],
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		required: true,
		description: 'Details of the supplier invoices to be created',
		options: [
			{
				displayName: 'Invoice',
				name: 'invoice',
				values: [
					{
						displayName: 'Amount',
						name: 'amount',
						type: 'number',
						default: '',
						required: true,
						description: 'Amount of the supplier invoice',
					},
					{
						displayName: 'Attachment IDs',
						name: 'attachmentIds',
						type: 'string',
						default: '',
						required: true,
						description: 'Comma-separated IDs of the attachments associated with the invoice',
					},
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'string',
						default: 'EUR',
						required: true,
						description: 'Currency of the supplier invoice',
					},
					{
						displayName: 'Invoice Date',
						name: 'invoiceDate',
						type: 'dateTime',
						default: '',
						required: true,
						description: 'Date of the supplier invoice',
					},
					{
						displayName: 'Invoice Number',
						name: 'invoiceNumber',
						type: 'string',
						default: '',
						required: true,
						description: 'Unique number of the supplier invoice',
					},
				],
			},
		],
	},
];
