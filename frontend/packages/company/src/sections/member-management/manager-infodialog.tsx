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

interface IManager {
  id: string
  departmentId: string
  departmentName: String
  supportAmount: number
  spentAmount: number
}

interface ManagerInfoDialogProps {
  open: boolean
  manager: IManager | null
  onClose: () => void
}

export default function ManagerInfoDialog({ open, manager, onClose }: ManagerInfoDialogProps) {
  const { t } = useTranslate('member')

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('manager_information')}</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack spacing={1}>
            <Typography variant="h6">{t('department_name')}</Typography>
            <Typography>{manager?.departmentName}</Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="h6">{t('meal_allowance_amount')}</Typography>
            <Typography>
              {manager?.spentAmount}/{manager?.supportAmount}
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
