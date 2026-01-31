// clientsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

export const clientsOperations: INodeProperties[] = [

	// ------------------------
	//      clients
	// ------------------------

		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'clients',
					],
				},
			},
			options: [
				{
					name: 'Get Clients Details',
					value: 'getclients',
					action: 'Get clients details',
				},
				{
					name: 'Get a List of Clients',
					value: 'getListClients',
					action: 'Get a list of client',
				},
				{
					name: 'Create a Client',
					value: 'createClient',
					action: 'Create a client',
				},
			],
			default: 'getclients',
		},
	// ------------------------
	//      clients - Get client's details
	// ------------------------
    {
        displayName: 'Client ID',
        name: 'clientId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'clients',
						],
						operation: [
							'getclients',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the client whose details are to be fetched',
    },
	// ------------------------
	//      clients - Get a list of clients
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
					'clients',
				],
				operation: [
					'getListClients',
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
					'clients',
				],
				operation: [
					'getListClients',
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
                    'clients',
                ],
                operation: [
                    'getListClients',
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
                    { name: 'Active', value: 'active' },
                    { name: 'Inactive', value: 'inactive' },
                ],
                default: 'all',
                description: 'Filter clients by their status',
            },
            {
                displayName: 'Start Date',
                name: 'start_date',
                type: 'dateTime',
                default: '',
                description: 'Fetch clients created after this date',
            },
            {
                displayName: 'End Date',
                name: 'end_date',
                type: 'dateTime',
                default: '',
                description: 'Fetch clients created before this date',
            },
        ],
    },

	// ------------------------
	//      clients - Create a client
	// ------------------------
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'clients',
						],
						operation: [
							'createClient',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization for which the client will be created',
    },
    {
        displayName: 'Client Name',
        name: 'clientName',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'clients',
						],
						operation: [
							'createClient',
						],
					},
				},
        default: '',
        required: true,
        description: 'The name of the client to be created',
    },
    {
        displayName: 'Email',
        name: 'email',
        type: 'string',
								placeholder: 'name@email.com',
				displayOptions: {
					show: {
						resource: [
							'clients',
						],
						operation: [
							'createClient',
						],
					},
				},
        default: '',
        required: true,
        description: 'The email address of the client',
    },
    {
        displayName: 'Phone Number',
        name: 'phoneNumber',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'clients',
						],
						operation: [
							'createClient',
						],
					},
				},
        default: '',
        description: 'The phone number of the client',
    },
    {
        displayName: 'Address',
        name: 'address',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'clients',
						],
						operation: [
							'createClient',
						],
					},
				},
        default: '',
        description: 'The address of the client',
    },
];
