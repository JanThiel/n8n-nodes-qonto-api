# n8n-nodes-qonto

This is an n8n community node. It lets you use Qonto banking API in your n8n workflows.

Qonto is a business banking platform that provides banking services for SMEs and freelancers. This node allows you to automate operations with your Qonto account, including managing transactions, transfers, beneficiaries, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
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
