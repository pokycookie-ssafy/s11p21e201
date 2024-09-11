import api from '@/configs/api'
import { createServer } from 'miragejs'

import { bankResponse, licenseResponse } from './response'

export default function initServer() {
  createServer({
    routes() {
      this.namespace = 'api'

      this.post(api.signUp.ocr, () => licenseResponse, { timing: 5000 })
      this.get(api.signUp.bank, () => bankResponse)
    },
  })
}
