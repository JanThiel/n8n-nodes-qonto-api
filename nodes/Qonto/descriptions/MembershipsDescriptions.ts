import { INodeProperties } from 'n8n-workflow';

export const membershipsOperations: INodeProperties[] = [
	// ------------------------
	//      MEMBERSHIPS
	// ------------------------
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['memberships'],
			},
		},
		options: [
			{
				name: 'List Memberships',
				value: 'listMemberships',
				action: 'List memberships',
			},
			{
				name: 'Get Details of a Single Membership',
				value: 'getMembership',
				action: 'Get details of a single membership',
			},
			{
				name: 'Create and Invite a New Membership',
				value: 'createMembership',
				action: 'Create and invite a new membership',
			},
		],
		default: 'getMembership',
	},

	// ------------------------
	//      MEMBERSHIPS - List memberships
	// ------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['memberships'],
				operation: ['listMemberships'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['memberships'],
				operation: ['listMemberships'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},

	// ------------------------
	//      MEMBERSHIPS - Create and invite a new membership
	// ------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		required: true,
		description: 'Email of the person being invited to join the organization',
		displayOptions: {
			show: {
				resource: ['memberships'],
				operation: ['createMembership'],
			},
		},
	},
	{
		displayName: 'First Name',
		name: 'first_name',
		type: 'string',
		default: '',
		required: true,
		description: 'First name of the person being invited to join the organization',
		displayOptions: {
			show: {
				resource: ['memberships'],
				operation: ['createMembership'],
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'last_name',
		type: 'string',
		default: '',
		required: true,
		description: 'Last name of the person being invited to join the organization',
		displayOptions: {
			show: {
				resource: ['memberships'],
				operation: ['createMembership'],
			},
		},
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		options: [
			{ name: 'Reporting', value: 'reporting' },
			{ name: 'Employee', value: 'employee' },
			{ name: 'Manager', value: 'manager' },
			{ name: 'Admin', value: 'admin' },
		],
		default: 'employee',
		required: true,
		description: 'Role of the person being invited to join the organization',
		displayOptions: {
			show: {
				resource: ['memberships'],
				operation: ['createMembership'],
			},
		},
	},
	{
		displayName: 'Team ID',
		name: 'team_id',
		type: 'string',
		default: '',
		description: 'Unique identifier of the team the new membership is being assigned',
		displayOptions: {
			show: {
				resource: ['memberships'],
				operation: ['createMembership'],
			},
		},
	},
];
