import paths from '@/configs/paths'
import { useTranslate } from '@/locales'

import { Stack, Dialog, Button, TextField } from '@mui/material'

import { Breadcrumbs } from '@e201/ui'

interface IProps {
  open: boolean
  onClose: () => void
}

export default function SettleModal({ open, onClose }: IProps) {
  const { t } = useTranslate('settlement')

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Stack p={2} width={1}>
        <Breadcrumbs
          title={t('breadcrumbs.management_date')}
          routes={[
            { title: t('breadcrumbs.management'), path: paths.management.settlement.root },
            { title: t('breadcrumbs.management_payment'), path: paths.management.settlement.root },
            { title: t('breadcrumbs.management_date') },
          ]}
        />

        <Stack spacing={1}>
          <TextField inputMode="numeric" type="number" size="small" />
          <Button color="secondary">{t('button.settle')}</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}
