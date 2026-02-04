// creditNotesDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "Get a list of credit notes" operation
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
				resource: ['creditNotes'],
			},
		},
		options: [
			{
				name: 'Get a List of Credit Notes',
				value: 'getListCreditNotes',
				action: 'Get a list of credit notes',
			},
			{
				name: 'Get Details of Credit Note',
				value: 'getDetailsCreditNotes',
				action: 'Get details of credit note',
			},
		],
		default: 'getListCreditNotes',
	},
	// ------------------------
	//      creditNotes - Get a list of credit notes
	// ------------------------

	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['creditNotes'],
				operation: ['getListCreditNotes'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['creditNotes'],
				operation: ['getListCreditNotes'],
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
				resource: ['creditNotes'],
				operation: ['getListCreditNotes'],
			},
		},
		options: [
			{
				displayName: 'Created At From',
				name: 'created_at_from',
				type: 'dateTime',
				default: '',
				description: 'Fetch credit notes created after this date',
			},
			{
				displayName: 'Created At To',
				name: 'created_at_to',
				type: 'dateTime',
				default: '',
				description: 'Fetch credit notes created before this date',
			},
		],
	},

	// ------------------------
	//      creditNotes - Get details of credit note
	// ------------------------

	{
		displayName: 'Credit Note ID',
		name: 'creditNoteId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['creditNotes'],
				operation: ['getDetailsCreditNotes'],
			},
		},
		default: '',
		required: true,
		description: 'The unique identifier of the credit note',
	},
];
