import { test, expect, request } from '@playwright/test';

test('CRUD operations for licenses in Keygen API', async ({ request }) => {
    const account = 'bandaruaswini6'; 
    const token = 'admin-36f0b415edf3ba1d39698c0fb2416db4127f465c93a63bcd1e0111a9585f7cb1v3'; 
  //Create a License
  const createResponse = await request.post(
    `https://api.keygen.sh/v1/accounts/${account}/licenses`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        data: {
          type: 'licenses',
          "attributes": {
            "name": "Example License",},
          relationships: {

            policy: {
              data: { type: 'policies', id: 'c5fb1ab6-2718-4bd0-b001-7bf089549da2' }, 
            },
            owner: {
              data: { type: 'users', id: '8f57fb37-6976-41a0-bf87-a2503b3051a6' }, 
            },
            
          },
        },
      },
    }
  );
  expect(createResponse.status()).toBe(201); // 201 Created
  const createdLicense = await createResponse.json();
  const licenseId = createdLicense.data.id; 
  console.log('License Created:', createdLicense);
  // Retrieve the Created License
  const retrieveResponse = await request.get(
    `https://api.keygen.sh/v1/accounts/${account}/licenses/${licenseId}`,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(retrieveResponse.status()).toBe(200); // 200 OK
  const retrievedLicense = await retrieveResponse.json();
  console.log('License Retrieved:', retrievedLicense);
  //Update the License
  const updateResponse = await request.patch(
    `https://api.keygen.sh/v1/accounts/${account}/licenses/${licenseId}`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        data: {
          id: licenseId,
          type: 'licenses',
            attributes: {
                name: 'Updated Example License', 
            }
        },
      },
    }
  );
  expect(updateResponse.status()).toBe(200); // 200 OK
  const updatedLicense = await updateResponse.json();
  console.log('License Updated:', updatedLicense);
  //Delete the License
  const deleteResponse = await request.delete(
    `https://api.keygen.sh/v1/accounts/${account}/licenses/${licenseId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(deleteResponse.status()).toBe(204); // 204 No Content
  console.log('License Deleted Successfully');
   //List All Licenses
  const listResponse = await request.get(
    `https://api.keygen.sh/v1/accounts/${account}/licenses`,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(listResponse.status()).toBe(200); // 200 OK
  const licenseList = await listResponse.json();
  console.log('List of Licenses:', licenseList);
});
