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
				resource: ['clientsInvoices'],
			},
		},
		options: [
			{ name: 'Cancel Client Invoice', value: 'cancelClientInvoice', action: 'Cancel a client invoice' },
			{
				name: 'Create a Client Invoice',
				value: 'createClientInvoice',
				action: 'Create a client invoice',
			},
			{ name: 'Delete Client Invoice', value: 'deleteClientInvoice', action: 'Delete a client invoice' },
			{ name: 'Finalize Client Invoice', value: 'finalizeClientInvoice', action: 'Finalize a client invoice' },
			{ name: 'List Client Invoices', value: 'listInvoices', action: 'List client invoices' },
			{
				name: 'Mark Client Invoice as Paid',
				value: 'markClientInvoiceAsPaid',
				action: 'Mark a client invoice as paid',
			},
			{ name: 'Send Client Invoice', value: 'sendClientInvoice', action: 'Send a client invoice by email' },
			{ name: 'Show Client Invoice', value: 'showClientInvoice', action: 'Show client invoice' },
			{
				name: 'Unmark Client Invoice as Paid',
				value: 'unmarkClientInvoiceAsPaid',
				action: 'Unmark a client invoice as paid',
			},
			{
				name: 'Update a Draft Client Invoice',
				value: 'updateClientInvoice',
				action: 'Update a draft client invoice',
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
				resource: ['clientsInvoices'],
				operation: ['listInvoices'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['clientsInvoices'],
				operation: ['listInvoices'],
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
				resource: ['clientsInvoices'],
				operation: ['listInvoices'],
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
				resource: ['clientsInvoices'],
				operation: ['createClientInvoice'],
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
				resource: ['clientsInvoices'],
				operation: ['createClientInvoice'],
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
				resource: ['clientsInvoices'],
				operation: ['createClientInvoice'],
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
				resource: ['clientsInvoices'],
				operation: ['createClientInvoice'],
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
				resource: ['clientsInvoices'],
				operation: ['createClientInvoice'],
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
				resource: ['clientsInvoices'],
				operation: ['createClientInvoice'],
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
						required: true,
						description: 'Quantity of the item',
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
						required: true,
						description: 'Title of the invoice item',
					},
					{
						displayName: 'Unit',
						name: 'unit',
						type: 'string',
						default: '',
						description: "Unit of measurement (e.g., 'hour', 'piece')",
					},
					{
						displayName: 'Unit Price Currency',
						name: 'unitPriceCurrency',
						type: 'string',
						default: 'EUR',
						required: true,
						description: 'Currency of the unit price',
					},
					{
						displayName: 'Unit Price Value',
						name: 'unitPriceValue',
						type: 'string',
						default: '',
						required: true,
						description: "Unit price value (as string, e.g., '100.00')",
					},
					{
						displayName: 'VAT Rate',
						name: 'vatRate',
						type: 'string',
						default: '0',
						required: true,
						description: "VAT rate (e.g., '20' for 20%)",
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
				resource: ['clientsInvoices'],
				operation: ['createClientInvoice'],
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
				resource: ['clientsInvoices'],
				operation: ['updateClientInvoice'],
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
				resource: ['clientsInvoices'],
				operation: ['updateClientInvoice'],
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
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'dateTime',
				default: '',
				description: 'The due date for the invoice payment (YYYY-MM-DD)',
			},
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
				displayName: 'Invoice Items',
				name: 'items',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
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
						displayName: 'Discount Type',
						name: 'discountType',
						type: 'options',
						options: [
									{
										name: 'Percentage',
										value: 'percentage',
									},
									{
										name: 'Absolute',
										value: 'absolute',
									},
								],
						default: 'percentage',
						description: 'Type of discount',
							},
							{
						displayName: 'Discount Value',
						name: 'discountValue',
						type: 'string',
						default: '',
							},
							{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'string',
						default: '1',
						description: 'Quantity of the item',
							},
							{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
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
						description: 'Currency of the unit price',
							},
							{
						displayName: 'Unit Price Value',
						name: 'unitPriceValue',
						type: 'string',
						default: '',
						description: 'Unit price value (as string, e.g., \'100.00\')',
							},
							{
						displayName: 'VAT Exemption Reason',
						name: 'vatExemptionReason',
						type: 'string',
						default: '',
						description: 'VAT exemption reason code',
							},
							{
						displayName: 'VAT Rate',
						name: 'vatRate',
						type: 'string',
						default: '0',
						description: 'VAT rate (e.g., \'20\' for 20%)',
							},
					],
					},
				],
			},
			{
				displayName: 'Invoice Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Custom invoice number',
			},
			{
				displayName: 'Issue Date',
				name: 'issueDate',
				type: 'dateTime',
				default: '',
				description: 'The issue date of the invoice (YYYY-MM-DD)',
			},
			{
				displayName: 'Payment IBAN',
				name: 'paymentIban',
				type: 'string',
				default: '',
				description: 'The IBAN for payment',
			},
			{
				displayName: 'Payment Reporting',
				name: 'paymentReporting',
				type: 'collection',
				placeholder: 'Add Payment Reporting',
				default: {},
				description: 'Payment reporting details for e-invoicing',
				options: [
					{
						displayName: 'Conditions',
						name: 'conditions',
						type: 'options',
						options: [
							{ name: 'TP01', value: 'TP01' },
							{ name: 'TP02', value: 'TP02' },
							{ name: 'TP03', value: 'TP03' },
						],
						default: 'TP01',
						description: 'Payment conditions code',
					},
					{
						displayName: 'Method',
						name: 'method',
						type: 'options',
						options: [
							{ name: 'MP01', value: 'MP01' },
							{ name: 'MP02', value: 'MP02' },
							{ name: 'MP03', value: 'MP03' },
							{ name: 'MP04', value: 'MP04' },
							{ name: 'MP05', value: 'MP05' },
							{ name: 'MP06', value: 'MP06' },
							{ name: 'MP07', value: 'MP07' },
							{ name: 'MP08', value: 'MP08' },
							{ name: 'MP09', value: 'MP09' },
							{ name: 'MP10', value: 'MP10' },
							{ name: 'MP11', value: 'MP11' },
							{ name: 'MP12', value: 'MP12' },
							{ name: 'MP13', value: 'MP13' },
							{ name: 'MP14', value: 'MP14' },
							{ name: 'MP15', value: 'MP15' },
							{ name: 'MP16', value: 'MP16' },
							{ name: 'MP17', value: 'MP17' },
							{ name: 'MP18', value: 'MP18' },
							{ name: 'MP19', value: 'MP19' },
							{ name: 'MP20', value: 'MP20' },
							{ name: 'MP21', value: 'MP21' },
							{ name: 'MP22', value: 'MP22' },
							{ name: 'MP23', value: 'MP23' },
						],
						default: 'MP01',
						description: 'Payment method code',
					},
				],
			},
			{
				displayName: 'Performance Date',
				name: 'performanceDate',
				type: 'dateTime',
				default: '',
				description: 'The performance date (YYYY-MM-DD)',
			},
			{
				displayName: 'Purchase Order',
				name: 'purchaseOrder',
				type: 'string',
				default: '',
				description: 'Purchase order reference',
			},
			{
				displayName: 'Report E-Invoicing',
				name: 'reportEinvoicing',
				type: 'boolean',
				default: false,
				description: 'Whether to report this invoice for e-invoicing',
			},
			{
				displayName: 'Settings',
				name: 'settings',
				type: 'collection',
				placeholder: 'Add Setting',
				default: {},
				description: 'Invoice settings and company information',
				options: [
					{
						displayName: 'Commercial Register Number',
						name: 'commercialRegisterNumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Company Leadership',
						name: 'companyLeadership',
						type: 'string',
						default: '',
						description: 'Company leadership information',
					},
					{
						displayName: 'Discount Conditions',
						name: 'discountConditions',
						type: 'string',
						default: '',
						description: 'Discount conditions text',
					},
					{
						displayName: 'District Court',
						name: 'districtCourt',
						type: 'string',
						default: '',
						description: 'District court information',
					},
					{
						displayName: 'Late Payment Penalties',
						name: 'latePaymentPenalties',
						type: 'string',
						default: '',
						description: 'Late payment penalties text',
					},
					{
						displayName: 'Legal Capital Share',
						name: 'legalCapitalShare',
						type: 'fixedCollection',
						default: {},
						description: 'Legal capital share details',
						options: [
							{
								displayName: 'Capital Share',
								name: 'capitalShare',
								values: [
									{
										displayName: 'Value',
										name: 'value',
										type: 'string',
										default: '',
										description: 'Capital share value',
									},
									{
										displayName: 'Currency',
										name: 'currency',
										type: 'string',
										default: 'EUR',
										description: 'Currency code (e.g., EUR)',
									},
								],
							},
						],
					},
					{
						displayName: 'Legal Fixed Compensation',
						name: 'legalFixedCompensation',
						type: 'string',
						default: '',
						description: 'Legal fixed compensation text',
					},
					{
						displayName: 'Tax Number',
						name: 'taxNumber',
						type: 'string',
						default: '',
						description: 'Tax identification number',
					},
					{
						displayName: 'Transaction Type',
						name: 'transactionType',
						type: 'options',
						options: [
							{ name: 'Goods', value: 'goods' },
							{ name: 'Services', value: 'services' },
							{ name: 'Goods and Services', value: 'goods_and_services' },
						],
						default: 'goods',
						description: 'Type of transaction',
					},
					{
						displayName: 'VAT Number',
						name: 'vatNumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'VAT Payment Condition',
						name: 'vatPaymentCondition',
						type: 'options',
						options: [
							{ name: 'Compensated for Sales', value: 'compensated_for_sales' },
							{ name: 'On Receipts', value: 'on_receipts' },
							{ name: 'Exempt', value: 'exempt' },
						],
						default: 'compensated_for_sales',
					},
				],
			},
			{
				displayName: 'Stamp Duty Amount',
				name: 'stampDutyAmount',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Terms and Conditions',
				name: 'termsAndConditions',
				type: 'string',
				default: '',
				description: 'Terms and conditions text',
			},
			{
				displayName: 'Welfare Fund',
				name: 'welfareFund',
				type: 'collection',
				placeholder: 'Add Welfare Fund',
				default: {},
				description: 'Welfare fund details for e-invoicing',
				options: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'TC01', value: 'TC01' },
							{ name: 'TC02', value: 'TC02' },
							{ name: 'TC03', value: 'TC03' },
							{ name: 'TC04', value: 'TC04' },
							{ name: 'TC05', value: 'TC05' },
							{ name: 'TC06', value: 'TC06' },
							{ name: 'TC07', value: 'TC07' },
							{ name: 'TC08', value: 'TC08' },
							{ name: 'TC09', value: 'TC09' },
							{ name: 'TC10', value: 'TC10' },
							{ name: 'TC11', value: 'TC11' },
							{ name: 'TC12', value: 'TC12' },
							{ name: 'TC13', value: 'TC13' },
							{ name: 'TC14', value: 'TC14' },
							{ name: 'TC15', value: 'TC15' },
							{ name: 'TC16', value: 'TC16' },
							{ name: 'TC17', value: 'TC17' },
							{ name: 'TC18', value: 'TC18' },
							{ name: 'TC19', value: 'TC19' },
							{ name: 'TC20', value: 'TC20' },
							{ name: 'TC21', value: 'TC21' },
							{ name: 'TC22', value: 'TC22' },
							{ name: 'TC23', value: 'TC23' },
							{ name: 'TC24', value: 'TC24' },
							{ name: 'TC25', value: 'TC25' },
						],
						default: 'TC01',
						description: 'Welfare fund type code',
					},
					{
						displayName: 'Rate',
						name: 'rate',
						type: 'string',
						default: '',
						description: 'Welfare fund rate',
					},
				],
			},
			{
				displayName: 'Withholding Tax',
				name: 'withholdingTax',
				type: 'collection',
				placeholder: 'Add Withholding Tax',
				default: {},
				description: 'Withholding tax details for e-invoicing',
				options: [
					{
						displayName: 'Payment Reason',
						name: 'paymentReason',
						type: 'string',
						default: '',
						description: 'Payment reason code',
					},
					{
						displayName: 'Rate',
						name: 'rate',
						type: 'string',
						default: '',
						description: 'Withholding tax rate',
					},
					{
						displayName: 'Reason',
						name: 'reason',
						type: 'options',
						options: [
							{ name: 'RF01', value: 'RF01' },
							{ name: 'RF02', value: 'RF02' },
							{ name: 'RF03', value: 'RF03' },
							{ name: 'RF04', value: 'RF04' },
							{ name: 'RF05', value: 'RF05' },
							{ name: 'RF06', value: 'RF06' },
							{ name: 'RF07', value: 'RF07' },
							{ name: 'RF08', value: 'RF08' },
							{ name: 'RF09', value: 'RF09' },
							{ name: 'RF10', value: 'RF10' },
							{ name: 'RF11', value: 'RF11' },
							{ name: 'RF12', value: 'RF12' },
							{ name: 'RF13', value: 'RF13' },
							{ name: 'RF14', value: 'RF14' },
							{ name: 'RF15', value: 'RF15' },
							{ name: 'RF16', value: 'RF16' },
							{ name: 'RF17', value: 'RF17' },
							{ name: 'RF18', value: 'RF18' },
							{ name: 'RF19', value: 'RF19' },
						],
						default: 'RF01',
						description: 'Withholding tax reason code',
					},
				],
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
				resource: ['clientsInvoices'],
				operation: [
					'showClientInvoice',
					'deleteClientInvoice',
					'finalizeClientInvoice',
					'cancelClientInvoice',
					'unmarkClientInvoiceAsPaid',
					'markClientInvoiceAsPaid',
					'sendClientInvoice',
				],
			},
		},
		default: '',
		required: true,
		description: 'The unique identifier of the invoice to show',
	},
	{
		displayName: 'Paid At',
		name: 'paidAt',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['clientsInvoices'],
				operation: ['markClientInvoiceAsPaid'],
			},
		},
		default: '',
		required: true,
		description: 'Payment date',
	},
	{
		displayName: 'Send To',
		name: 'sendTo',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['clientsInvoices'],
				operation: ['sendClientInvoice'],
			},
		},
		default: '',
		required: true,
		description: 'Comma-separated list of recipient emails',
	},
	{
		displayName: 'Email Title',
		name: 'emailTitle',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['clientsInvoices'],
				operation: ['sendClientInvoice'],
			},
		},
		default: '',
		description: 'Custom email title',
	},
	{
		displayName: 'Email Body',
		name: 'emailBody',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['clientsInvoices'],
				operation: ['sendClientInvoice'],
			},
		},
		default: '',
		description: 'Custom email body',
	},
	{
		displayName: 'Copy to Self',
		name: 'copyToSelf',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['clientsInvoices'],
				operation: ['sendClientInvoice'],
			},
		},
		default: true,
		description: 'Whether to copy the authenticated user',
	},
];
