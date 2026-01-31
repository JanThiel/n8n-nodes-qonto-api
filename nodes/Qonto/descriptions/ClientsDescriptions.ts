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
{
name: 'Update a Client',
value: 'updateClient',
action: 'Update a client',
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
{
displayName: 'Sort By',
name: 'sort_by',
type: 'options',
options: [
{
name: 'Created At (Ascending)',
value: 'created_at:asc',
},
{
name: 'Created At (Descending)',
value: 'created_at:desc',
},
{
name: 'Name (Ascending)',
value: 'name:asc',
},
{
name: 'Name (Descending)',
value: 'name:desc',
},
],
default: 'name:asc',
description: 'Sort clients by their created_at or name property',
},
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
],
},

// ------------------------
//      clients - Create a client
// ------------------------
{
displayName: 'Client Kind',
name: 'kind',
type: 'options',
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
options: [
{
name: 'Company',
value: 'company',
},
{
name: 'Freelancer',
value: 'freelancer',
},
{
name: 'Individual',
value: 'individual',
},
],
default: 'company',
required: true,
description: 'The type of client (company, freelancer, or individual)',
},
{
displayName: 'Name',
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
description: 'The name of the client (company name or business name)',
},
{
displayName: 'First Name',
name: 'firstName',
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
description: 'The first name of the client (for freelancers or individuals)',
},
{
displayName: 'Last Name',
name: 'lastName',
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
description: 'The last name of the client (for freelancers or individuals)',
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
description: 'The email address of the client',
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
'clients',
],
operation: [
'createClient',
],
},
},
options: [
{
displayName: 'VAT Number',
name: 'vatNumber',
type: 'string',
default: '',
description: 'VAT number of the client',
},
{
displayName: 'Tax Identification Number',
name: 'taxIdentificationNumber',
type: 'string',
default: '',
description: 'Tax identification number of the client',
},
{
displayName: 'Currency',
name: 'currency',
type: 'string',
default: 'EUR',
description: 'Preferred currency for the client',
},
{
displayName: 'Locale',
name: 'locale',
type: 'string',
default: '',
description: 'Locale of the client (e.g., en, de, fr)',
},
{
displayName: 'Recipient Code',
name: 'recipientCode',
type: 'string',
default: '',
description: 'Recipient code for e-invoicing (Italy)',
},
{
displayName: 'E-Invoicing Address',
name: 'eInvoicingAddress',
type: 'string',
default: '',
description: 'E-invoicing address (PEC for Italy)',
},
{
displayName: 'Phone Country Code',
name: 'phoneCountryCode',
type: 'string',
default: '',
description: 'Phone country code (e.g., +49)',
},
{
displayName: 'Phone Number',
name: 'phoneNumber',
type: 'string',
default: '',
description: 'Phone number without country code',
},
{
displayName: 'Extra Emails',
name: 'extraEmails',
type: 'string',
default: '',
description: 'Additional email addresses (comma-separated)',
},
{
displayName: 'Billing Street Address',
name: 'billingStreetAddress',
type: 'string',
default: '',
description: 'Street address for billing',
},
{
displayName: 'Billing City',
name: 'billingCity',
type: 'string',
default: '',
description: 'City for billing address',
},
{
displayName: 'Billing Zip Code',
name: 'billingZipCode',
type: 'string',
default: '',
description: 'Zip code for billing address',
},
{
displayName: 'Billing Province Code',
name: 'billingProvinceCode',
type: 'string',
default: '',
description: 'Province code for billing address',
},
{
displayName: 'Billing Country Code',
name: 'billingCountryCode',
type: 'string',
default: '',
description: 'Country code for billing address (e.g., DE, FR, IT)',
},
],
},

// ------------------------
//      clients - Update a client
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
'updateClient',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the client to update',
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
'clients',
],
operation: [
'updateClient',
],
},
},
options: [
{
displayName: 'Name',
name: 'name',
type: 'string',
default: '',
description: 'The name of the client',
},
{
displayName: 'First Name',
name: 'firstName',
type: 'string',
default: '',
description: 'The first name of the client',
},
{
displayName: 'Last Name',
name: 'lastName',
type: 'string',
default: '',
description: 'The last name of the client',
},
{
displayName: 'Email',
name: 'email',
type: 'string',
placeholder: 'name@email.com',
default: '',
description: 'The email address of the client',
},
{
displayName: 'VAT Number',
name: 'vatNumber',
type: 'string',
default: '',
description: 'VAT number of the client',
},
{
displayName: 'Tax Identification Number',
name: 'taxIdentificationNumber',
type: 'string',
default: '',
description: 'Tax identification number of the client',
},
{
displayName: 'Currency',
name: 'currency',
type: 'string',
default: '',
description: 'Preferred currency for the client',
},
{
displayName: 'Locale',
name: 'locale',
type: 'string',
default: '',
description: 'Locale of the client',
},
{
displayName: 'Recipient Code',
name: 'recipientCode',
type: 'string',
default: '',
description: 'Recipient code for e-invoicing',
},
{
displayName: 'E-Invoicing Address',
name: 'eInvoicingAddress',
type: 'string',
default: '',
description: 'E-invoicing address (PEC for Italy)',
},
{
displayName: 'Phone Country Code',
name: 'phoneCountryCode',
type: 'string',
default: '',
description: 'Phone country code (e.g., +49)',
},
{
displayName: 'Phone Number',
name: 'phoneNumber',
type: 'string',
default: '',
description: 'Phone number without country code',
},
{
displayName: 'Billing Street Address',
name: 'billingStreetAddress',
type: 'string',
default: '',
description: 'Street address for billing',
},
{
displayName: 'Billing City',
name: 'billingCity',
type: 'string',
default: '',
description: 'City for billing address',
},
{
displayName: 'Billing Zip Code',
name: 'billingZipCode',
type: 'string',
default: '',
description: 'Zip code for billing address',
},
{
displayName: 'Billing Province Code',
name: 'billingProvinceCode',
type: 'string',
default: '',
description: 'Province code for billing address',
},
{
displayName: 'Billing Country Code',
name: 'billingCountryCode',
type: 'string',
default: '',
description: 'Country code for billing address',
},
],
},
];
