interface IContractResponse {
  contractId: string
  companyId: string
  companyName: string
  companyEmail: string
  companyPhone: string
  storeId: string
  storeName: string
  storeEmail: string
  storePhone: string
  contractDate: Date
  settlementDate: number
}

interface IContractHistory extends IContractResponse {
  status: string
}

export type { IContractHistory, IContractResponse }
