// insuranceContractsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';
export const insuranceContractsOperations: INodeProperties[] = [

// ------------------------
//      insuranceContracts
// ------------------------

{
displayName: 'Operation',
name: 'operation',
type: 'options',
noDataExpression: true,
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
},
},
options: [
{
name: 'Create a New Insurance Contract',
value: 'createInsuranceContract',
action: 'Create a new insurance contract',
},
{
name: 'Update an Insurance Contract',
value: 'updateInsuranceContract',
action: 'Update an insurance contract',
},
{
name: 'Get Insurance Contract',
value: 'getInsuranceContract',
action: 'Get insurance contract',
},
{
name: 'Upload a PDF Document for a Specific Insurance Contract',
value: 'uploadInsuranceDocument',
action: 'Upload a PDF document for a specific insurance contract',
},
{
name: 'Delete Uploaded Document',
value: 'deleteInsuranceDocument',
action: 'Delete uploaded document',
},
],
default: 'getInsuranceContract',
},
// ------------------------
//      insuranceContracts - Create a new insurance contract
// ------------------------
{
displayName: 'Name',
name: 'contractName',
type: 'string',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'createInsuranceContract',
],
},
},
default: '',
required: true,
description: 'The name of the insurance contract',
},
{
displayName: 'Contract ID',
name: 'contractId',
type: 'string',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'createInsuranceContract',
],
},
},
default: '',
required: true,
description: 'The external contract ID from the insurance provider',
},
{
displayName: 'Origin',
name: 'origin',
type: 'options',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'createInsuranceContract',
],
},
},
options: [
{ name: 'Insurance Hub', value: 'insurance_hub' },
{ name: 'External', value: 'external' },
],
default: 'insurance_hub',
required: true,
description: 'The origin of the insurance contract',
},
{
displayName: 'Provider Slug',
name: 'providerSlug',
type: 'string',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'createInsuranceContract',
],
},
},
default: '',
required: true,
description: 'The slug identifier of the insurance provider',
},
{
displayName: 'Type',
name: 'contractType',
type: 'string',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'createInsuranceContract',
],
},
},
default: '',
required: true,
description: 'The type of insurance contract',
},
{
displayName: 'Status',
name: 'status',
type: 'options',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'createInsuranceContract',
],
},
},
options: [
{ name: 'Active', value: 'active' },
{ name: 'Inactive', value: 'inactive' },
{ name: 'Pending', value: 'pending' },
],
default: 'active',
required: true,
description: 'The status of the insurance contract',
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
'insuranceContracts',
],
operation: [
'createInsuranceContract',
],
},
},
options: [
{
displayName: 'Troubleshooting URL',
name: 'troubleshootingUrl',
type: 'string',
default: '',
description: 'URL for troubleshooting the insurance',
},
{
displayName: 'Service URL',
name: 'serviceUrl',
type: 'string',
default: '',
description: 'URL for the insurance service',
},
{
displayName: 'Expiration Date',
name: 'expirationDate',
type: 'dateTime',
default: '',
description: 'The expiration date of the contract',
},
{
displayName: 'Start Date',
name: 'startDate',
type: 'dateTime',
default: '',
description: 'The start date of the contract',
},
{
displayName: 'Renewal Date',
name: 'renewalDate',
type: 'dateTime',
default: '',
description: 'The renewal date of the contract',
},
{
displayName: 'Payment Frequency',
name: 'paymentFrequency',
type: 'options',
options: [
{ name: 'Monthly', value: 'monthly' },
{ name: 'Quarterly', value: 'quarterly' },
{ name: 'Semester', value: 'semester' },
{ name: 'Yearly', value: 'yearly' },
],
default: 'monthly',
description: 'The payment frequency of the contract',
},
{
displayName: 'Price Value',
name: 'priceValue',
type: 'string',
default: '',
description: 'The price value of the contract',
},
{
displayName: 'Price Currency',
name: 'priceCurrency',
type: 'string',
default: 'EUR',
description: 'The currency of the price',
},
],
},

