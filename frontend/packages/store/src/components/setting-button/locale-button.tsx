import type { MouseEvent } from 'react'
import type { LocaleLang } from '@/locales'

import { useState } from 'react'
import { langs } from '@/locales/langs'
import { useTranslate } from '@/locales'

import { Stack, Button, Popover, Typography } from '@mui/material'

import { Iconify } from '@e201/ui'

export function LocaleButton() {
  const { currentLang, changeLang } = useTranslate()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const closeHandler = () => {
    setAnchorEl(null)
  }

  const changeLangHandler = (lang: LocaleLang) => {
    changeLang(lang)
    setAnchorEl(null)
  }

  return (
    <>
      <Button variant="soft" onClick={clickHandler}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          <Iconify icon="material-symbols:language" />
          <Typography variant="subtitle2">{currentLang.label}</Typography>
        </Stack>
      </Button>
      <Popover
        open={!!anchorEl}
        onClose={closeHandler}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ mt: 1, color: (theme) => theme.palette.text.secondary }}
      >
        <Stack spacing={0.5} p={0.5}>
          {langs.map((lang) => (
            <Button key={lang.value} variant="soft" onClick={() => changeLangHandler(lang.value)}>
              {lang.label}
            </Button>
          ))}
        </Stack>
      </Popover>
    </>
  )
}
