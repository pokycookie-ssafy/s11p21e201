import type { IPagination } from '@/types/pagination'

interface IPayment {
  employeeId: string
  employeeCode: string
  employeeName: string
  departmentId: string
  departmentName: string
  spentAmount: number
  supportAmount: number
  createdAt: Date
}

interface IPaymentDetail {
  id: string
  storeId: string
  storeName: string
  spentAmount: number
  paymentDate: Date
}

interface IPaymentEmployee {
  employeeId: string
  employeeCode: string
  employeeName: string
  departmentId: string
  departmentName: string
  payments: IPagination<IPaymentDetail[]>
}

export type { IPayment, IPaymentDetail, IPaymentEmployee }
