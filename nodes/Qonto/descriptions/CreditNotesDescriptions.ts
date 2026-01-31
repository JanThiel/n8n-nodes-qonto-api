// creditNotesDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "Get a list of credit notes for an organization" operation
	export const creditNotesOperations: INodeProperties[] = [

		// ------------------------
		//      creditNotes
		// ------------------------

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'creditNotes',
						],
					},
				},
				options: [
					{
						name: 'Get a List of Credit Notes for an Organization',
						value: 'getListCreditNotes',
						action: 'Get a list of credit notes for an organization',
					},
					{
						name: 'Get Details of Credit Note for an Organization',
						value: 'getDetailsCreditNotes',
						action: 'Get details of credit note for an organization',
					},

				],
				default: 'getListCreditNotes',
			},
		// ------------------------
		//      creditNotes - Get a list of credit notes for an organization
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
					'creditNotes',
				],
				operation: [
					'getListCreditNotes',
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
					'creditNotes',
				],
				operation: [
					'getListCreditNotes',
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
                    'creditNotes',
                ],
                operation: [
                    'getListCreditNotes',
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
                    { name: 'Pending', value: 'pending' },
                    { name: 'Used', value: 'used' },
                ],
                default: 'all',
                description: 'Filter credit notes by their status',
            },
            {
                displayName: 'Start Date',
                name: 'start_date',
                type: 'dateTime',
                default: '',
                description: 'Fetch credit notes created after this date',
            },
            {
                displayName: 'End Date',
                name: 'end_date',
                type: 'dateTime',
                default: '',
                description: 'Fetch credit notes created before this date',
            },
        ],
    },

		// ------------------------
		//      creditNotes - Get details of credit note for an organization
		// ------------------------

    {
        displayName: 'Credit Note ID',
        name: 'creditNoteId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'creditNotes',
						],
						operation: [
							'getDetailsCreditNotes',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the credit note',
    },
];
