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
name: 'Create a Card',
value: 'createCard',
action: 'Create a card',
},
{
name: 'Retrieve Card Data View URL',
value: 'retrieveCard',
action: 'Retrieve card data view URL',
},
{
name: 'Update Card Limits',
value: 'updateCardLimits',
action: 'Update card limits',
},
{
name: 'Update Card Options',
value: 'updateCardOptions',
action: 'Update card options',
},
{
name: 'Lock Card',
value: 'lockCard',
action: 'Lock a card',
},
{
name: 'Unlock Card',
value: 'unlockCard',
action: 'Unlock a card',
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
displayName: 'Holder ID',
name: 'holder_id',
type: 'string',
default: '',
description: 'Filter cards by holder ID',
},
{
displayName: 'Status',
name: 'status',
type: 'multiOptions',
options: [
{ name: 'Active', value: 'active' },
{ name: 'Expired', value: 'expired' },
{ name: 'Frozen', value: 'frozen' },
{ name: 'Lost', value: 'lost' },
{ name: 'Pending', value: 'pending' },
{ name: 'Stolen', value: 'stolen' },
{ name: 'Terminated', value: 'terminated' },
],
default: [],
description: 'Filter cards by status',
},
],
},

// ------------------------
//      cards - Create a card
// ------------------------

