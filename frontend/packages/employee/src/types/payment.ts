interface IQrPayment {
  employeeId: string
  qrId: string
}

interface IQrUuid {
  validationId: string
}

interface IPaymentMenu {
  id: string
  name: string
  price: number
  category: string
}

interface IPayment {
  id: string
  storeId: string
  storeName: string
  menus: IPaymentMenu[]
  amount: number
  paymentDate: Date
}

export type { IQrUuid, IPayment, IQrPayment }
