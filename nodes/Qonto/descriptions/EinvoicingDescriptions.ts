import { INodeProperties } from 'n8n-workflow';

export const einvoicingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['einvoicing'],
			},
		},
		options: [
			{
				name: 'Get E-Invoicing Settings',
				value: 'getEinvoicingSettings',
				action: 'Get e invoicing settings',
			},
		],
		default: 'getEinvoicingSettings',
	},
];
