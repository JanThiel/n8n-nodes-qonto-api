import { INodeProperties } from 'n8n-workflow';

export const sepaTransfersOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sepaTransfers'],
			},
		},
		options: [
			{
				name: 'Bulk Verify SEPA Payee',
				value: 'bulkVerifySepaPayee',
				action: 'Bulk verify SEPA payees',
			},
			{
				name: 'Cancel SEPA Recurring Transfer',
				value: 'cancelSepaRecurringTransfer',
				action: 'Cancel a SEPA recurring transfer',
			},
			{ name: 'Cancel SEPA Transfer', value: 'cancelSepaTransfer', action: 'Cancel a SEPA transfer' },
			{
				name: 'Create SEPA Bulk Transfer',
				value: 'createSepaBulkTransfer',
				action: 'Create a SEPA bulk transfer',
			},
			{
				name: 'Create SEPA Recurring Transfer',
				value: 'createSepaRecurringTransfer',
				action: 'Create a SEPA recurring transfer',
			},
			{ name: 'Create SEPA Transfer', value: 'createSepaTransfer', action: 'Create a SEPA transfer' },
			{
				name: 'Download SEPA Transfer Proof',
				value: 'downloadSepaTransferProof',
				action: 'Download proof of a SEPA transfer',
			},
			{
				name: 'Get SEPA Bulk Transfer',
				value: 'showSepaBulkTransfer',
				action: 'Get a SEPA bulk transfer',
			},
			{
				name: 'Get SEPA Recurring Transfer',
				value: 'showSepaRecurringTransfer',
				action: 'Get a SEPA recurring transfer',
			},
			{ name: 'Get SEPA Transfer', value: 'showSepaTransfer', action: 'Get a SEPA transfer' },
			{
				name: 'List SEPA Bulk Transfers',
				value: 'listSepaBulkTransfers',
				action: 'List SEPA bulk transfers',
			},
			{
				name: 'List SEPA Recurring Transfers',
				value: 'listSepaRecurringTransfers',
				action: 'List SEPA recurring transfers',
			},
			{ name: 'List SEPA Transfers', value: 'listSepaTransfers', action: 'List SEPA transfers' },
			{
				name: 'Skip SEPA Payee Verification',
				value: 'skipVerifySepaPayee',
				action: 'Skip SEPA payee verification',
			},
			{ name: 'Verify SEPA Payee', value: 'verifySepaPayee', action: 'Verify a SEPA payee' },
		],
		default: 'listSepaTransfers',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['sepaTransfers'],
				operation: ['listSepaTransfers', 'listSepaBulkTransfers', 'listSepaRecurringTransfers'],
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
				resource: ['sepaTransfers'],
				operation: ['listSepaTransfers', 'listSepaBulkTransfers', 'listSepaRecurringTransfers'],
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
				resource: ['sepaTransfers'],
				operation: ['listSepaTransfers', 'listSepaBulkTransfers', 'listSepaRecurringTransfers'],
			},
		},
		description: 'Optional query object',
	},
	{
		displayName: 'Transfer ID',
		name: 'transferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['sepaTransfers'],
				operation: ['showSepaTransfer', 'cancelSepaTransfer', 'downloadSepaTransferProof'],
			},
		},
	},
	{
		displayName: 'Bulk Transfer ID',
		name: 'bulkTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['sepaTransfers'],
				operation: ['showSepaBulkTransfer'],
			},
		},
	},
	{
		displayName: 'Recurring Transfer ID',
		name: 'recurringTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['sepaTransfers'],
				operation: ['showSepaRecurringTransfer', 'cancelSepaRecurringTransfer'],
			},
		},
	},
	{
		displayName: 'SEPA Transfer Payload (JSON)',
		name: 'transferPayload',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['sepaTransfers'],
				operation: ['createSepaTransfer'],
			},
		},
	},
	{
		displayName: 'SEPA Bulk Transfer Payload (JSON)',
		name: 'bulkTransferPayload',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['sepaTransfers'],
				operation: ['createSepaBulkTransfer'],
			},
		},
	},
	{
		displayName: 'SEPA Recurring Transfer Payload (JSON)',
		name: 'recurringTransferPayload',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['sepaTransfers'],
				operation: ['createSepaRecurringTransfer'],
			},
		},
	},
	{
		displayName: 'Verify Payee Payload (JSON)',
		name: 'verifyPayeePayload',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['sepaTransfers'],
				operation: ['verifySepaPayee'],
			},
		},
	},
	{
		displayName: 'Bulk Verify Payee Payload (JSON)',
		name: 'bulkVerifyPayeePayload',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['sepaTransfers'],
				operation: ['bulkVerifySepaPayee'],
			},
		},
	},
	{
		displayName: 'Skip Verify Payee Payload (JSON)',
		name: 'skipVerifyPayeePayload',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['sepaTransfers'],
				operation: ['skipVerifySepaPayee'],
			},
		},
	},
];
