import { useTranslate } from '@/locales'

import { Box, Stack, Button, Typography } from '@mui/material'

export default function LocalView() {
  const { t, changeLang } = useTranslate()
  const { t: sub } = useTranslate('sub')
  const { t: paths } = useTranslate('paths')

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Button onClick={() => changeLang('ko')}>KO</Button>
        <Button onClick={() => changeLang('en')}>EN</Button>
      </Stack>
      <Typography>{t('test')}</Typography>
      <Typography>{sub('sub')}</Typography>
      <Typography>{paths('components.toast')}</Typography>
    </Box>
  )
}
