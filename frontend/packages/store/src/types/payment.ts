interface IPaymentResponse {
  id: string
  paymentId: string
  menuName: string
  menuPrice: number
  companyId: string
  companyName: string
  employeeCode: string
  createdAt: Date
}

interface IPaymentMenu {
  name: string
  price: number
}

interface IPaymentGroup {
  id: string
  companyId: string
  companyName: string
  employeeCode: string
  menus: IPaymentMenu[]
  totalPrice: number
  createdAt: Date
}

export type { IPaymentMenu, IPaymentGroup, IPaymentResponse }
