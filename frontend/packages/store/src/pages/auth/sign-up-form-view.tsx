import { useTranslate } from '@/locales'

import { Stack, TextField, Typography } from '@mui/material'

export default function SignUpFormView() {
  const { t } = useTranslate('login')

  return (
    <Stack spacing={4}>
      <Stack spacing={1} width="100%" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ pl: 1 }}>
          {t('회원정보')}
        </Typography>
        <TextField fullWidth label={t('label.email')} size="small" />
        <TextField fullWidth label={t('label.password')} size="small" type="password" />
        <TextField fullWidth label={t('label.password_check')} size="small" type="password" />
        <TextField fullWidth label={t('label.phone')} size="small" type="password" />
      </Stack>

      <Stack spacing={1} width="100%" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ pl: 1 }}>
          {t('계좌정보')}
        </Typography>
        <TextField fullWidth label={t('label.bankCode')} size="small" />
        <TextField fullWidth label={t('label.bankName')} size="small" type="password" />
        <TextField fullWidth label={t('label.account')} size="small" type="password" />
      </Stack>

      <Stack spacing={1} width="100%" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ pl: 1 }}>
          {t('사업자등록증')}
        </Typography>
      </Stack>
    </Stack>
  )
}
