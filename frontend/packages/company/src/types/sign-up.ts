interface ISignUpInfoRequest {
  phone: string
  businessName: string
  repName: string
  address: string
  registerNumber: string
  businessType: string
  openDate: string
}

interface ISignUpInfoResponse {
  id: string
}

interface ISignUpRequest {
  companyInfoId: string
  email: string
  password: string
}

interface ISignUpResponse {
  code: string
  message: string
}

export type { ISignUpRequest, ISignUpResponse, ISignUpInfoRequest, ISignUpInfoResponse }
