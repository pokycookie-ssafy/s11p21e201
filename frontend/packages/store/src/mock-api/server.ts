import type { IAuth } from '@/stores'

import api from '@/configs/api'
import { Response, createServer } from 'miragejs'

import { menuResponse } from './response/menu'
import { paymentResponse } from './response/payment'
import { settlementResponse } from './response/settlement'
import {
  contractNow,
  bankResponse,
  licenseResponse,
  contractHistory,
  contractRequestSend,
  contractRequestReceived,
} from './response'

export default function initServer() {
  createServer({
    routes() {
      let user: IAuth | null = null

      this.namespace = 'api'

      this.post(api.common.ocr, () => licenseResponse, { timing: 5000 })
      this.get(api.signUp.bank, () => bankResponse)
      this.get(api.management.payment, () => paymentResponse, { timing: 0 })
      this.get(api.menu.list, () => menuResponse, { timing: 1000 })
      this.get(api.contract.list, () => contractNow, { timing: 1000 })
      this.get(api.contract.received, () => contractRequestReceived, { timing: 1000 })
      this.get(api.contract.send, () => contractRequestSend, { timing: 1000 })
      this.get(api.contract.history, () => contractHistory, { timing: 1000 })
      this.get(api.settlement.list, () => settlementResponse, { timing: 1000 })

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
    },
  })
}
