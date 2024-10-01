interface IPaymentResponse {
  id: string
  employeeId: string
  employeeName: string
  price: number
  paidAt: Date
  departmentId: string
  departmentName: string
  storeId: string
  storeName: string
}

export type { IPaymentResponse }
