# Qonto API Workflow Examples

This directory contains example n8n workflows demonstrating the capabilities of the Qonto API node.

## Available Workflows

### 1. All Operations Demonstration Workflow

**File:** `qonto-all-operations-workflow.json`

This comprehensive workflow demonstrates **all operations** available for **all resources** in the Qonto API node. It serves as a complete reference for developers and users who want to understand the full capabilities of the node.

#### Features

- **18 Resources Covered**: All available Qonto API resources
- **60+ Operations**: Every operation type including list, get, create, update, and specialized actions
- **Example Data**: All create operations are populated with realistic example data
- **Linked Operations**: Update operations are connected to their corresponding create operations, using the returned IDs

#### Resources and Operations Included

##### 1. **Organization** (1 operation)
- Get Organization and Its Bank Accounts

##### 2. **Transactions** (2 operations)
- List Transactions
- Retrieve a Transaction

##### 3. **Beneficiaries** (6 operations)
- List Beneficiaries
- Show Beneficiary
- Add a SEPA Beneficiary (Create) → Update a SEPA Beneficiary
- Trust Beneficiaries
- Untrust Beneficiaries

##### 4. **External Transfers** (4 operations)
- List External Transfers
- Show an External Transfer
- Create an External Transfer
- Create External Transfers with Creditor Data

##### 5. **Internal Transactions** (1 operation)
- Create Internal Transfer

##### 6. **Labels** (2 operations)
- List Labels
- Show Label

##### 7. **Memberships** (3 operations)
- List Memberships
- Get Details of a Single Membership
- Create and Invite a New Membership

##### 8. **Cards** (7 operations)
- List Cards
- Create a Card → Lock Card → Unlock Card
- Retrieve Card Data View URL
- Update Card Limits
- Update Card Options

##### 9. **Attachments** (2 operations)
- Upload Attachment
- Show Attachment

##### 10. **Attachments in a Transaction** (4 operations)
- List Attachments in a Transaction
- Upload Attachment to a Transaction
- Remove an Attachment From a Transaction
- Remove All Attachments From a Transaction

##### 11. **Requests** (3 operations)
- List Requests
- Approve a Request
- Decline a Request

##### 12. **Statements** (2 operations)
- List Statements
- Show Statement

##### 13. **Clients** (4 operations)
- Get a List of Clients
- Get Clients Details
- Create a Client → Update a Client

##### 14. **Client Invoices** (4 operations)
- List Client Invoices
- Show Client Invoice
- Create a Client Invoice → Update a Draft Client Invoice

##### 15. **Credit Notes** (2 operations)
- Get a List of Credit Notes
- Get Details of Credit Note

##### 16. **Supplier Invoices** (2 operations)
- Get a List of Supplier Invoices
- Create Supplier Invoices with Attachments

##### 17. **Teams** (2 operations)
- List Teams in an Organization
- Create a New Team

##### 18. **Insurance Contracts** (5 operations)
- Get Insurance Contract
- Create a New Insurance Contract → Update an Insurance Contract
- Upload a PDF Document for a Specific Insurance Contract
- Delete Uploaded Document

#### How to Use This Workflow

1. **Import into n8n**:
   - Open your n8n instance
   - Go to Workflows
   - Click "Import from File" or "Import from URL"
   - Select the `qonto-all-operations-workflow.json` file

2. **Configure Credentials**:
   - The workflow uses Qonto API credentials
   - You need to set up your Qonto API credentials in n8n:
     - Go to Settings > Credentials
     - Add new Qonto API or Qonto OAuth2 credentials
     - Enter your credentials (login/secret key or OAuth2 details)
     - Select the appropriate environment (Production or Sandbox)

3. **Update Example Data**:
   - The workflow contains placeholder UUIDs and example data
   - Replace these with actual IDs from your Qonto account:
     - `beneficiary-uuid-example` → actual beneficiary ID
     - `transaction-uuid-example` → actual transaction ID
     - `member-uuid-example` → actual member ID
     - `account-uuid-example` → actual bank account ID
     - etc.

4. **Test Individual Operations**:
   - You can execute nodes individually by clicking "Execute Node"
   - Or run the entire workflow using "Test workflow"
   - The workflow is organized so that:
     - List/Get operations can run independently
     - Create operations generate new resources
     - Update operations are connected to their Create nodes and use the returned IDs

5. **Understand the Flow**:
   - Most nodes are independent and can be executed separately
   - Some nodes are connected in chains:
     - **Beneficiary**: Create → Update
     - **Card**: Create → Lock → Unlock
     - **Client**: Create → Update
     - **Client Invoice**: Create → Update
     - **Insurance Contract**: Create → Update

#### Node Naming Convention

All nodes follow this naming pattern:
```
[Resource] - [Operation Name]
```

Examples:
- `Beneficiary - Add SEPA Beneficiary`
- `Card - Create a Card`
- `External Transfer - Create with Creditor Data`

This makes it easy to find specific operations in the workflow.

#### Example Data Highlights

The workflow includes realistic example data for all create operations:

- **Beneficiaries**: Full SEPA details with BIC, IBAN, and email
- **Cards**: Complete card configuration with limits and options
- **Clients**: Full company information including billing address and tax details
- **Client Invoices**: Multi-line invoices with items, VAT, and payment terms
- **External Transfers**: Transfer details with amounts, references, and IBANs
- **Insurance Contracts**: Complete contract information including dates and pricing
- **Memberships**: User invitation details with roles and team assignments
- **And more!**

#### Tips for Using the Workflow

1. **Start with Read Operations**: Test list and get operations first to understand your data
2. **Use Sandbox Environment**: If available, use Qonto's sandbox environment for testing
3. **Check API Limits**: Be aware of API rate limits when running multiple operations
4. **Customize for Your Use Case**: Use this workflow as a template and extract the nodes you need
5. **Add Error Handling**: In production, add error handling nodes and conditional logic
6. **Enable/Disable Nodes**: You can disable nodes you don't need to test specific operations

#### Notes

- **Credentials Required**: You must configure valid Qonto API credentials before running the workflow
- **Placeholder Data**: The workflow uses example UUIDs and data that need to be replaced with real values
- **API Permissions**: Ensure your API credentials have the necessary permissions for each operation
- **Rate Limiting**: The Qonto API may have rate limits; avoid running all operations simultaneously
- **Binary Data**: Some operations (attachments, documents) require binary data that isn't included in the workflow
- **Idempotency**: Transfer operations use idempotency keys to prevent duplicate transactions

#### Support and Issues

If you encounter issues with the workflow or the Qonto API node:

1. Check the [Qonto API documentation](https://api-doc.qonto.com/docs/business-api)
2. Review the node's README for configuration details
3. Open an issue on the [GitHub repository](https://github.com/JanThiel/n8n-nodes-qonto-api/issues)

---

## Contributing

Have suggestions for improving these examples or want to contribute additional workflows? Feel free to:

1. Fork the repository
2. Add your workflow example
3. Update this README
4. Submit a pull request

We welcome contributions that help the community use the Qonto API node more effectively!
