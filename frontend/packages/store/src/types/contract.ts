type ContractUserCondition = 'ALL' | 'SENDER' | 'RECEIVER'

type ContractStatus = 'ALL' | 'IN' | 'COMPLETE' | 'CANCEL' | 'REJECT'

type ContractResponseStatus =
  | 'COMPANY_REQUEST'
  | 'STORE_REQUEST'
  | 'COMPANY_REJECT'
  | 'STORE_REJECT'
  | 'CANCEL'
  | 'COMPLETE'

type ContractResponse = 'APPROVE' | 'REJECT'

interface IContract {
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
  settlementDay: number
  status: ContractResponseStatus
}

interface IContractCreateRequest {
  senderId: string
  receiverRegisterNumber: string
  settlementDate: number
}

interface IContractRequest {
  contractId: string
  respondResult: ContractResponse
}

export type {
  IContract,
  ContractStatus,
  IContractRequest,
  ContractResponse,
  ContractUserCondition,
  IContractCreateRequest,
  ContractResponseStatus,
}
