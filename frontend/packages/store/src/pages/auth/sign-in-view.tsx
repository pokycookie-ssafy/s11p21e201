import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import cover from '@/assets/img/background.png'

import { Stack, Button, TextField, Typography } from '@mui/material'

import { Link, FullContainer } from '@e201/ui'

export default function SignInView() {
  const { t } = useTranslate('sign-in')

  return (
    <FullContainer
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${cover})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Stack
        alignItems="center"
        sx={{
          minWidth: 400,
          p: 4,
          backdropFilter: 'blur(10px)',
          bgcolor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 4 }}>
          {t('title')}
        </Typography>

        <Stack spacing={1} width={1} sx={{ mb: 2 }}>
          <TextField fullWidth label={t('label.email')} size="small" />
          <TextField fullWidth label={t('label.password')} size="small" type="password" />
        </Stack>

        <Stack spacing={1} width={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Link to={paths.signUp}>
              <Typography variant="subtitle2">{t('button.sign_up')}</Typography>
            </Link>
            <Link to={paths.signUp}>
              <Typography variant="subtitle2">{t('button.forgot_account')}</Typography>
            </Link>
          </Stack>

          <Button>{t('button.sign_in')}</Button>
        </Stack>
      </Stack>
    </FullContainer>
  )
}
