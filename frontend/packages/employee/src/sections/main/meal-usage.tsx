import type { IUsage } from '@/types/usage'

import api from '@/configs/api'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { fNumber } from '@e201/utils'
import { useTranslate } from '@/locales'
import { getMonthRange } from '@/utils/date'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Box, Card, Stack, Button, Divider, CircularProgress } from '@mui/material'

import { Typography } from '@e201/ui'

import MealChart from './meal-chart'

interface IProps {
  onQr?: () => void
}

export default function MealUsage({ onQr }: IProps) {
  const { t } = useTranslate()

  const navigate = useNavigate()

  const now = new Date()
  const { start, end } = getMonthRange(now.getFullYear(), now.getMonth())

  const { data } = useQuery({
    queryKey: [api.usage, start, end],
    queryFn: async () => {
      const response = await axios.get<IUsage>(api.usageWith(start, end))
      return response.data
    },
  })

  return data ? (
    <Card sx={{ width: 1, p: 2 }}>
      <Typography variant="subtitle2" align="left" mb={2}>
        {t('usage.title')}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <Box>
          <MealChart total={data.supportAmount} usage={data.usage} />
        </Box>

        <Stack width={1} spacing={0.5}>
          <Typography
            fontSize={22}
            fontWeight={800}
            color="primary.main"
          >{`${fNumber(data.usage ?? 0)} ${t('unit.won')}`}</Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >{`${fNumber(data.supportAmount)} ${t('unit.won')}`}</Typography>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 1 }} />

      <Stack direction="row" spacing={1}>
        <Button fullWidth variant="outlined" onClick={onQr}>
          {t('main.button.qr')}
        </Button>
        <Button fullWidth variant="outlined" onClick={() => navigate(paths.payments)}>
          {t('main.button.payments')}
        </Button>
      </Stack>
    </Card>
  ) : (
    <Stack width={1} height={200} justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  )
}
