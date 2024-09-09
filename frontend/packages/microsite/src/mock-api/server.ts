import api from '@/configs/api'
import { createServer } from 'miragejs'

export default function initServer() {
  createServer({
    routes() {
      this.namespace = 'api'

      this.get(api.todo, () => 'TEST', { timing: 2000 })
    },
  })
}
