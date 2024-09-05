import { toast } from 'sonner'

import { Stack, Button, Container } from '@mui/material'

export default function ToastView() {
  return (
    <Container>
      <Stack direction="row" spacing={1}>
        <Button onClick={() => toast('default')}>Default</Button>
        <Button color="success" onClick={() => toast.success('success')}>
          Success
        </Button>
        <Button color="info" onClick={() => toast.info('info')}>
          Info
        </Button>
        <Button color="warning" onClick={() => toast.warning('warning')}>
          Warning
        </Button>
        <Button color="error" onClick={() => toast.error('error')}>
          Error
        </Button>
      </Stack>
    </Container>
  )
}
