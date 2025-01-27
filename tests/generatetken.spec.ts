import { test, expect, request } from '@playwright/test';
test('Generate API Token using Basic Authentication', async ({request}) =>{
  const email = 'bandaruaswini6@gmail.com';
  const password = 'Aswini@413';
  const account = 'bandaruaswini6';
  const credentials = Buffer.from(`${email}:${password}`).toString('base64');
  const response = await request.post(`https://api.keygen.sh/v1/accounts/${account}/tokens`, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Basic ${credentials}`,
    },
  
    data: {},
  });
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
if (responseBody.errors) {
    console.error('Error generating token:', responseBody.errors);
    expect(responseBody.errors).toBeNull();
  } else {
    console.log('Generated API Token:', responseBody.data);
    expect(responseBody.data).toHaveProperty('id');
    }
  const tokengenerate = await response.json();
 const token = tokengenerate.data.id; 
 console.log('tokengerated:', tokengenerate);
});

