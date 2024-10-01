interface ISettlementResponse {
  id: string
  storeId: string
  storeName: string
  settlementDate: Date
  settledDate: Date
  settlementAmount: number
  settledAmount: number
  taxInvoice: boolean
}

export type { ISettlementResponse }