{
displayName: 'Holder ID',
name: 'holderId',
type: 'string',
displayOptions: {
show: {
resource: [
'cards',
],
operation: [
'createCard',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the card holder (membership ID)',
},
{
displayName: 'Bank Account ID',
name: 'bankAccountId',
type: 'string',
displayOptions: {
show: {
resource: [
'cards',
],
operation: [
'createCard',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the bank account',
},
{
displayName: 'Card Level',
name: 'cardLevel',
type: 'options',
displayOptions: {
show: {
resource: [
'cards',
],
operation: [
'createCard',
],
},
},
options: [
{ name: 'Standard', value: 'standard' },
{ name: 'Plus', value: 'plus' },
{ name: 'Metal', value: 'metal' },
{ name: 'X', value: 'x' },
{ name: 'Virtual', value: 'virtual' },
{ name: 'Flash', value: 'flash' },
{ name: 'Advertising', value: 'advertising' },
],
default: 'virtual',
required: true,
description: 'The level/type of the card',
},
{
displayName: 'Payment Monthly Limit',
name: 'paymentMonthlyLimit',
type: 'number',
displayOptions: {
show: {
resource: [
'cards',
],
operation: [
'createCard',
],
},
},
default: 1000,
required: true,
description: 'Monthly payment limit in cents',
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
'cards',
],
operation: [
'createCard',
],
},
},
options: [
{
displayName: 'Organization ID',
name: 'organizationId',
type: 'string',
default: '',
description: 'The unique identifier of the organization',
},
{
displayName: 'Initiator ID',
name: 'initiatorId',
type: 'string',
default: '',
description: 'The unique identifier of the initiator',
},
{
displayName: 'ATM Option',
name: 'atmOption',
type: 'boolean',
default: true,
description: 'Whether ATM withdrawals are enabled',
},
{
displayName: 'ATM Monthly Limit',
name: 'atmMonthlyLimit',
type: 'number',
default: 0,
description: 'Monthly ATM withdrawal limit in cents',
},
{
displayName: 'ATM Daily Limit Option',
name: 'atmDailyLimitOption',
type: 'boolean',
default: false,
description: 'Whether daily ATM limit is enabled',
},
{
displayName: 'ATM Daily Limit',
name: 'atmDailyLimit',
type: 'number',
default: 0,
description: 'Daily ATM withdrawal limit in cents',
},
{
displayName: 'NFC Option',
name: 'nfcOption',
type: 'boolean',
default: true,
description: 'Whether contactless payments are enabled',
},
{
displayName: 'Online Option',
name: 'onlineOption',
type: 'boolean',
default: true,
description: 'Whether online payments are enabled',
},
{
displayName: 'Foreign Option',
name: 'foreignOption',
type: 'boolean',
default: true,
description: 'Whether foreign payments are enabled',
},
{
displayName: 'Payment Daily Limit Option',
name: 'paymentDailyLimitOption',
type: 'boolean',
default: false,
description: 'Whether daily payment limit is enabled',
},
{
displayName: 'Payment Daily Limit',
name: 'paymentDailyLimit',
type: 'number',
default: 0,
description: 'Daily payment limit in cents',
},
{
displayName: 'Payment Transaction Limit Option',
name: 'paymentTransactionLimitOption',
type: 'boolean',
default: false,
description: 'Whether transaction limit is enabled',
},
{
displayName: 'Payment Transaction Limit',
name: 'paymentTransactionLimit',
type: 'number',
default: 0,
description: 'Per-transaction limit in cents',
},
{
displayName: 'Ship to Business',
name: 'shipToBusiness',
type: 'boolean',
default: false,
description: 'Whether to ship physical card to business address',
},
{
displayName: 'Card Design',
name: 'cardDesign',
type: 'string',
default: '',
description: 'Card design identifier',
},
],
},

// ------------------------
//      cards - Retrieve card data view URL
// ------------------------

{
displayName: 'Card ID',
name: 'cardId',
type: 'string',
displayOptions: {
show: {
resource: [
'cards',
],
operation: [
'retrieveCard',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the card',
},

// ------------------------
//      cards - Update card limits
// ------------------------

{
displayName: 'Card ID',
name: 'cardId',
type: 'string',
displayOptions: {
show: {
resource: [
'cards',
],
operation: [
'updateCardLimits',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the card',
},
{
displayName: 'Update Fields',
name: 'updateLimits',
type: 'collection',
placeholder: 'Add Limit',
default: {},
displayOptions: {
show: {
resource: [
'cards',
],
operation: [
'updateCardLimits',
],
},
},
options: [
{
displayName: 'Payment Monthly Limit',
name: 'paymentMonthlyLimit',
type: 'number',
default: 0,
description: 'Monthly payment limit in cents',
},
{
displayName: 'ATM Monthly Limit',
name: 'atmMonthlyLimit',
type: 'number',
default: 0,
description: 'Monthly ATM limit in cents',
},
{
displayName: 'ATM Daily Limit Option',
name: 'atmDailyLimitOption',
type: 'boolean',
default: false,
description: 'Whether daily ATM limit is enabled',
},
{
displayName: 'ATM Daily Limit',
name: 'atmDailyLimit',
type: 'number',
default: 0,
description: 'Daily ATM limit in cents',
},
{
displayName: 'Payment Daily Limit Option',
name: 'paymentDailyLimitOption',
type: 'boolean',
default: false,
description: 'Whether daily payment limit is enabled',
},
{
displayName: 'Payment Daily Limit',
name: 'paymentDailyLimit',
type: 'number',
default: 0,
description: 'Daily payment limit in cents',
},
{
displayName: 'Payment Transaction Limit Option',
name: 'paymentTransactionLimitOption',
type: 'boolean',
default: false,
description: 'Whether transaction limit is enabled',
},
{
displayName: 'Payment Transaction Limit',
name: 'paymentTransactionLimit',
type: 'number',
default: 0,
description: 'Per-transaction limit in cents',
},
],
},

// ------------------------
//      cards - Update card options
// ------------------------

{
displayName: 'Card ID',
name: 'cardId',
type: 'string',
displayOptions: {
show: {
resource: [
'cards',
],
operation: [
'updateCardOptions',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the card',
},
{
displayName: 'Update Fields',
name: 'updateOptions',
type: 'collection',
placeholder: 'Add Option',
default: {},
displayOptions: {
show: {
resource: [
'cards',
],
operation: [
'updateCardOptions',
],
},
},
options: [
{
displayName: 'ATM Option',
name: 'atmOption',
type: 'boolean',
default: true,
description: 'Whether ATM withdrawals are enabled',
},
{
displayName: 'NFC Option',
name: 'nfcOption',
type: 'boolean',
default: true,
description: 'Whether contactless payments are enabled',
},
{
displayName: 'Online Option',
name: 'onlineOption',
type: 'boolean',
default: true,
description: 'Whether online payments are enabled',
},
{
displayName: 'Foreign Option',
name: 'foreignOption',
type: 'boolean',
default: true,
description: 'Whether foreign payments are enabled',
},
],
},

// ------------------------
//      cards - Lock card
// ------------------------

{
displayName: 'Card ID',
name: 'cardId',
type: 'string',
displayOptions: {
show: {
resource: [
'cards',
],
operation: [
'lockCard',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the card to lock',
},

// ------------------------
//      cards - Unlock card
// ------------------------

{
displayName: 'Card ID',
name: 'cardId',
type: 'string',
displayOptions: {
show: {
resource: [
'cards',
],
operation: [
'unlockCard',
],
},
},
default: '',
required: true,
description: 'The unique identifier of the card to unlock',
},
];
