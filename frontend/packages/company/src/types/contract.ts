interface IContract {
  id: string
  name: string
  phone: string
  address: string
  createdAt: Date
}

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
  storeAddress: string
  contractDate: Date
  settlementDate: number
}

interface IContractHistory extends IContractResponse {
  status: string
}

export type { IContract, IContractHistory, IContractResponse }
