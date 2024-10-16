interface IPaymentMenu {
  name: string
  price: number
}

interface IPaymentResponse {
  paymentId: string
  companyId: string
  companyName: string
  employeeId: string
  employeeCode: string
  menus: IPaymentMenu[]
  createdAt: Date
}

/**
 * @deprecated
 */
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
