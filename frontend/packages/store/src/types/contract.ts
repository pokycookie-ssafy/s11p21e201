interface IContract {
  id: string
  name: string
  email: string
  phone: string
  createdAt: Date
}

interface IContractHistory extends IContract {
  status: string
}

export type { IContract, IContractHistory }
