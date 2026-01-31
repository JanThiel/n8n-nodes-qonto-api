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
					value: 'getClientDetails',
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
			default: 'getClientDetails',
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
							'getClientDetails',
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
                displayName: 'Tax Identification Number',
                name: 'tax_identification_number',
                type: 'string',
                default: '',
                description: 'Filter clients by tax identification number (exact, case-insensitive match)',
            },
            {
                displayName: 'VAT Number',
                name: 'vat_number',
                type: 'string',
                default: '',
                description: 'Filter clients by VAT number (exact, case-insensitive match)',
            },
            {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                placeholder: 'name@email.com',
                default: '',
                description: 'Filter clients by email address (exact, case-insensitive match)',
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'Filter clients by name (exact and partial matches, case-insensitive). Must be at least 2 characters.',
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
