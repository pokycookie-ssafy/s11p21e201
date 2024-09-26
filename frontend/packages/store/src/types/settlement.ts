interface ISettlementResponse {
  id: string
  companyId: string
  companyName: string
  settlementDate: Date
  settledDate: Date
  settlementAmount: number
  settledAmount: number
  taxInvoice: boolean
}

export type { ISettlementResponse }
