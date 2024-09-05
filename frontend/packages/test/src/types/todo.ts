type TodoStatus = 'SUCCESS' | 'FAIL' | 'TODO'

interface ITodoResponse {
  id: number
  title: string
  content: string
  status: TodoStatus
}

interface ITodoRequest {
  title: string
  content: string
}

export type { ITodoRequest, ITodoResponse }
