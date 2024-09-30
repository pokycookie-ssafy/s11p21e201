import api from '@/configs/api'
import { createServer } from 'miragejs'

import { storesResponse } from './response/stores'
import { managerResponse } from './response/managers'
import { paymentResponse } from './response/payments'
import { employeeResponse } from './response/employees'
import { contractsResponse } from './response/contracts'
import { settlementResponse } from './response/settlements'
import { contractStoreResponse } from './response/contract-stores'
import { contractHistoryResponse } from './response/contracts-history'

export default function initServer() {
  createServer({
    routes() {
      this.namespace = 'api'

      this.get(api.todo, () => 'TEST', { timing: 2000 })

      this.get('/companies/stores', () => contractStoreResponse)

      this.get('/companies/employees', () => employeeResponse)

      this.get('/companies/managers', () => managerResponse)

      this.get('/stores', () => storesResponse)

      this.get('/contract', (schema, request) => {
        const { userCond = 'all', status = 'all' } = request.queryParams

        const contracts = contractsResponse

        const filteredContracts = contracts.filter((contract) => {
          const userCondMatch = userCond === 'all' || contract.userCond === userCond
          const statusMatch = status === 'all' || contract.status === status

          return userCondMatch && statusMatch
        })

        const responseContracts = filteredContracts.map(
          ({ userCond: userCondTemp, status: statusCondTemp, ...rest }) => rest
        )

        return responseContracts
      })

      this.get('/companies/payment', () => paymentResponse)

      this.get('/contract/temp', () => contractHistoryResponse)

      this.get('/settlement', () => settlementResponse)
    },
  })
}
