# n8n-nodes-qonto

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **📦 Installation Note**
> 
> This repository contains the code for the **`n8n-nodes-qonto-api`** node. Use this name when installing the Community Node into n8n.
> 
> **Alternative Node:** [`n8n-nodes-qonto`](https://github.com/DtNeo/n8n-qonto-node)  
> This node was created to address several limitations found in the original `n8n-nodes-qonto` implementation. Key improvements include:
> - **Fixed Sandbox Environment Handling**: Proper support for Qonto's sandbox environment for testing
> - **Enhanced API Coverage**: More comprehensive support for Qonto API resources
> - **Better OAuth2 Support**: Improved authentication options with OAuth2
> 
> The broken sandbox handling of the original node was the main motivation for creating this improved version.

> **🤖 Development Notice**
> 
> This node was primarily developed using AI agents and subsequently manually reviewed and improved to ensure quality and reliability.
> 
> If you encounter any issues or have suggestions, please [open an issue](https://github.com/JanThiel/n8n-nodes-qonto/issues) and we'll get it fixed!

This is an n8n community node. It lets you use Qonto banking API in your n8n workflows.

Qonto is a business banking platform that provides banking services for SMEs and freelancers. This node allows you to automate operations with your Qonto account, including managing transactions, transfers, beneficiaries, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Example Use Cases](#example-use-cases)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following Qonto resources:

- **Organizations**: Get organization and bank accounts information
- **Transactions**: List and retrieve transactions
- **External Transfers**: Create and list external transfers
- **Beneficiaries**: Manage beneficiaries (list, show, create, trust/untrust)
- **Labels**: Manage transaction labels
- **Memberships**: Manage organization memberships
- **Attachments**: Upload and retrieve attachments
- **Attachments in a Transaction**: Manage attachments linked to transactions
- **Cards**: Manage cards (list, retrieve, create)
- **Requests**: Manage payment requests
- **Statements**: Retrieve account statements
- **Internal Transactions**: List internal transactions
- **Supplier Invoices**: Manage supplier invoices
- **Client Invoices**: Manage client invoices
- **Credit Notes**: Manage credit notes
- **Clients**: Manage clients
- **Teams**: Manage teams
- **Insurance Contracts**: Manage insurance contracts

## Example Use Cases

This section provides practical examples of how to use the Qonto node in real-world automation scenarios.

### 1. Sync Orders and Customers from Shopify to Qonto Clients and Client Invoices

Automatically synchronize your e-commerce operations with your business banking:

**Workflow Overview:**
1. **Trigger**: New order created in Shopify
2. **Process Customer**: 
   - Extract customer information from Shopify order
   - Check if client exists in Qonto using the Clients resource
   - Create new client in Qonto if not exists
3. **Create Invoice**:
   - Use the Client Invoices resource to create an invoice in Qonto
   - Map order items, amounts, and tax information
   - Link the invoice to the Qonto client
4. **Result**: Your Qonto account automatically reflects your Shopify sales with proper client records and invoices

**Benefits:**
- Eliminate manual data entry between systems
- Maintain accurate client records
- Ensure all sales are properly documented for accounting
- Streamline invoice management across platforms

### 2. Create Invoices in Qonto whenever a Task with Time Tracking in Asana Gets Completed

Transform completed project work into invoices automatically:

**Workflow Overview:**
1. **Trigger**: Task marked as completed in Asana
2. **Extract Time Data**:
   - Retrieve time tracking information from the completed task
   - Calculate billable hours and rates
   - Gather project and client details from task metadata
3. **Create Client Invoice**:
   - Use the Client Invoices resource to create an invoice
   - Include task description, hours worked, and calculated amount
   - Attach relevant project information
4. **Optional**: Send notification to client or accounting team

**Benefits:**
- Automate billing for time-tracked projects
- Reduce time between work completion and invoicing
- Ensure accurate billing based on actual time spent
- Improve cash flow with faster invoice generation

## Credentials

This node supports two authentication methods:

### Login and Secret Key (API Key)

1. Log in to your Qonto account
2. Go to Settings > API & Integrations
3. Generate an API key
4. Use the login (e.g., `scep-1111`) and secret key for authentication
5. Select your environment (Production or Sandbox)
6. For sandbox access, you may need to provide an X-Qonto-Staging-Token

### OAuth2

1. Create an OAuth2 application in your Qonto account
2. Configure the OAuth2 credentials in n8n with:
   - Client ID
   - Client Secret
   - Environment (Production or Sandbox)
   - Scopes required for your operations
3. For sandbox access with Machine-to-Machine, provide X-Qonto-Staging-Token

Refer to the [Qonto API documentation](https://api-doc.qonto.com/docs/business-api) for more information.

## Compatibility

Compatible with n8n@1.60.0 or later

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Qonto API documentation](https://api-doc.qonto.com/docs/business-api)
* [Qonto website](https://qonto.com)
