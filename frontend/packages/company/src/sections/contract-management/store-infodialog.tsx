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

interface IStore {
  id: string
  name: string
  phone: string
  address: string
}

interface StoreInfoDialogProps {
  open: boolean
  store: IStore | null
  onClose: () => void
}

export default function StoreInfoDialog({ open, store, onClose }: StoreInfoDialogProps) {
  const { t } = useTranslate('management')

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('store_information')}</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack spacing={1}>
            <Typography variant="h6">{t('store_name')}</Typography>
            <Typography>{store?.name}</Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="h6">{t('store_phone')}</Typography>
            <Typography>{store?.phone}</Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="h6">{t('store_address')}</Typography>
            <Typography>{store?.address}</Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" sx={{ mb: 2 }}>
          {t('delete_contract')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
