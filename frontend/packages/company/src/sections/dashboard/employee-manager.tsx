import dayjs from 'dayjs'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import { SelectDate } from '@/components/select/select-date'

import {
  Box,
  Card,
  Stack,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material'

interface EmployeeData {
  employeeId: string
  employeeName: string
  amount: number
}

export default function EmployeeManager() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { t } = useTranslate('dashboard')

  const startDate = dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`)
    .startOf('month')
    .format('YYYY-MM-DDTHH:mm:ss')

  const endDate = dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`)
    .endOf('month')
    .format('YYYY-MM-DDTHH:mm:ss')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get<EmployeeData[]>('/companies/dashboards/months/employees', {
          params: {
            startDate,
            endDate,
          },
        })
        setEmployeeData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedYear, selectedMonth])

  const handleDateChange = (year: number, month: number) => {
    setSelectedYear(year)
    setSelectedMonth(month)
  }

  return (
    <Card
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
        height: '300px',
      }}
    >
      <Stack p={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center" pt={1}>
          <Typography variant="h6" align="left" sx={{ flex: 1 }} pl={1}>
            {t('employee_spending')}
          </Typography>

          <SelectDate year={selectedYear} month={selectedMonth} t={t} onChange={handleDateChange} />
        </Box>

        {/* 표 표시 */}
        <Box mt={2} height={200}>
          {employeeData.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('employee_name')}</TableCell>
                    <TableCell align="right">{t('amount_spent')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeData.map((employee) => (
                    <TableRow key={employee.employeeId}>
                      <TableCell>{employee.employeeName}</TableCell>
                      <TableCell align="right">
                        {employee.amount.toLocaleString()} {t('won')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              No Data
            </Typography>
          )}
        </Box>
      </Stack>
    </Card>
  )
}
