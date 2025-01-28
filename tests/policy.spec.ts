import { test, expect, request } from '@playwright/test';
test('create, retrieve, update, delete and list policies in Keygen API', async ({ request }) => {
const account = 'bandaruaswini6';
const token = 'admin-36f0b415edf3ba1d39698c0fb2416db4127f465c93a63bcd1e0111a9585f7cb1v3'; 
const createResponse = await request.post(
    `https://api.keygen.sh/v1/accounts/${account}/policies`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        data: {
          type: 'policies',
          attributes: {
            name: 'Basic Policy',
            maxMachines: 1,
          },
          relationships: {
            product: {
              data: {
                type: 'product',
                id: '9788e630-3325-4e91-b7c0-a6e29dfc34cc', 
              },
            },
          },
        },
      },
    }
  );
  expect(createResponse.status()).toBe(201); // 201 Created
  const createdPolicy = await createResponse.json();
  const policyId = createdPolicy.data.id; 
  console.log('Policy Created:', createdPolicy);
  // 2. Retrieve the Created Policy
  const retrieveResponse = await request.get(
    `https://api.keygen.sh/v1/accounts/${account}/policies/${policyId}`,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(retrieveResponse.status()).toBe(200); // 200 OK
  const retrievedPolicy = await retrieveResponse.json();
  console.log('Policy Retrieved:', retrievedPolicy);
  // 3. Update the Policy
  const updateResponse = await request.patch(
    `https://api.keygen.sh/v1/accounts/${account}/policies/${policyId}`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        data: {
          id: policyId,
          type: 'policies',
          attributes: {
            name: 'Updated Basic Policy', 
          },
        },
      },
    }
  );
  expect(updateResponse.status()).toBe(200); // 200 OK
  const updatedPolicy = await updateResponse.json();
  console.log('Policy Updated:', updatedPolicy);
  // 4. Delete the Policy
  const deleteResponse = await request.delete(
    `https://api.keygen.sh/v1/accounts/${account}/policies/${policyId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(deleteResponse.status()).toBe(204); // 204 No Content
  console.log('Policy Deleted Successfully');
  // 5. List All Policies
const listResponse = await request.get(
    `https://api.keygen.sh/v1/accounts/${account}/policies`,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(listResponse.status()).toBe(200); // 200 OK
  const policyList = await listResponse.json();
  console.log('List of Policies:', policyList);
});
