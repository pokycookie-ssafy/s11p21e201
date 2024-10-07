interface IQrRequestMenu {
  id: string
}

interface IQrRequest {
  employeeId: string
  qrId: string
  menus: IQrRequestMenu[]
  totalAmount: number
}

interface IQrResponse {
  employeeId: string
  qrId: string
}

export type { IQrRequest, IQrResponse, IQrRequestMenu }
