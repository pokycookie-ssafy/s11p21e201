import { useState } from 'react'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useQuery } from '@tanstack/react-query'
import StoreInfoDialog from '@/sections/contract-management/store-infodialog'
import ContractViewMenu from '@/sections/contract-management/contract-viewmenu'
import ContractCreateDialog from '@/sections/contract-management/contract-createdialog'

import { Stack, Button, Divider, Typography, Pagination } from '@mui/material'

const fetchStores = async () => {
  const response = await axios.get('/companies/stores')
  return response.data
}

interface IStore {
  id: string
  name: string
  phone: string
  address: string
}

export default function ContractManagement() {
  const { t } = useTranslate('management')

  const [openStoreInfoDialog, setOpenStoreInfoDialog] = useState(false)
  const [selectedStore, setSelectedStore] = useState<IStore | null>(null)

  const [openContractCreateDialog, setOpenContractCreateDialog] = useState(false)

  const handleOpenStoreInfoDialog = (store: IStore) => {
    setSelectedStore(store)
    setOpenStoreInfoDialog(true)
  }

  const handleCloseStoreInfoDialog = () => {
    setOpenStoreInfoDialog(false)
    setSelectedStore(null)
  }

  const handleOpenContractCreateDialog = () => {
    setOpenContractCreateDialog(true)
  }

  const handleCloseContractCreateDialog = () => {
    setOpenContractCreateDialog(false)
  }

  const { data: stores = [] } = useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores,
  })

  return (
    <Stack spacing={5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{t('contract_management')}</Typography>
        <Stack direction="row" gap={2}>
          <ContractViewMenu />
          <Button variant="contained" onClick={() => handleOpenContractCreateDialog()}>
            {t('request_contract')}
          </Button>
        </Stack>
      </Stack>
      <Stack>
        {stores.map((store: IStore) => (
          <Stack key={store.id}>
            <Stack direction="row" alignItems="center" padding={2}>
              <Typography
                onClick={() => handleOpenStoreInfoDialog(store)}
                sx={{ cursor: 'pointer' }}
              >
                {store.name}
              </Typography>
            </Stack>
            <Divider />
          </Stack>
        ))}
      </Stack>
      <Pagination count={10} sx={{ display: 'flex', justifyContent: 'center' }} />
      <StoreInfoDialog
        open={openStoreInfoDialog}
        store={selectedStore}
        onClose={handleCloseStoreInfoDialog}
      />
      <ContractCreateDialog
        open={openContractCreateDialog}
        onClose={handleCloseContractCreateDialog}
      />
    </Stack>
  )
}
