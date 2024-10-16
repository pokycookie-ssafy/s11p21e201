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
  TableRow,
  useTheme,
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
  const [loading, setLoading] = useState<boolean>(false)

  const { t } = useTranslate('dashboard')

  const theme = useTheme()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get<EmployeeData[]>('/companies/dashboards/months/employees', {
          params: {
            startDate: dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`)
              .startOf('month')
              .format('YYYY-MM-DDTHH:mm:ss'),
            endDate: dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`)
              .endOf('month')
              .format('YYYY-MM-DDTHH:mm:ss'),
          },
        })
        setEmployeeData(response.data)
      } catch (error) {
        console.error(error)
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
            {t('employee_amount')}
          </Typography>

          <SelectDate year={selectedYear} month={selectedMonth} t={t} onChange={handleDateChange} />
        </Box>

        <Box mt={2} height={200}>
          {employeeData.length > 0 ? (
            <TableContainer
              sx={{
                maxHeight: '200px',
                backgroundColor: theme.palette.background.default,
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                '-ms-overflow-style': 'none',
                'scrollbar-width': 'none',
              }}
            >
              <Table stickyHeader sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        padding: '8px 16px',
                        borderBottom: `1px solid ${theme.palette.grey[300]}`,
                      }}
                    >
                      {t('name')}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        padding: '8px 16px',
                        borderBottom: `1px solid ${theme.palette.grey[300]}`,
                      }}
                    >
                      {t('total_amount')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeData.map((employee) => (
                    <TableRow key={employee.employeeId}>
                      <TableCell
                        sx={{
                          padding: '8px 16px',
                          borderBottom: `1px solid ${theme.palette.grey[300]}`,
                        }}
                      >
                        {employee.employeeName}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          padding: '8px 16px',
                          borderBottom: `1px solid ${theme.palette.grey[300]}`,
                        }}
                      >
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
                color: theme.palette.grey[500],
                height: '80%',
              }}
            >
              {t('no_data')}
            </Typography>
          )}
        </Box>
      </Stack>
    </Card>
  )
}
