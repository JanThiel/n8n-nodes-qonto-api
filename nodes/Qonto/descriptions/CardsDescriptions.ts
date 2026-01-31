// cardsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

export const cardsOperations: INodeProperties[] = [

	// ------------------------
	//      cards
	// ------------------------

		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'cards',
					],
				},
			},
			options: [
				{
					name: 'List Cards',
					value: 'listCards',
					action: 'List cards',
				},
				{
					name: 'Create a New Virtual (Virtual, Flash, Advertising) Card',
					value: 'createNew',
					action: 'Create a new virtual virtual flash advertising card',
				},
				{
					name: 'Retrieve Card Data View URL',
					value: 'retrieveCard',
					action: 'Retrieve card data view URL',
				},
			],
			default: 'listCards',
		},

	// ------------------------
	//      cards - List cards
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
					'cards',
				],
				operation: [
					'listCards',
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
					'cards',
				],
				operation: [
					'listCards',
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
                    'cards',
                ],
                operation: [
                    'listCards',
                ],
            },
        },
        options: [
            {
                displayName: 'Organization ID',
                name: 'organizationId',
                type: 'string',
                default: '',
                description: 'The unique identifier of the organization whose cards are to be listed',
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'All', value: 'all' },
                    { name: 'Active', value: 'active' },
                    { name: 'Inactive', value: 'inactive' },
                ],
                default: 'all',
                description: 'Filter cards by their status',
            },
        ],
    },

  // ------------------------
	//      cards - Create a new Virtual (virtual, flash, advertising) card
	// ------------------------

    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'cards',
						],
						operation: [
							'createNew',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization for which the virtual card will be created',
    },
    {
        displayName: 'Card Type',
        name: 'cardType',
        type: 'options',
				displayOptions: {
					show: {
						resource: [
							'cards',
						],
						operation: [
							'createNew',
						],
					},
				},
        options: [
            { name: 'Virtual', value: 'virtual' },
            { name: 'Flash', value: 'flash' },
            { name: 'Advertising', value: 'advertising' },
        ],
        default: 'virtual',
        required: true,
        description: 'The type of virtual card to create',
    },
    {
        displayName: 'Card Name',
        name: 'cardName',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'cards',
						],
						operation: [
							'createNew',
						],
					},
				},
        default: '',
        required: true,
        description: 'The name of the virtual card',
    },
    {
        displayName: 'Spending Limit',
        name: 'spendingLimit',
        type: 'number',
				displayOptions: {
					show: {
						resource: [
							'cards',
						],
						operation: [
							'createNew',
						],
					},
				},
        default: '',
        description: 'The spending limit for the virtual card',
    },
    {
        displayName: 'Currency',
        name: 'currency',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'cards',
						],
						operation: [
							'createNew',
						],
					},
				},
        default: 'EUR',
        required: true,
        description: 'The currency of the virtual card',
    },

  // ------------------------
	//      cards - Retrieve card data view URL
	// ------------------------

];
