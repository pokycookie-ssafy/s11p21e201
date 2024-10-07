interface ISettlementResponse {
  id: string
  companyId: string
  companyName: string
  settlementDate: Date
  settledDate: Date
  settlementAmount: number
  settledAmount: number
  taxInvoice: string | null
}

export type { ISettlementResponse }
