import api from '@/configs/api'
import { createServer } from 'miragejs'

export default function initServer() {
  createServer({
    routes() {
      this.namespace = 'api'

      this.get(api.todo, () => 'TEST', { timing: 2000 })

      this.get('/companies/stores', () => [
        { id: '1', name: '고봉김밥', phone: '010-1234-5678', address: '서울시 강남구' },
        { id: '2', name: '고봉식당', phone: '010-2345-6789', address: '서울시 서초구' },
        { id: '3', name: '고봉순두부', phone: '010-3456-7890', address: '서울시 송파구' },
      ])
    },
  })
}
