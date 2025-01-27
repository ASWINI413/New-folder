import {test, expect, request} from '@playwright/test';

test('negative cases', async ({ request }) => {
    const account = 'bandaruaswini6';
    const response = await request.post(`https://api.keygen.sh/v1/accounts/${account}/products`, {
      data: {
      }
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.errors).toBeDefined();

   //invalid user id
        const response1 = await request.get('https://api.keygen.sh/v1/users/admin-1e80e4d9159188b8c5944a61f5c36f168ff3451cabbfad6f0db8d1f1a522702dv3');
        expect(response1.status()).toBe(404);
      });
      //invalid mailid
    
test('Generate API Token using Basic Authentication', async ({request}) =>{
  const email = 'bandaruaswini@gmail.com';
  const password = 'Aswini@412';
  const account = 'bandaruaswini6';
  const credentials = Buffer.from(`${email}:${password}`).toString('base64');
  const response = await request.post(`https://api.keygen.sh/v1/accounts/${account}/tokens`, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Basic ${credentials}`,
    },
  
    data: {},
  });
  expect(response.status()).toBe(401);
  const responseBody = await response.json();

});
//missing required fields
test('should return 400 for missing required fields when generating a license', async ({ request }) => {
    const account = 'bandaruaswini6'; 
    const token = 'admin-36f0b415edf3ba1d39698c0fb2416db4127f465c93a63bcd1e0111a9585f7cb1v3'; 
  //Create a License
  const createResponse = await request.post(
    `https://api.keygen.sh/v1/accounts/${account}/licenses`,{
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${token}`,
          },
    
      data: {
        // Missing fields
      }
    });
    expect(createResponse.status()).toBe(400);
});
  
  






  
  