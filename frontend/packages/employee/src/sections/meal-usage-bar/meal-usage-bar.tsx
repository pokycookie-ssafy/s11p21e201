import { useTranslate } from '@/locales'
import { useEmployeeMeal } from '@/hooks/api'

import { Stack, Typography } from '@mui/material'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'

export function MealUsageBar() {
  const { t } = useTranslate('common')

  const id = 'e7ce2fe0-bf18-408e-b3ea-cb45fa46a469'
  const { data: meal, isLoading, error } = useEmployeeMeal(id)

  if (isLoading) return <Typography variant="h5">Loading...</Typography>
  if (error) return <Typography variant="h5">Error: {error.message}</Typography>

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  // i18n 파일에서 정의된 텍스트(value)에 month, year 변수를 삽입
  const title = t('current.title', { month: currentMonth, year: currentYear })

  // 데이터를 받아온 후 식대 사용 현황 계산
  const totalAmount = meal?.monthlyAmount ?? 0
  const currentUsage = meal?.currentUsage ?? 0

  return (
    <>
      <Typography variant="h5">{title}</Typography>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={(theme) => ({
          width: '50%',
          maxWidth: '600px',
          margin: '0 auto',
          [theme.breakpoints.down('sm')]: { width: '90%' },
        })}
      >
        <Stack sx={{ flexBasis: '70%' }}>
          <Gauge
            value={currentUsage}
            valueMax={totalAmount}
            startAngle={-100}
            endAngle={100}
            height={200}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 20,
                transform: 'translate(0px, 0px)',
                color: theme.palette.text.primary,
              },
            })}
            text=""
          />
        </Stack>
        <Stack sx={{ flexBasis: '30%', textAlign: 'right' }}>
          <Typography>
            {currentUsage.toLocaleString()}
            {t('current.won')}
          </Typography>
          <Typography>
            / {totalAmount.toLocaleString()}
            {t('current.won')}
          </Typography>
        </Stack>
      </Stack>
    </>
  )
}
