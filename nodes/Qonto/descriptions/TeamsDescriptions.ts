// teamsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

export const teamsOperations: INodeProperties[] = [

// ------------------------
//      teams
// ------------------------

{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: [
'teams',
],
},
},
options: [
{
name: 'List Teams in an Organization',
value: 'listTeams',
action: 'List teams in an organization',
},
{
name: 'Create a New Team',
value: 'createTeam',
action: 'Create a new team',
},
],
default: 'listTeams',
},
// ------------------------
//      teams - List teams in an organization
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
'teams',
],
operation: [
'listTeams',
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
'teams',
],
operation: [
'listTeams',
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

// ------------------------
//      teams - Create a new team
// ------------------------

{
displayName: 'Team Name',
name: 'teamName',
type: 'string',
displayOptions: {
show: {
resource: [
'teams',
],
operation: [
'createTeam',
],
},
},
default: '',
required: true,
description: 'The name of the new team',
},
];
