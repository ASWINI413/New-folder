import { test, expect, request } from '@playwright/test';

test('Create, Retrieve, Update, Delete, and List Machines', async ({ request }) => {
    const account = 'bandaruaswini6'; 
    const token = 'admin-36f0b415edf3ba1d39698c0fb2416db4127f465c93a63bcd1e0111a9585f7cb1v3';
  //Create a Machine
  const createResponse = await request.post(
    `https://api.keygen.sh/v1/accounts/${account}/machines`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        data: {
          type: 'machines',
          attributes: {
            fingerprint: '4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC',
            platform: 'macOS',
            name: 'Office MacBook Pro',
          },
          relationships: {
            license: {
              data: {
                type: 'licenses',
                id: '5269e832-d969-49be-9bd4-12a736844ccd',
              },
            },
          },
        },
      },
    }
  );
  expect(createResponse.status()).toBe(201); 
  const createdMachine = await createResponse.json();
  console.log('Created Machine:', createdMachine);
  const machineId = createdMachine.data.id; 
  //Retrieve the Machine
  const retrieveResponse = await request.get(
    `https://api.keygen.sh/v1/accounts/${account}/machines/${machineId}`,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(retrieveResponse.status()).toBe(200); 
  const retrievedMachine = await retrieveResponse.json();
  console.log('Retrieved Machine:', retrievedMachine);
   // Update the Machine
  const updateResponse = await request.patch(
    `https://api.keygen.sh/v1/accounts/${account}/machines/${machineId}`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        data: {
          type: 'machines',
          attributes: {
            "platform": "macOS",
            "name": "Office MacBook Pro",
          },
        },
      },
    }
  );
  expect(updateResponse.status()).toBe(200); 
  const updatedMachine = await updateResponse.json();
  console.log('Updated Machine:', updatedMachine);
   // Delete the Machine
  const deleteResponse = await request.delete(
    `https://api.keygen.sh/v1/accounts/${account}/machines/${machineId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(deleteResponse.status()).toBe(204); // 204 No Content 
  console.log(`Machine with ID ${machineId} deleted successfully`);
  //List All Machines
  const listResponse = await request.get(
    `https://api.keygen.sh/v1/accounts/${account}/machines`,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(listResponse.status()).toBe(200); 
  const machinesList = await listResponse.json();
  console.log('List of Machines:', machinesList);
});
