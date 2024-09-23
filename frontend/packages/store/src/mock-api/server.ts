import api from '@/configs/api'
import { createServer } from 'miragejs'

import { paymentResponse } from './response/payment'
import { bankResponse, licenseResponse } from './response'

export default function initServer() {
  createServer({
    routes() {
      this.namespace = 'api'

      this.post(api.signUp.ocr, () => licenseResponse, { timing: 5000 })
      this.get(api.signUp.bank, () => bankResponse)
      this.get(api.management.payment, () => paymentResponse, { timing: 0 })
    },
  })
}
