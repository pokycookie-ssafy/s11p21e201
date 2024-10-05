interface IQrRequest {
  employeeId: string
  qrId: string
  menus: string[]
  totalAmount: number
}

interface IQrResponse {
  employeeId: string
  qrId: string
}

export type { IQrRequest, IQrResponse }
