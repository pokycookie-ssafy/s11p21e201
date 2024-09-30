import { useTranslate } from '@/locales'

import { Stack, Dialog, Button } from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

interface IProps {
  open: boolean
  onClose: () => void
  title?: string
  content?: string
  icon?: boolean
  onSubmit?: () => void
}

export function DialogDelete({ open, onClose, icon, title, content, onSubmit }: IProps) {
  const { t } = useTranslate('dialog')

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Stack p={3} spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {icon && <Iconify icon="ion:warning" width={30} />}
          <Typography variant="h6" fontSize={18} fontWeight={800}>
            {title ?? t('title.delete')}
          </Typography>
        </Stack>

        <Typography fontWeight={400} fontSize={15}>
          {content ?? t('content.delete')}
        </Typography>

        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1} pt={1}>
          <Button color="error" onClick={onSubmit}>
            {t('button.delete')}
          </Button>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            {t('button.cancel')}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}
