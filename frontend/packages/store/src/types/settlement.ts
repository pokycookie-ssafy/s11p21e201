interface ISettlement {
  id: string
  partnerId: string
  partnerName: string
  settlementDate: Date
  settledDate: Date
  settlementAmount: number
  settledAmount: number
  receivable: number
  taxInvoice: string | null
}

export type { ISettlement }
