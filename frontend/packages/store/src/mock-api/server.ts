import api from '@/configs/api'
import { createServer } from 'miragejs'

import { menuResponse } from './response/menu'
import { paymentResponse } from './response/payment'
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
      this.namespace = 'api'

      this.post(api.signUp.ocr, () => licenseResponse, { timing: 5000 })
      this.get(api.signUp.bank, () => bankResponse)
      this.get(api.management.payment, () => paymentResponse, { timing: 0 })
      this.get(api.menu.list, () => menuResponse, { timing: 1000 })
      this.get(api.contract.list, () => contractNow, { timing: 1000 })
      this.get(api.contract.request, () => contractRequestReceived, { timing: 1000 })
      this.get(api.contract.response, () => contractRequestSend, { timing: 1000 })
      this.get(api.contract.history, () => contractHistory, { timing: 1000 })
    },
  })
}
