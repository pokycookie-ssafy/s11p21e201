import type { ISettlementRequest } from '@/types/settlement'

import { toast } from 'sonner'
import api from '@/configs/api'
import { useState } from 'react'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'

import { Stack, Dialog, Button, TextField } from '@mui/material'

import { Breadcrumbs } from '@e201/ui'

interface IProps {
  open: boolean
  settlementId: string
  onClose: () => void
  refetch: () => void
}

export default function SettleModal({ open, onClose, settlementId, refetch }: IProps) {
  const { t } = useTranslate('settlement')

  const [amount, setAmount] = useState('0')

  const submitHandler = async () => {
    try {
      const req: ISettlementRequest = {
        settlementId,
        amount: parseInt(amount),
      }
      await axios.post(api.settlement.settle, req)
      refetch()
      onClose()
    } catch (error) {
      toast.error(t('toast.settle_error'))
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Stack p={2} width={1}>
        <Breadcrumbs
          title={t('breadcrumbs.management_date')}
          routes={[
            { title: t('breadcrumbs.management'), path: paths.management.settlement.date },
            { title: t('breadcrumbs.management_payment'), path: paths.management.settlement.date },
            { title: t('breadcrumbs.management_date') },
          ]}
        />

        <Stack spacing={1}>
          <TextField
            inputMode="numeric"
            type="number"
            size="small"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button color="secondary" onClick={submitHandler}>
            {t('button.settle')}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}
