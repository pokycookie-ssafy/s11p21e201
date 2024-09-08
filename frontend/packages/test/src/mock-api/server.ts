import type { ITodoResponse } from '@/types/todo'

import api from '@/configs/api'
import { Model, createServer } from 'miragejs'

export default function initServer() {
  createServer({
    models: {
      todo: Model.extend<Partial<ITodoResponse>>({}),
    },

    seeds(server) {
      server.create('todo', { id: '1', title: 'test1', content: 'test content1', status: 'TODO' })
      server.create('todo', { id: '2', title: 'test2', content: 'test content2', status: 'TODO' })
      server.create('todo', { id: '3', title: 'test3', content: 'test content3', status: 'TODO' })
    },

    routes() {
      this.namespace = 'api'

      this.get(api.todo, (schema) => schema.all('todo'), { timing: 2000 })

      this.post(api.todo, (schema, request) => {
        const attr = JSON.parse(request.requestBody)
        return schema.create('todo', attr)
      })
    },
  })
}
