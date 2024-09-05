import type { ITodoRequest, ITodoResponse } from '@/types/todo'

import api from '@/configs/api'
import axios from '@/configs/axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { Stack, Button, Container, Typography, CircularProgress } from '@mui/material'

const queryFn = async () => {
  const data = await axios.get<{ todos: ITodoResponse[] }>(api.todo)
  return data.data
}

const mutationFn = async (req: ITodoRequest) => {
  const data = await axios.post(api.todo, req)
  return data.data
}

export default function MockApiView() {
  const queryClient = useQueryClient()

  const { data, isPending, isError } = useQuery({ queryKey: ['todo'], queryFn })

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  })

  if (isPending) {
    return <CircularProgress />
  }

  if (isError) {
    return <Container>Error</Container>
  }

  return (
    <Container>
      <Stack spacing={1}>
        {data.todos.map((todo) => (
          <Stack key={todo.id} direction="row" spacing={1}>
            <Typography>{todo.title}</Typography>
            <Typography>{todo.content}</Typography>
            <Typography>{todo.status}</Typography>
          </Stack>
        ))}
      </Stack>
      <Button onClick={() => mutate({ title: 'New', content: new Date().toDateString() })}>
        POST
      </Button>
    </Container>
  )
}