// ------------------------
//      insuranceContracts - Update an insurance contract
// ------------------------
{
displayName: 'Contract ID (To Update)',
name: 'contractIdToUpdate',
type: 'string',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'updateInsuranceContract',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the insurance contract to update',
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
'insuranceContracts',
],
operation: [
'updateInsuranceContract',
],
},
},
options: [
{
displayName: 'Name',
name: 'name',
type: 'string',
default: '',
description: 'The name of the insurance contract',
},
{
displayName: 'Contract ID',
name: 'contractId',
type: 'string',
default: '',
description: 'The external contract ID',
},
{
displayName: 'Origin',
name: 'origin',
type: 'options',
options: [
{ name: 'Insurance Hub', value: 'insurance_hub' },
{ name: 'External', value: 'external' },
],
default: 'insurance_hub',
description: 'The origin of the insurance contract',
},
{
displayName: 'Provider Slug',
name: 'providerSlug',
type: 'string',
default: '',
description: 'The slug identifier of the insurance provider',
},
{
displayName: 'Type',
name: 'type',
type: 'string',
default: '',
description: 'The type of insurance contract',
},
{
displayName: 'Status',
name: 'status',
type: 'options',
options: [
{ name: 'Active', value: 'active' },
{ name: 'Inactive', value: 'inactive' },
{ name: 'Pending', value: 'pending' },
],
default: 'active',
description: 'The status of the insurance contract',
},
{
displayName: 'Troubleshooting URL',
name: 'troubleshootingUrl',
type: 'string',
default: '',
description: 'URL for troubleshooting the insurance',
},
{
displayName: 'Service URL',
name: 'serviceUrl',
type: 'string',
default: '',
description: 'URL for the insurance service',
},
{
displayName: 'Expiration Date',
name: 'expirationDate',
type: 'dateTime',
default: '',
description: 'The expiration date of the contract',
},
{
displayName: 'Start Date',
name: 'startDate',
type: 'dateTime',
default: '',
description: 'The start date of the contract',
},
{
displayName: 'Renewal Date',
name: 'renewalDate',
type: 'dateTime',
default: '',
description: 'The renewal date of the contract',
},
{
displayName: 'Payment Frequency',
name: 'paymentFrequency',
type: 'options',
options: [
{ name: 'Monthly', value: 'monthly' },
{ name: 'Quarterly', value: 'quarterly' },
{ name: 'Semester', value: 'semester' },
{ name: 'Yearly', value: 'yearly' },
],
default: 'monthly',
description: 'The payment frequency of the contract',
},
{
displayName: 'Price Value',
name: 'priceValue',
type: 'string',
default: '',
description: 'The price value of the contract',
},
{
displayName: 'Price Currency',
name: 'priceCurrency',
type: 'string',
default: 'EUR',
description: 'The currency of the price',
},
],
},

// ------------------------
//      insuranceContracts - Get insurance contract
// ------------------------
{
displayName: 'Contract ID',
name: 'contractId',
type: 'string',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'getInsuranceContract',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the insurance contract to fetch',
},

// ------------------------
//      insuranceContracts - Upload a PDF document for a specific insurance contract
// ------------------------
{
displayName: 'Contract ID',
name: 'contractId',
type: 'string',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'uploadInsuranceDocument',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the insurance contract to upload the PDF for',
},
{
displayName: 'Binary Property',
name: 'binaryProperty',
type: 'string',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'uploadInsuranceDocument',
],
},
},
default: 'data',
required: true,
description: 'Name of the binary property containing the PDF file to upload',
},

// ------------------------
//      insuranceContracts - Delete uploaded document
// ------------------------
{
displayName: 'Contract ID',
name: 'contractId',
type: 'string',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'deleteInsuranceDocument',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the insurance contract',
},
{
displayName: 'Attachment ID',
name: 'attachmentId',
type: 'string',
displayOptions: {
show: {
resource: [
'insuranceContracts',
],
operation: [
'deleteInsuranceDocument',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the attachment to delete',
},
];
