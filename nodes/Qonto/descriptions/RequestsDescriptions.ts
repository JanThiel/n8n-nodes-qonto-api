import { INodeProperties } from 'n8n-workflow';

export const requestsOperations: INodeProperties[] = [
	// ------------------------
	//      REQUESTS
	// ------------------------
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['requests'],
			},
		},
		options: [
			{
				name: 'Approve a Request',
				value: 'approveARequest',
				action: 'Approve a request a requests',
			},
			{
				name: 'Create Flash Card Request',
				value: 'createFlashCardRequest',
				action: 'Create a flash card request',
			},
			{
				name: 'Create Multi Transfer Request',
				value: 'createMultiTransferRequest',
				action: 'Create a multi transfer request',
			},
			{
				name: 'Create Virtual Card Request',
				value: 'createVirtualCardRequest',
				action: 'Create a virtual card request',
			},
			{
				name: 'Decline a Request',
				value: 'declineARequest',
				action: 'Decline a request a requests',
			},
			{
				name: 'List Requests',
				value: 'listRequests',
				action: 'List requests a requests',
			},
		],
		default: 'listRequests',
	},

	// ------------------------
	//      REQUESTS - List requests
	// ------------------------
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['listRequests'],
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
				resource: ['requests'],
				operation: ['listRequests'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				placeholder: 'settled',
				default: '',
				description:
					'Allowed values: pending, approved, canceled, declined (no combinaison possible yet)',
			},
			{
				displayName: 'Request_type',
				name: 'request_type',
				type: 'options',
				description: 'Request_type can take 4 different values:',
				options: [
					{
						name: 'Flash_card',
						value: 'flash_card',
						description:
							'Flash_card: a flash card is a non-physical card with a budget and a last day of validity. The card becomes inactive after the budget is totally spent or the last date of validity is past.',
					},
					{
						name: 'Virtual_card',
						value: 'virtual_card',
						description:
							'Virtual_card: a virtual card is a non-physical card with a monthly budget. Card holder can spend that amount every calendar month. Above that, transactions will be refused.',
					},
					{
						name: 'Transfer',
						value: 'transfer',
						description: 'Transfer: a transfer of money from one Qonto account to another account',
					},
					{
						name: 'Multi_transfer',
						value: 'multi_transfer',
						description:
							'Multi_transfer: several transfers executed at the same time. A document can be provided to create a multi-transfer which is composed of many different transfers.',
					},
				],
				default: 'flash_card',
			},
			{
				displayName: 'Processed_at_from',
				name: 'processed_at_from',
				type: 'dateTime',
				placeholder: '2019-01-10T11:47:53.123Z',
				default: '',
			},
			{
				displayName: 'Created_at_from',
				name: 'created_at_from',
				type: 'dateTime',
				placeholder: '2019-01-10T11:47:53.123Z',
				default: '',
			},
		],
	},

	// ------------------------
	//      REQUESTS - Create flash card request
	// ------------------------
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['createFlashCardRequest'],
			},
		},
		description: 'Optional note attached to the request',
	},
	{
		displayName: 'Payment Lifespan Limit',
		name: 'payment_lifespan_limit',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['createFlashCardRequest'],
			},
		},
		description: 'Total limit amount in cents',
	},
	{
		displayName: 'Pre Expires At',
		name: 'pre_expires_at',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['createFlashCardRequest'],
			},
		},
		description: 'Expiration datetime of the requested card',
	},

	// ------------------------
	//      REQUESTS - Create virtual card request
	// ------------------------
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['createVirtualCardRequest'],
			},
		},
		description: 'Optional note attached to the request',
	},
	{
		displayName: 'Payment Monthly Limit',
		name: 'payment_monthly_limit',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['createVirtualCardRequest'],
			},
		},
		description: 'Monthly limit amount in cents',
	},

	// ------------------------
	//      REQUESTS - Create multi transfer request
	// ------------------------
	{
		displayName: 'Debit IBAN',
		name: 'debit_iban',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['createMultiTransferRequest'],
			},
		},
		default: '',
		description: 'IBAN of the account to debit',
	},
	{
		displayName: 'Scheduled Date',
		name: 'scheduled_date',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['createMultiTransferRequest'],
			},
		},
		default: '',
		description: 'Execution date for the transfer batch',
	},
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['createMultiTransferRequest'],
			},
		},
		description: 'Optional note attached to the request',
	},
	{
		displayName: 'Transfers (JSON)',
		name: 'transfers',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['createMultiTransferRequest'],
			},
		},
		default: '[]',
		description: 'Array of transfer objects',
	},

	// ------------------------
	//      REQUESTS - Approve a request
	// ------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['approveARequest'],
			},
		},
		placeholder: 'UUID of the request to be processed.',
		default: '',
		description: 'This endpoint allows you to approve a pending request',
	},
	{
		displayName: 'Request_type',
		name: 'request_type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['approveARequest'],
			},
		},
		options: [
			{
				name: 'Flash_cards',
				value: 'flash_cards',
				description:
					'A flash card is a non-physical card with a budget and a last day of validity. The card becomes inactive after the budget is totally spent or the last date of validity is past.',
			},
			{
				name: 'Virtual_cards',
				value: 'virtual_cards',
				description:
					'A virtual card is a non-physical card with a monthly budget. Card holder can spend that amount every calendar month. Above that, transactions will be refused.',
			},
			{
				name: 'Transfers',
				value: 'transfers',
				description: 'A transfer of money from one Qonto account to another account',
			},
			{
				name: 'Multi_transfers',
				value: 'multi_transfers',
				description:
					'Several transfers executed at the same time. A document can be provided to create a multi-transfer which is composed of many different transfers.',
			},
		],
		default: 'transfers',
	},
	{
		displayName: 'Debit IBAN',
		name: 'debit_iban',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['approveARequest'],
			},
		},
		default: '',
		description: 'IBAN of account to debit',
	},

	// ------------------------
	//      REQUESTS - Decline a request
	// ------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['declineARequest'],
			},
		},
		placeholder: 'UUID of the request to be processed.',
		default: '',
		description: 'This endpoint allows you to approve a pending request',
	},
	{
		displayName: 'Request_type',
		name: 'request_type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['declineARequest'],
			},
		},
		options: [
			{
				name: 'Flash_cards',
				value: 'flash_cards',
				description:
					'A flash card is a non-physical card with a budget and a last day of validity. The card becomes inactive after the budget is totally spent or the last date of validity is past.',
			},
			{
				name: 'Virtual_cards',
				value: 'virtual_cards',
				description:
					'A virtual card is a non-physical card with a monthly budget. Card holder can spend that amount every calendar month. Above that, transactions will be refused.',
			},
			{
				name: 'Transfers',
				value: 'transfers',
				description: 'A transfer of money from one Qonto account to another account',
			},
			{
				name: 'Multi_transfers',
				value: 'multi_transfers',
				description:
					'Several transfers executed at the same time. A document can be provided to create a multi-transfer which is composed of many different transfers.',
			},
		],
		default: 'transfers',
	},
	{
		displayName: 'Declined Note',
		name: 'declined_note',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['requests'],
				operation: ['declineARequest'],
			},
		},
		default: '',
	},
];
