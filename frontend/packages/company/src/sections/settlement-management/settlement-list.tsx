import type { SelectChangeEvent } from '@mui/material/Select'

import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useBoolean } from '@/hooks/use-boolean'

import {
  Box,
  Grid,
  Stack,
  Select,
  Button,
  Dialog,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  DialogTitle,
  OutlinedInput,
  DialogContent,
  DialogActions,
} from '@mui/material'

interface IStore {
  id: string
  name: string
  phone: string
  address: string
}

const fetchStores = async () => {
  const response = await axios.get('/companies/stores')
  return response.data
}

export default function SettlementList() {
  const settlementDialog = useBoolean()
  const invoiceDialog = useBoolean()
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('')

  const { t } = useTranslate('settlement')
  const { data: stores = [] } = useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores,
  })

  const selectedStoreData = useMemo(
    () => stores.find((store: IStore) => store.name === selectedRestaurant),
    [stores, selectedRestaurant]
  )

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRestaurant(event.target.value)
  }

  return (
    <Stack spacing={3}>
      <Stack justifyContent="space-between" alignItems="center" direction="row">
        <Stack direction="row">
          <Typography variant="h5">
            {selectedStoreData ? selectedStoreData.name : '고봉김밥'}
          </Typography>
        </Stack>
        <Stack justifyContent="flex-end" spacing={1} direction="row">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>{t('restaurant_name')}</InputLabel>
            <Select
              value={selectedRestaurant}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
            >
              {stores.map((store: IStore) => (
                <MenuItem key={store.id} value={store.name}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <Stack direction="row">
        <Grid container spacing={2}>
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Stack alignItems="center">
              <Typography>{t('total_amount_due')}</Typography>
              <Typography variant="h5">
                {selectedStoreData ? '500,000' : '0'}
                {t('won')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              =
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Stack alignItems="center">
              <Typography>{t('current_amount_due')}</Typography>
              <Typography variant="h5">
                {selectedStoreData ? '500,000' : '0'}
                {t('won')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              +
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Stack alignItems="center">
              <Typography>{t('overdue_amount')}</Typography>
              <Typography variant="h5">
                {selectedStoreData ? '0' : '0'}
                {t('won')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Stack>

      <Stack direction="row">
        <Grid container spacing={2}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Stack spacing={3} sx={{ p: 2 }}>
              <Box>
                <Typography sx={{ textAlign: 'center' }}>{t('transaction_details')}</Typography>
              </Box>
              <Box
                component="li"
                sx={{
                  p: 1,
                  borderBottom: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ justifyContent: 'flex-start' }}>
                  <Typography variant="body1">2024/08/01 ~ 2024/08/31</Typography>
                  <Typography variant="h6">480,000{t('won')}</Typography>
                </Box>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}
                >
                  <Typography variant="body1">{t('settlement_date')} : 2024/09/10</Typography>
                  <Button variant="outlined" size="small" onClick={settlementDialog.onTrue}>
                    {t('settle')}
                  </Button>
                  <Dialog
                    open={settlementDialog.value}
                    onClose={settlementDialog.onFalse}
                    maxWidth="sm"
                    fullWidth
                  >
                    <DialogTitle>{t('settle')}</DialogTitle>
                    <DialogContent dividers>
                      <Stack spacing={2} sx={{ p: 2 }}>
                        <Typography variant="h6">{t('recipient_account')}</Typography>
                        <Typography>1002-954-436365 우리은행 </Typography>
                        <Typography variant="h6">{t('my_account')}</Typography>
                        <Typography>1001-943-382901 국민은행 </Typography>
                      </Stack>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                      <Button variant="contained" onClick={settlementDialog.onFalse}>
                        {t('settle')}
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Button variant="contained" size="small" onClick={invoiceDialog.onTrue}>
                    {t('view_invoice')}
                  </Button>
                  <Dialog
                    open={invoiceDialog.value}
                    onClose={invoiceDialog.onFalse}
                    maxWidth="sm"
                    fullWidth
                  >
                    <DialogTitle> {t('view_invoice')}</DialogTitle>
                    <DialogContent dividers>
                      <Typography>세금계산서 조회 정보</Typography>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                      <Button variant="contained" onClick={invoiceDialog.onFalse}>
                        {t('download')}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Stack>
    </Stack>
  )
}
