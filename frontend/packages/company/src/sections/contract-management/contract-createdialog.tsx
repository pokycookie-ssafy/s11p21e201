import { useState } from 'react'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useQuery } from '@tanstack/react-query'

import {
  Stack,
  Button,
  Dialog,
  Divider,
  TextField,
  Typography,
  DialogTitle,
  Autocomplete,
  DialogContent,
  DialogActions,
} from '@mui/material'

interface ContractCreateDialogProps {
  open: boolean
  onClose: () => void
}

const fetchAllStores = async () => {
  const response = await axios.get('/stores')
  return response.data
}

interface IAllstore {
  storeId: string
  name: string
  licenseNo: string
  address: string
  category: string
  ownerName: string
  phone: string
}

export default function ContractCreateDialog({ open, onClose }: ContractCreateDialogProps) {
  const { t } = useTranslate('management')

  const { data: stores = [] } = useQuery({
    queryKey: ['allstores'],
    queryFn: fetchAllStores,
  })

  const [selectedStore, setSelectedStore] = useState<IAllstore | null>(null)
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('request_contract')}</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ p: 2 }}>
          <Autocomplete
            options={stores}
            getOptionLabel={(option: IAllstore) => option.name}
            renderInput={(params) => (
              <TextField {...params} label={t('write_restaurant')} variant="outlined" />
            )}
            onChange={(_, value) => setSelectedStore(value)}
            isOptionEqualToValue={(option, value) => option.storeId === value.storeId}
            renderOption={(props, option: IAllstore) => (
              <Stack component="li" {...props} sx={{ width: '100%' }} alignItems="flex-start">
                <Typography variant="body1" sx={{ textAlign: 'left', width: '100%' }}>
                  {option.name}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{ width: '100%' }}
                >
                  <Typography variant="body2">{option.address}</Typography>
                  <Typography variant="body2">{option.phone}</Typography>
                </Stack>
              </Stack>
            )}
          />

          {selectedStore && (
            <Stack sx={{ p: 2, border: '1px solid', borderRadius: 2, gap: 0.5 }}>
              <Typography variant="h6">{selectedStore.name}</Typography>
              <Typography variant="body2">
                {t('store_address')}: {selectedStore.address}
              </Typography>
              <Typography variant="body2">
                {t('store_phone')} : {selectedStore.phone}
              </Typography>
              <Typography variant="body2">
                {t('store_owner')} : {selectedStore.ownerName}
              </Typography>
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" sx={{ mb: 2 }}>
          {t('send_request')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
