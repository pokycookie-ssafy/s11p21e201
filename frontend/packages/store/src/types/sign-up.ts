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

interface ISignUpRequest {
  email: string
  password: string
  passwordConfirm: string
  phone: string
  businessName: string
  repName: string
  address: string
  registerNumber: string
  businessType: string
  openDate: string
}

export type { IBankResponse, ISignUpRequest, ISignUpResponse }
