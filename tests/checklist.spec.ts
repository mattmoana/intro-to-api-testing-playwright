import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test.describe('PUT requests endpoint', () => {
  test('get 200 with valid PUT request', async ({ request }) => {
    const requestHeaders = {
      api_key: '1234567890123456',
    }
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
      headers: requestHeaders,
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('get 405 with incorrect order id in URL', async ({ request }) => {
    const requestHeaders = {
      api_key: '1234567890123456',
    }
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 1,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/', {
      headers: requestHeaders,
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED) // 405 corresponds to Method Not Allowed
  })

  test('get 400 with PUT request with empty status', async ({ request }) => {
    const requestHeaders = {
      api_key: '1234567890123456',
    }
    const requestBody = {
      status: '', // Empty status field
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 1,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
      headers: requestHeaders,
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST) // 400 corresponds to Bad Request
  })
})

test.describe('DELETE requests endpoint', () => {
  test('get 204 with correct DELETE request', async ({ request }) => {
    const requestHeaders = {
      api_key: '1234567890123456',
    }
    const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
      headers: requestHeaders,
    })
    expect(response.status()).toBe(204)
  })

  test('get 400 with incorrect ID in DELETE request', async ({ request }) => {
    const requestHeaders = {
      api_key: '1234567890123456',
    }
    const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/11', {
      headers: requestHeaders,
    })
    expect(response.status()).toBe(400)
  })

  test('get 405 with missing ID in DELETE request', async ({ request }) => {
    const requestHeaders = {
      api_key: '1234567890123456',
    }
    const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/', {
      headers: requestHeaders,
    })
    expect(response.status()).toBe(405)
  })
})

test.describe('GET requests endpoint', () => {
  test('get 200 with correct GET request', async ({ request }) => {
    const requestHeaders = {
      api_key: '1234567890123456',
    }
    const response = await request.get(
      'https://backend.tallinn-learning.ee/test-orders?username=22323&password=232323',
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(200)
  })

  test('get 500 with empty username in GET request', async ({ request }) => {
    const requestHeaders = {
      api_key: '1234567890123456',
    }
    const response = await request.get(
      'https://backend.tallinn-learning.ee/test-orders?username=&password=232323',
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(500)
  })

  test('get 500 with missing password in GET request', async ({ request }) => {
    const requestHeaders = {
      api_key: '1234567890123456',
    }
    const response = await request.get(
      'https://backend.tallinn-learning.ee/test-orders?username=22323&password=',
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(500)
  })
})
