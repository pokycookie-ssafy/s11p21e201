import paths from '@/configs/paths'
import { useTranslate } from '@/locales'

import { Stack, Button, TextField, Typography } from '@mui/material'

import { Link } from '@e201/ui'

export default function SignInView() {
  const { t } = useTranslate('sign-in')

  return (
    <Stack alignItems="center" sx={{ minWidth: 400 }}>
      <Typography variant="h6" sx={{ mb: 4 }}>
        {t('title')}
      </Typography>

      <Stack spacing={2} width={1} sx={{ mb: 2 }}>
        <TextField
          InputLabelProps={{ shrink: true }}
          fullWidth
          label={t('label.email')}
          size="small"
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          fullWidth
          label={t('label.password')}
          size="small"
          type="password"
        />
      </Stack>

      <Stack spacing={1} width={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Link to={paths.auth.signUp}>
            <Typography variant="subtitle2">{t('button.sign_up')}</Typography>
          </Link>
          <Link to={paths.auth.signUp}>
            <Typography variant="subtitle2">{t('button.forgot_account')}</Typography>
          </Link>
        </Stack>

        <Button>{t('button.sign_in')}</Button>
      </Stack>
    </Stack>
  )
}
