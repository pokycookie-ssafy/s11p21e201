import { useEmployeeMeal } from '@/hooks/api'

import { Box, Typography } from '@mui/material'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'

export function MealUsageBar() {
  const id = 'e7ce2fe0-bf18-408e-b3ea-cb45fa46a469'
  const { data: meal, isLoading, error } = useEmployeeMeal(id)

  if (isLoading) return <Typography variant="h5">Loading...</Typography>
  if (error) return <Typography variant="h5">Error: {error.message}</Typography>

  // 데이터를 받아온 후 식대 사용 현황 계산
  const totalAmount = meal?.monthlyAmount ?? 0
  const currentUsage = meal?.currentUsage ?? 0
  const remainingAmount = totalAmount - currentUsage
  const usagePercentage = (currentUsage / totalAmount) * 100

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h5">{new Date().getMonth() + 1}월 식대 사용 현황</Typography>
        <Box
          sx={{
            width: '80%',
            height: '30px',
            backgroundColor: (theme) => theme.palette.background.default,
            margin: '10px auto',
            border: (theme) => `2px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{
              width: `${usagePercentage}%`,
              height: '100%',
              backgroundColor: (theme) => theme.palette.background.paper,
              border: (theme) => `2px solid ${theme.palette.divider}`,
            }}
          />
        </Box>
        <Typography>
          {currentUsage.toLocaleString()}원 / {totalAmount.toLocaleString()}원
        </Typography>
        <Typography sx={{ color: (theme) => theme.palette.text.primary, fontWeight: 'bold' }}>
          남은 금액 : {remainingAmount.toLocaleString()}원
        </Typography>
      </Box>

      <Gauge
        value={currentUsage}
        valueMax={totalAmount}
        startAngle={-100}
        endAngle={100}
        height={200}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
            transform: 'translate(0px, 0px)',
            color: (theme) => theme.palette.text.primary,
          },
        }}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
      />
    </>
  )
}
