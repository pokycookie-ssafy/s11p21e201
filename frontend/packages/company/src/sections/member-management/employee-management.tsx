import { useState } from 'react'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useQuery } from '@tanstack/react-query'
import EmployeeInfoDialog from '@/sections/member-management/employee-infodialog'
import EmployeeCreateDialog from '@/sections/member-management/employee-createdialog'

import { Stack, Button, Divider, Typography, Pagination } from '@mui/material'

const fetchEmployees = async () => {
  const response = await axios.get('/companies/employees')
  return response.data
}

interface IEmployee {
  id: string
  name: string
  departmentId: string
  departmentName: String
  supportAmount: number
  spentAmount: number
}

export default function EmployeeManagement() {
  const { t } = useTranslate('management')

  const [openEmployeeInfoDialog, setOpenEmployeeInfoDialog] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null)

  const [openEmployeeCreateDialog, setOpenEmployeeCreateDialog] = useState(false)

  const handleOpenEmployeeInfoDialog = (employee: IEmployee) => {
    setSelectedEmployee(employee)
    setOpenEmployeeInfoDialog(true)
  }

  const handleCloseEmployeeInfoDialog = () => {
    setOpenEmployeeInfoDialog(false)
    setSelectedEmployee(null)
  }

  const handleOpenEmployeeCreateDialog = () => {
    setOpenEmployeeCreateDialog(true)
  }

  const handleCloseEmployeeCreateDialog = () => {
    setOpenEmployeeCreateDialog(false)
  }

  const { data: employees = [] } = useQuery({
    queryKey: ['employees'],

    queryFn: fetchEmployees,
  })

  return (
    <Stack spacing={5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{t('employee_management')}</Typography>
        <Button variant="contained" onClick={() => handleOpenEmployeeCreateDialog()}>
          {t('create_employee')}
        </Button>
      </Stack>
      <Stack>
        {employees.map((employee: IEmployee) => (
          <Stack key={employee.id}>
            <Stack direction="row" alignItems="center" padding={2}>
              <Typography
                onClick={() => handleOpenEmployeeInfoDialog(employee)}
                sx={{ cursor: 'pointer' }}
              >
                {employee.name}
              </Typography>
            </Stack>
            <Divider />
          </Stack>
        ))}
      </Stack>
      <Pagination count={10} sx={{ display: 'flex', justifyContent: 'center' }} />
      <EmployeeInfoDialog
        open={openEmployeeInfoDialog}
        employee={selectedEmployee}
        onClose={handleCloseEmployeeInfoDialog}
      />
      <EmployeeCreateDialog
        open={openEmployeeCreateDialog}
        onClose={handleCloseEmployeeCreateDialog}
      />
    </Stack>
  )
}
