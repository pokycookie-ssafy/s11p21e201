import type { IQrPayment } from '@/types/payment'

import QRCode from 'react-qr-code'
import { uuidv4 } from '@e201/utils'
import { useAuthStore } from '@/stores'
import { useState, useEffect } from 'react'

import { Stack, CircularProgress } from '@mui/material'

export default function PaymentQR() {
  const [data, setData] = useState<IQrPayment | null>(null)

  const { user } = useAuthStore()

  useEffect(() => {
    if (!user) {
      return
    }
    const { employeeId } = user
    const qrId = uuidv4()
    setData({ employeeId, qrId })
  }, [user])

  return (
    <Stack width={1} sx={{ aspectRatio: 1 }} justifyContent="center" alignItems="center">
      {data ? <QRCode value={JSON.stringify(data)} /> : <CircularProgress />}
    </Stack>
  )
}
