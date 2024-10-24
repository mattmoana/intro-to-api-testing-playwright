import { expect, test } from '@playwright/test'
import { LoanDto } from './dto/loan-dto'
import { StatusCodes } from 'http-status-codes'

test.describe('Loan Decision API Tests', () => {
  test('positive case should return 200 with medium risk', async ({ request }) => {
    const riskDto = LoanDto.calcPositiveRiskScore()
    riskDto.loanPeriod = 9
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: riskDto,
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  })

  test('positive case should return 200 with high risk', async ({ request }) => {
    const riskDto = LoanDto.calcPositiveRiskScore()
    riskDto.loanPeriod = 3
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: riskDto,
      },
    )
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskLevel).toBe('High Risk')
  })
  test('positive case returns 200 but decision is negative', async ({ request }) => {
    const riskDto = LoanDto.calcPositiveRiskScore()
    riskDto.income = 1000
    riskDto.loanPeriod = 36
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: riskDto,
      },
    )
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('negative')
  })

  test('negative case returns 400 where debt is negative', async ({ request }) => {
    const riskDto = LoanDto.calcNegativeRiskScore()
    riskDto.debt = -12
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: riskDto,
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })
})
