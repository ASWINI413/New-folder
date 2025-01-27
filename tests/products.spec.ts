import { test, expect, request } from '@playwright/test';

test('Create, Retrieve, Update, Delete, and List Products', async ({ request }) => {
  const account = 'bandaruaswini6'; 
  const token = 'admin-e1fe31bfe9ee34539c37821722583bcc1741cb463b68ad5272d5e47d8ee5a8d8v3';
// Create a Product
  const createResponse = await request.post(
    `https://api.keygen.sh/v1/accounts/${account}/products`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        data: {
          type: 'products',
          attributes: {
            name: 'Example Product',
            code: 'example',
            distributionStrategy: 'OPEN',
            url: 'https://example.com',
            platforms: ['iOS', 'Android'],
          },
        },
      },
    }
  );
  expect(createResponse.status()).toBe(201); 
  const createdProduct = await createResponse.json();
  console.log('Created Product:', createdProduct);
  const productId = createdProduct.data.id; 
  // Retrieve the Product
  const retrieveResponse = await request.get(
    `https://api.keygen.sh/v1/accounts/${account}/products/${productId}`,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  expect(retrieveResponse.status()).toBe(200); 
  const retrievedProduct = await retrieveResponse.json();
  console.log('Retrieved Product:', retrievedProduct);
  // Update the Product
  const updateResponse = await request.patch(
    `https://api.keygen.sh/v1/accounts/${account}/products/${productId}`,
    {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        data: {
          type: 'products',
          attributes: {
            name: 'Updated Example Product',
            code: 'updated-example',
            distributionStrategy: 'LICENSED',
            url: 'https://updated-example.com',
            platforms: ['Android'],
          },
        },
      },
    }
  );
  expect(updateResponse.status()).toBe(200); 
  const updatedProduct = await updateResponse.json();
  console.log('Updated Product:', updatedProduct);
  //Delete the Product
  const deleteResponse = await request.delete(
    `https://api.keygen.sh/v1/accounts/${account}/products/${productId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
 expect(deleteResponse.status()).toBe(204); 
  console.log(`Product with ID ${productId} deleted successfully`);
   // List All Products
  const listResponse = await request.get(
    `https://api.keygen.sh/v1/accounts/${account}/products`,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
expect(listResponse.status()).toBe(200); 
  const productsList = await listResponse.json();
  console.log('List of Products:', productsList);

});
