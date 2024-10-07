interface ISettlement {
  id: string
  storeId: string
  storeName: string
  companyId: string
  companyName: string
  settlementDate: Date
  settledDate: Date
  settlementAmount: number
  settledAmount: number
  taxInvoice: string | null
}

export type { ISettlement }
