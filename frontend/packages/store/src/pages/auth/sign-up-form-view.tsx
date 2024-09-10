import { useTranslate } from '@/locales'

import { Stack, Button, useTheme, TextField, Typography, useMediaQuery } from '@mui/material'

import { Upload } from '@e201/ui'

interface IProps {
  onNext: () => void
}

export default function SignUpFormView({ onNext }: IProps) {
  const { t } = useTranslate('sign-up')

  const { breakpoints } = useTheme()
  const stackDirection = useMediaQuery(breakpoints.up('md')) ? 'row' : 'column'

  const submitHandler = () => {
    onNext()
  }

  return (
    <Stack spacing={4}>
      <Stack spacing={4} direction={stackDirection}>
        <Stack spacing={1} width={1} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ pl: 1, pb: 1 }}>
            {t('회원정보')}
          </Typography>
          <TextField fullWidth label={t('form.email')} size="small" />
          <TextField fullWidth label={t('form.password')} size="small" type="password" />
          <TextField fullWidth label={t('form.password_confirm')} size="small" type="password" />
          <TextField fullWidth label={t('form.phone')} size="small" type="tel" />
        </Stack>

        <Stack spacing={1} width={1} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ pl: 1, pb: 1 }}>
            {t('계좌정보')}
          </Typography>
          <TextField fullWidth label={t('form.bank')} size="small" />
          <TextField fullWidth label={t('form.account')} size="small" />
        </Stack>
      </Stack>

      <Stack spacing={1} width={1} sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ pl: 1, pb: 1 }}>
          {t('사업자등록증')}
        </Typography>
        <Upload />
      </Stack>

      <Button onClick={submitHandler}>{t('button.next')}</Button>
    </Stack>
  )
}
