import { useState } from 'react'
import { useTranslate } from '@/locales'
import { useBoolean } from '@e201/utils'
import { useStoresList } from '@/hooks/api'

import {
  Box,
  Table,
  Paper,
  Modal,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material'

type Store = {
  storeName: string
  storePhone: string
  storeAddress: string
}

export function StoresList() {
  const { t } = useTranslate('common')
  const { data: stores, isLoading, error } = useStoresList()

  const open = useBoolean()
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)

  const handleRowClick = (store: Store) => {
    setSelectedStore(store)
    open.onTrue()
  }

  const handleTouchEnd = (store: Store, event: React.TouchEvent) => {
    event.preventDefault()
    handleRowClick(store)
  }

  const handleClose = () => {
    open.onFalse()
    console.log('닫을게')
    setSelectedStore(null)
  }

  if (isLoading) return <Typography variant="h5">{t('main.loading')}</Typography>
  if (error)
    return (
      <Typography variant="h5">
        {t('main.error')}
        {error.message}
      </Typography>
    )
  if (!stores || stores.length === 0) {
    return <Typography variant="h5">{t('main.no-store')}</Typography>
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 'xs',
          margin: '0 auto',
          width: 1,
          boxShadow: 3,
          maxHeight: 400, // 스크롤 가능한 높이 설정
          overflowY: 'auto', // 스크롤 활성화
        }}
      >
        <Table sx={{ width: 1 }} aria-label="scrollable table">
          <TableBody>
            {stores.map((store: Store) => (
              <TableRow
                key={store.storeName}
                onClick={() => handleRowClick(store)}
                onTouchEnd={(e) => handleTouchEnd(store, e)}
                sx={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  {store.storeName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {store.storePhone}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open.value} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">
            {selectedStore ? selectedStore.storeName : t('main.no-store')}
          </Typography>
          <Typography variant="body1">
            {selectedStore ? selectedStore.storeAddress : t('main.no-address')}
          </Typography>
          <Typography variant="body1">
            {selectedStore ? selectedStore.storePhone : t('main.no-phone')}
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 2 }}>
            {t('main.close')}
          </Button>
        </Box>
      </Modal>
    </>
  )
}
