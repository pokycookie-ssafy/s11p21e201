import { useTranslate } from '@/locales'

import { Box, Stack, Button, Checkbox } from '@mui/material'

import { Typography } from '@e201/ui'

export default function ChangeLanguage() {
  const { t, currentLang, changeLang } = useTranslate()

  return (
    <Stack p={2}>
      <Box p={1} mb={2}>
        <Typography variant="h4">{t('language.title')}</Typography>
      </Box>
      <Stack>
        <Button sx={{ p: 1 }} variant="soft" onClick={() => changeLang('ko')}>
          <Stack width={1} direction="row" justifyContent="space-between" alignItems="center">
            <Typography>{t('language.ko')}</Typography>
            <Checkbox checked={currentLang.value === 'ko'} />
          </Stack>
        </Button>

        <Button sx={{ p: 1 }} variant="soft" onClick={() => changeLang('en')}>
          <Stack width={1} direction="row" justifyContent="space-between" alignItems="center">
            <Typography>{t('language.en')}</Typography>
            <Checkbox checked={currentLang.value === 'en'} />
          </Stack>
        </Button>
      </Stack>
    </Stack>
  )
}
