import { m } from '@e201/utils'
import paths from '@/configs/paths'
import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'
import { Navigate } from 'react-router-dom'

import { Stack } from '@mui/material'

import { Typography } from '@e201/ui'

export function Header() {
  const { t } = useTranslate()

  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to={paths.signIn} />
  }

  return (
    <Stack width={1} bgcolor="primary.main">
      <Stack p={2} spacing={0.3}>
        <Typography ellipsis variant="subtitle2" color="common.white">
          {m(t('header.user'), [user.employeeName])}
        </Typography>
        <Typography ellipsis variant="caption" color="common.white">
          {t('header.greeting')}
        </Typography>
      </Stack>
    </Stack>
  )
}
