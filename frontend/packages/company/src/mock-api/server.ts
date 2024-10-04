import type { IAuth } from '@/stores'

import api from '@/configs/api'
import { Response, createServer } from 'miragejs'
import { bankResponse } from '@/mock-api/response/bank'
import { licenseResponse } from '@/mock-api/response/license'
import {
  contractNow,
  contractHistory,
  contractRequestSend,
  contractRequestReceived,
} from '@/mock-api/response/contract'

import { storesResponse } from './response/stores'
import { managerResponse } from './response/managers'
import { paymentResponse } from './response/payments'
import { employeeResponse } from './response/employees'
import { contractsResponse } from './response/contracts'
import { dashboardResponse } from './response/dashboard'
import { settlementResponse } from './response/settlements'
import { contractStoreResponse } from './response/contract-stores'
import { contractHistoryResponse } from './response/contracts-history'

export default function initServer() {
  createServer({
    routes() {
      let user: IAuth | null = null

      this.namespace = 'api'

      this.post(api.common.ocr, () => licenseResponse, { timing: 5000 })

      this.get(api.signUp.bank, () => bankResponse)

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

      this.get(api.contract.list, () => contractNow, { timing: 1000 })
      this.get(api.contract.received, () => contractRequestReceived, { timing: 1000 })
      this.get(api.contract.send, () => contractRequestSend, { timing: 1000 })
      this.get(api.contract.history, () => contractHistory, { timing: 1000 })

      this.get('/companies/payment', () => paymentResponse)

      this.get('/contract/temp', () => contractHistoryResponse)

      this.get('/settlement', () => settlementResponse)

      this.get(api.auth.check, () => !!user)

      this.post(api.auth.login, (sch, req) => {
        const { email, password } = JSON.parse(req.requestBody)

        if (email === 'test@ssafy.com' && password === '12345678') {
          user = {
            id: '716af5c6-24f1-4750-bb17-3d0f83b2fbbc',
            name: 'test account',
            email: 'test@test.com',
            phone: '000-0000-0000',
          }
          return new Response(201, {}, user)
        }
        return new Response(401)
      })

      this.get(api.auth.logout, () => {
        user = null
        return new Response(204)
      })
      this.get('/dashboard', () => dashboardResponse)
    },
  })
}
