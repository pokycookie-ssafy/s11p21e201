import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { SelectCreatable } from '@/components/select'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { Box, Stack, Dialog, Button, TextField } from '@mui/material'

interface IProps {
  open: boolean
  onClose: () => void
  categories: string[]
  onSubmit?: () => void
}

export default function NewMenuModal({ open, onClose, categories, onSubmit }: IProps) {
  const { t } = useTranslate('menu-management')

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box p={3}>
        <Breadcrumbs
          title={t('breadcrumbs.create_menu')}
          routes={[
            { title: t('breadcrumbs.management'), path: paths.management.menu },
            { title: t('breadcrumbs.menu_management'), path: paths.management.menu },
            { title: t('breadcrumbs.create_menu') },
          ]}
        />
        <Stack spacing={2}>
          <TextField label={t('label.menu_name')} size="small" />
          <SelectCreatable
            label={t('label.category')}
            size="small"
            options={categories.map((category) => ({ label: category, value: category }))}
          />
          <TextField label={t('label.price')} size="small" />
          <Button size="large" color="secondary">
            {t('button.create_menu')}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  )
}
