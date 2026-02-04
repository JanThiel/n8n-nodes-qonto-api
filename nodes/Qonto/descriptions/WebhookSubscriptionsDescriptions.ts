import { INodeProperties } from 'n8n-workflow';

export const webhookSubscriptionsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhookSubscriptions'],
			},
		},
		options: [
			{
				name: 'Create Webhook Subscription',
				value: 'createWebhookSubscription',
				action: 'Create a webhook subscription',
			},
			{
				name: 'Delete Webhook Subscription',
				value: 'deleteWebhookSubscription',
				action: 'Delete a webhook subscription',
			},
			{
				name: 'Get Webhook Subscription',
				value: 'showWebhookSubscription',
				action: 'Get a webhook subscription',
			},
			{
				name: 'List Webhook Subscriptions',
				value: 'listWebhookSubscriptions',
				action: 'List webhook subscriptions',
			},
			{ name: 'Update Webhook Subscription', value: 'updateWebhookSubscription', action: 'Update a webhook subscription' },
		],
		default: 'listWebhookSubscriptions',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['webhookSubscriptions'],
				operation: ['listWebhookSubscriptions'],
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
				resource: ['webhookSubscriptions'],
				operation: ['listWebhookSubscriptions'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['webhookSubscriptions'],
				operation: [
					'showWebhookSubscription',
					'updateWebhookSubscription',
					'deleteWebhookSubscription',
				],
			},
		},
	},
	{
		displayName: 'Payload (JSON)',
		name: 'payload',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['webhookSubscriptions'],
				operation: ['createWebhookSubscription', 'updateWebhookSubscription'],
			},
		},
		description: 'Webhook subscription payload as JSON',
	},
];
