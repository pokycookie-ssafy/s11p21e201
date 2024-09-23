import { useTranslate } from '@/locales'

import {
  Stack,
  Button,
  Dialog,
  Divider,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

interface ManagerCreateDialogProps {
  open: boolean
  onClose: () => void
}

export default function ManagerCreateDialog({ open, onClose }: ManagerCreateDialogProps) {
  const { t } = useTranslate('management')

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('create_manager')}</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ p: 2 }}>
          <TextField label={t('department_name')} variant="outlined" size="small" />
          <TextField label={t('department_number')} variant="outlined" size="small" />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" sx={{ mb: 2 }}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
