import { m } from '@e201/utils'
import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'

import { Stack } from '@mui/material'

import { Typography } from '@e201/ui'

export function Header() {
  const { t } = useTranslate()

  const { user } = useAuthStore()

  return (
    <Stack width={1} bgcolor="primary.main" boxShadow="0px 2px 10px 2px rgba(0, 0, 0, 0.2)">
      <Stack p={2} spacing={0.3}>
        <Typography ellipsis variant="subtitle1" color="common.white">
          {m(t('header.user'), [user?.employeeName])}
        </Typography>
        <Typography ellipsis variant="caption" color="common.white">
          {t('header.greeting')}
        </Typography>
      </Stack>
    </Stack>
  )
}
