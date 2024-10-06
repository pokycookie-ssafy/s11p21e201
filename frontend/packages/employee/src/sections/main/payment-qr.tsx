import type { IQrUuid, IQrPayment } from '@/types/payment'

import dayjs from 'dayjs'
import api from '@/configs/api'
import QRCode from 'react-qr-code'
import axios from '@/configs/axios'
import { uuidv4 } from '@e201/utils'
import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import duration from 'dayjs/plugin/duration'

import { Box, Stack, CircularProgress } from '@mui/material'

import { Typography } from '@e201/ui'

dayjs.extend(duration)

export default function PaymentQR() {
  const { t } = useTranslate('qr')

  const [data, setData] = useState<IQrPayment | null>(null)
  const [time, setTime] = useState(90)

  const { user } = useAuthStore()

  const generateUUID = async () => {
    if (!user) {
      return
    }

    const { employeeId } = user
    try {
      const qrId = uuidv4()
      const req: IQrUuid = { validationId: qrId }
      await axios.post(api.qr, req)
      setData({ employeeId, qrId })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    generateUUID()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [time])

  return (
    <Stack width={1} height={1} justifyContent="center" alignItems="center">
      <Stack
        justifyContent="center"
        alignItems="center"
        p={0.5}
        maxWidth={200}
        width={1}
        position="relative"
      >
        {data ? (
          <>
            <QRCode style={{ width: '100%', zIndex: 1 }} value={JSON.stringify(data)} />
            <Box
              bgcolor="common.white"
              p={1}
              borderRadius={1}
              width={1}
              sx={{ aspectRatio: 1 }}
              position="absolute"
            />
            <Typography
              variant="subtitle2"
              fontSize={13}
              fontWeight={500}
              position="absolute"
              top={0}
            >
              {t('info')}
            </Typography>
            <Typography variant="subtitle2" position="absolute" bottom={0}>
              {dayjs.duration(time, 'seconds').format('mm:ss')}
            </Typography>
          </>
        ) : (
          <CircularProgress />
        )}
      </Stack>
    </Stack>
  )
}
