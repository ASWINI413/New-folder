import { test, expect, request } from '@playwright/test';
test('CRUD operations for users in Keygen API', async ({ request }) => {
   const account = 'bandaruaswini6'; 
   const token = 'admin-36f0b415edf3ba1d39698c0fb2416db4127f465c93a63bcd1e0111a9585f7cb1v3'
  //Create a User
  const createResponse = await request.post(
    `https://api.keygen.sh/v1/accounts/${account}/users`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        data: {
          type: 'users',
          attributes: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'jdoe@keygen.sh',
            password: 'secret',
          },
        },
      },
    }
  );
  expect(createResponse.status()).toBe(201); // 201 Created
  const createdUser = await createResponse.json();
  const userId = createdUser.data.id; 
  console.log('User Created:', createdUser);
  //Retrieve the Created User
  const retrieveResponse = await request.get(
    `https://api.keygen.sh/v1/accounts/${account}/users/${userId}`,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(retrieveResponse.status()).toBe(200); // 200 OK
  const retrievedUser = await retrieveResponse.json();
  console.log('User Retrieved:', retrievedUser);
  //Update the User
  const updateResponse = await request.patch(
    `https://api.keygen.sh/v1/accounts/${account}/users/${userId}`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        data: {
          id: userId,
          type: 'users',
          attributes: {
            firstName: 'Updated John',
            lastName: 'Updated Doe',   
          },
        },
      },
    }
  );
  expect(updateResponse.status()).toBe(200); // 200 OK
  const updatedUser = await updateResponse.json();
  console.log('User Updated:', updatedUser);
  //Delete the User
  const deleteResponse = await request.delete(
    `https://api.keygen.sh/v1/accounts/${account}/users/${userId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(deleteResponse.status()).toBe(204); // 204 No Content
  console.log('User Deleted Successfully');
 //List All Users
  const listResponse = await request.get(
    `https://api.keygen.sh/v1/accounts/${account}/users`,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(listResponse.status()).toBe(200); // 200 OK
  const userList = await listResponse.json();
  console.log('List of Users:', userList);
})
