import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import { useMealRecords } from '@/hooks/api'

import { Box, Stack, Select, Divider, MenuItem, Container, Typography } from '@mui/material'

type MealRecord = {
  createdAt: string
  storeName: string
  storeMenu: string
  price: number
}

export default function PaymentsView() {
  const { t } = useTranslate('common')

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1

  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  // 유저 ID는 로그인 시 얻어와야 합니다.
  const userId = 'e7ce2fe0-bf18-408e-b3ea-cb45fa46a469'

  // 시작과 끝 날짜 계산 함수 추가
  const getDateRange = (year: number, month: number) => {
    const start = `${year}-${String(month).padStart(2, '0')}-01T00:00:00`
    const end = `${year}-${String(month).padStart(2, '0')}-31T23:59:59`
    return { start, end }
  }

  // 연/월 선택에 따른 시작과 끝 날짜 업데이트
  const { start, end } = getDateRange(selectedYear, selectedMonth)

  // API 데이터 받아오기
  const {
    data: mealRecords,
    isLoading,
    error,
    refetch,
  } = useMealRecords(userId, start, end) as {
    data: MealRecord[] | undefined
    isLoading: boolean
    error: unknown
    refetch: () => void
  }

  // 연/월 변경 시 refetch 호출
  useEffect(() => {
    refetch()
  }, [selectedYear, selectedMonth, refetch])

  // 현재 연/월 기준으로 24개월의 연/월 계산
  const getAvailableMonths = () => {
    const months = []
    for (let i = 0; i < 24; i++) {
      const date = new Date(currentYear, currentMonth - 1 - i, 1)
      months.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      })
    }
    return months
  }

  const availableMonths = getAvailableMonths()

  return (
    <Container maxWidth="sm" sx={{ marginTop: 3, marginBottom: 3 }}>
      {/* 연/월 선택 드롭다운 */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          sx={{ minWidth: 100 }}
        >
          {/* 연도 선택 */}
          {[...new Set(availableMonths.map((m) => m.year))].map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          sx={{ minWidth: 100 }}
        >
          {/* 월 선택 */}
          {availableMonths
            .filter((m) => m.year === selectedYear)
            .map((m) => (
              <MenuItem key={m.month} value={m.month}>
                {m.month}
              </MenuItem>
            ))}
        </Select>
      </Box>

      {/* 결제 내역 리스트 */}
      <Stack spacing={1} sx={{ overflowY: 'auto' }}>
        {isLoading ? (
          <Typography>{t('main.loading')}</Typography>
        ) : error ? (
          <Typography color="error">
            {t('main.error')}
            {t('account.error')}
          </Typography>
        ) : mealRecords && mealRecords.length > 0 ? (
          mealRecords.map((record, index) => (
            <Box key={index}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                {new Date(record.createdAt).toLocaleString()}
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {record.storeName} - {record.storeMenu}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {record.price.toLocaleString()}
                  {t('current.won')}
                </Typography>
              </Stack>
              <Divider sx={{ marginY: 1 }} />
            </Box>
          ))
        ) : (
          <Typography variant="body1" align="center">
            {t('account.no-data')}
          </Typography>
        )}
      </Stack>
    </Container>
  )
}
