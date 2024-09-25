import api from '@/configs/api'
import { createServer } from 'miragejs'

import { storesResponse } from './response/stores'
import { managerResponse } from './response/managers'
import { employeeResponse } from './response/employees'
import { contractsResponse } from './response/contracts'
import { contractStoreResponse } from './response/contract-stores'

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
    },
  })
}
