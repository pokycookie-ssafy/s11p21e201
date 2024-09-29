import { useTranslate } from '@/locales'

import {
  Stack,
  Button,
  Dialog,
  Divider,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

interface IEmployee {
  id: string
  name: string
  departmentId: string
  departmentName: String
  supportAmount: number
  spentAmount: number
}

interface EmployeeInfoDialogProps {
  open: boolean
  employee: IEmployee | null
  onClose: () => void
}

export default function EmployeeInfoDialog({ open, employee, onClose }: EmployeeInfoDialogProps) {
  const { t } = useTranslate('member')

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('employee_informantion')}</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack spacing={1}>
            <Typography variant="h6">{t('employee_name')}</Typography>
            <Typography>{employee?.name}</Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="h6">{t('meal_allowance_amount')}</Typography>
            <Typography>
              {employee?.spentAmount}/{employee?.supportAmount}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" sx={{ mb: 2 }}>
          {t('delete_account')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
