import { expect, test } from '@playwright/test'
import { LoginDto } from './dto/login-dto'
import { StatusCodes } from 'http-status-codes'
const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'

test('incorrect user data to get 401', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithInCorrectCredentials()
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: loginDto,
  })
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('correct credential return 200 and auth token', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithCorrectCredentials()
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: loginDto,
  })
  expect.soft(response.status()).toBe(StatusCodes.OK)
  console.log(await response.text())
})
