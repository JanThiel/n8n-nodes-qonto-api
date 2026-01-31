import {
INodeProperties,
} from 'n8n-workflow';

export const beneficiariesOperations: INodeProperties[] = [

// ------------------------
//      BENEFICIARIES
// ------------------------

{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: [
'beneficiaries',
],
},
},
options: [
{
name: 'List Beneficiaries',
value: 'listBeneficiaries',
action: 'List beneficiaries',
},
{
name: 'Show Beneficiary',
value: 'showBeneficiary',
action: 'Show beneficiary',
},
{
name: 'Add a SEPA Beneficiary',
value: 'createBeneficiary',
action: 'Add a SEPA beneficiary',
},
{
name: 'Update a SEPA Beneficiary',
value: 'updateBeneficiary',
action: 'Update a SEPA beneficiary',
},
{
name: 'Trust Beneficiaries',
value: 'trustBeneficiaries',
action: 'Trust beneficiaries',
},
{
name: 'Untrust Beneficiaries',
value: 'untrustBeneficiaries',
action: 'Untrust beneficiaries',
},
],
default: 'listBeneficiaries',
},

// ------------------------
//      BENEFICIARIES - List beneficiaries
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
'beneficiaries',
],
operation: [
'listBeneficiaries',
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
'beneficiaries',
],
operation: [
'listBeneficiaries',
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
'beneficiaries',
],
operation: [
'listBeneficiaries',
],
},
},
options: [
{
displayName: 'IBAN',
name: 'iban',
type: 'string',
placeholder: '',
default: '',
description: 'Filter beneficiaries by IBAN',
},
{
displayName: 'Sort By',
name: 'sort_by',
type: 'options',
options: [
{
name: 'Updated At (Ascending)',
value: 'updated_at:asc',
},
{
name: 'Updated At (Descending)',
value: 'updated_at:desc',
},
],
default: 'updated_at:desc',
description: 'Sort by updated_at in ascending or descending order',
},
{
displayName: 'Status',
name: 'status',
type: 'multiOptions',
options: [
{
name: 'Declined',
value: 'declined',
},
{
name: 'Pending',
value: 'pending',
},
{
name: 'Validated',
value: 'validated',
},
],
default: [],
description: 'Filter beneficiaries by status',
},
{
displayName: 'Trusted',
name: 'trusted',
type: 'boolean',
default: false,
description: 'Whether to filter beneficiaries by trusted status',
},
{
displayName: 'Updated At From',
name: 'updated_at_from',
type: 'dateTime',
placeholder: '2019-01-10T11:47:53.123Z',
default: '',
description: 'Filter by updated_at from',
},
{
displayName: 'Updated At To',
name: 'updated_at_to',
type: 'dateTime',
placeholder: '2019-01-10T11:47:53.123Z',
default: '',
description: 'Filter by updated_at to',
},
],
},

// ------------------------
//      BENEFICIARIES - Show beneficiary
// ------------------------
{
displayName: 'ID',
name: 'id',
type: 'string',
required: true,
displayOptions: {
show: {
resource: [
'beneficiaries',
],
operation: [
'showBeneficiary',
],
},
},
placeholder: 'ce91bc4e-68d6-4ab0-bfab-4a9403f7f316',
default: '',
description: 'Get a single beneficiary',
},

// ------------------------
//      BENEFICIARIES - Add a SEPA beneficiary
// ------------------------
{
displayName: 'Name',
name: 'beneficiaryName',
type: 'string',
required: true,
displayOptions: {
show: {
resource: [
'beneficiaries',
],
operation: [
'createBeneficiary',
],
},
},
default: '',
description: 'The name of the beneficiary',
},
{
displayName: 'IBAN',
name: 'iban',
type: 'string',
required: true,
displayOptions: {
show: {
resource: [
'beneficiaries',
],
operation: [
'createBeneficiary',
],
},
},
default: '',
description: 'The IBAN of the beneficiary',
},
{
displayName: 'Additional Options',
name: 'additionalOptions',
type: 'collection',
placeholder: 'Add Option',
default: {},
displayOptions: {
show: {
resource: [
'beneficiaries',
],
operation: [
'createBeneficiary',
],
},
},
options: [
{
displayName: 'BIC',
name: 'bic',
type: 'string',
default: '',
description: 'The BIC/SWIFT code of the beneficiary',
},
{
displayName: 'Email',
name: 'email',
type: 'string',
placeholder: 'name@email.com',
default: '',
description: 'The email of the beneficiary',
},
{
displayName: 'Activity Tag',
name: 'activityTag',
type: 'string',
default: '',
description: 'The activity tag of the beneficiary',
},
],
},

// ------------------------
//      BENEFICIARIES - Update a SEPA beneficiary
// ------------------------
{
displayName: 'ID',
name: 'id',
type: 'string',
required: true,
displayOptions: {
show: {
resource: [
'beneficiaries',
],
operation: [
'updateBeneficiary',
],
},
},
placeholder: 'ce91bc4e-68d6-4ab0-bfab-4a9403f7f316',
default: '',
description: 'The unique identifier of the beneficiary to update',
},
{
displayName: 'Update Fields',
name: 'updateFields',
type: 'collection',
placeholder: 'Add Field',
default: {},
displayOptions: {
show: {
resource: [
'beneficiaries',
],
operation: [
'updateBeneficiary',
],
},
},
options: [
{
displayName: 'Name',
name: 'name',
type: 'string',
default: '',
description: 'The name of the beneficiary',
},
{
displayName: 'Email',
name: 'email',
type: 'string',
placeholder: 'name@email.com',
default: '',
description: 'The email of the beneficiary',
},
{
displayName: 'Activity Tag',
name: 'activityTag',
type: 'string',
default: '',
description: 'The activity tag of the beneficiary',
},
],
},

// ------------------------
//      BENEFICIARIES - Trust beneficiaries
// ------------------------
{
displayName: 'IDs',
name: 'ids',
type: 'string',
required: true,
displayOptions: {
show: {
resource: [
'beneficiaries',
],
operation: [
'trustBeneficiaries',
],
},
},
placeholder: 'uuid1, uuid2, uuid3',
default: '',
description: 'Comma-separated list of beneficiary IDs to trust',
},

// ------------------------
//      BENEFICIARIES - Untrust beneficiaries
// ------------------------
{
displayName: 'IDs',
name: 'ids',
type: 'string',
required: true,
displayOptions: {
show: {
resource: [
'beneficiaries',
],
operation: [
'untrustBeneficiaries',
],
},
},
placeholder: 'uuid1, uuid2, uuid3',
default: '',
description: 'Comma-separated list of beneficiary IDs to untrust',
},
];
