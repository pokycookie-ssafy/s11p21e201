import { useTranslate } from '@/locales'
import { useEmployeeMeal } from '@/hooks/api'

import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import { Stack, Container, Typography } from '@mui/material'

export function MealUsageBar() {
  const { t } = useTranslate('common')

  const id = 'e7ce2fe0-bf18-408e-b3ea-cb45fa46a469'
  const { data: meal, isLoading, error } = useEmployeeMeal(id)

  if (isLoading) return <Typography variant="h5">{t('main.loading')}</Typography>
  if (error)
    return (
      <Typography variant="h5">
        {t('main.error')}
        {error.message}
      </Typography>
    )

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  // i18n 파일에서 정의된 텍스트(value)에 month, year 변수를 삽입
  const title = t('current.title', { month: currentMonth, year: currentYear })

  // 데이터를 받아온 후 식대 사용 현황 계산
  const totalAmount = meal?.monthlyAmount ?? 0
  const currentUsage = meal?.currentUsage ?? 0
  const usagePercent = ((currentUsage / totalAmount) * 100).toFixed(1)

  return (
    <Container maxWidth="xs">
      <Typography
        variant="h6"
        sx={{ color: (theme) => theme.palette.primary.dark, marginBottom: 2, fontWeight: 'bold' }}
      >
        {title}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
        sx={(theme) => ({
          width: 1,
          maxWidth: 'xs',
          margin: '0 auto',
          [theme.breakpoints.down('sm')]: { width: '90%' },
          borderRadius: 5,
          bgcolor: theme.palette.grey[100],
          boxShadow: 3,
        })}
      >
        <Stack sx={{ width: '50%' }}>
          <Gauge
            value={currentUsage}
            valueMax={totalAmount}
            startAngle={-110}
            height={120}
            endAngle={110}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 18,
                transform: 'translate(0px, 0px)',
                fontWeight: 'bold',
              },
            })}
            text={`${usagePercent.toLocaleString()}%`}
          />
        </Stack>
        <Stack
          sx={{
            textAlign: 'left',
          }}
          justifyContent="center"
        >
          <Typography
            fontSize={18}
            sx={{
              color: (theme) => theme.palette.primary.main,
              fontWeight: 'bold',
            }}
          >
            {t('current.rest')} :
          </Typography>
          <Typography
            fontSize={20}
            sx={{
              color: (theme) => theme.palette.primary.main,
              fontWeight: 'bold',
            }}
          >
            {(totalAmount - currentUsage).toLocaleString()}
            {t('current.won')}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  )
}
