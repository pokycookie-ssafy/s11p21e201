import { Scanner } from '@/components/qr'

import { Box, Dialog } from '@mui/material'

interface IProps {
  open: boolean
  onClose: () => void
  onSuccess?: (data: string) => void
}

export default function PaymentQr({ open, onClose, onSuccess }: IProps) {
  const successHandler = (data: string) => {
    if (onSuccess) {
      onSuccess(data)
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} sx={{ backdropFilter: 'blur(3px)' }}>
      <Box width={300} height={300} overflow="hidden">
        <Scanner onSuccess={successHandler} />
      </Box>
    </Dialog>
  )
}
