import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/order-dto'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(200)
})

test('get order with correct id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(400)
})

test('post order with correct data should receive code 201', async ({ request }) => {
  const orderDto = OrderDto.createOrderWithCorrectRandomData()
  orderDto.customerName = "Sam"
  // prepare request body
  // const orderDto = new OrderDto("OPEN", 0, "Matt", "Morozov", "testing", 0)
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: orderDto
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.status).toBe("OEN")
  expect.soft(responseBody.customerName).toBe("Sam")
})

test('post order with incorrect data should receive code 400', async ({ request }) => {
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: OrderDto.createOrderWithInCorrectRandomData()
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
