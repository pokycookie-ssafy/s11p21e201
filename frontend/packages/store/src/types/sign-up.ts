interface ISignUpResponse {
  companyName: string
  repName: string
  address: string
  registerNumber: string
  type: string
  openDate: string
}

interface IBankResponse {
  bankCode: string
  bankName: string
}

export type { IBankResponse, ISignUpResponse }
