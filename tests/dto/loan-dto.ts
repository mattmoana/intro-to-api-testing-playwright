export class LoanDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static calcPositiveRiskScore(): LoanDto {
    return new LoanDto(104300, 77, 34, true, 25000, 22)
  }

  static calcNegativeRiskScore(): LoanDto {
    return new LoanDto(0, 100, 28, true, 900, 30)
  }
}
