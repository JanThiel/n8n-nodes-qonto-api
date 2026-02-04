import { INodeProperties } from 'n8n-workflow';

export const bankAccountsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['bankAccounts'],
			},
		},
		options: [
			{ name: 'Close Business Account', value: 'closeBankAccount', action: 'Close a business account' },
			{
				name: 'Create Business Account',
				value: 'createBankAccount',
				action: 'Create a business account',
			},
			{ name: 'Get Business Account', value: 'showBankAccount', action: 'Get a business account' },
			{
				name: 'List Business Accounts',
				value: 'listBankAccounts',
				action: 'List business accounts',
			},
			{ name: 'Update Business Account', value: 'updateBankAccount', action: 'Update a business account' },
		],
		default: 'listBankAccounts',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['bankAccounts'],
				operation: ['listBankAccounts'],
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
				resource: ['bankAccounts'],
				operation: ['listBankAccounts'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['bankAccounts'],
				operation: ['showBankAccount', 'updateBankAccount', 'closeBankAccount'],
			},
		},
	},
	{
		displayName: 'Account Name',
		name: 'accountName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['bankAccounts'],
				operation: ['createBankAccount', 'updateBankAccount'],
			},
		},
		description: 'Name of the business account',
	},
];
