interface IPayment {
  employeeId: string
  employeeCode: string
  employeeName: string
  departmentId: string
  departmentName: string
  spentAmount: number
  supportAmount: number
}

interface IPaymentDetail {
  storeId: string
  storeName: string
  spentAmount: number
  createdAt: Date
}

interface IPaymentEmployee {
  employeeId: string
  employeeCode: string
  employeeName: string
  departmentId: string
  departmentName: string
  payments: IPaymentDetail[]
}

export type { IPayment, IPaymentDetail, IPaymentEmployee }
