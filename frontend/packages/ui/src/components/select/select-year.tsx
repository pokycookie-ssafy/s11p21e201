import type { MouseEvent } from 'react'
import type { TFunction } from 'i18next'

import { useRef, useState } from 'react'
import { Stack, Button, Popover, IconButton } from '@mui/material'

import { Iconify } from '../iconify'
import { Typography } from '../typography'
import { ScrollContainer } from '../scrollbar'

interface IProps {
  year: number
  onChange?: (year: number) => void
  t: TFunction<string, undefined>
}

const NOW = new Date().getFullYear()
const START = NOW - 100
const END = NOW

const years = Array.from({ length: END - START }, (_, i) => END - i)

export function SelectYear({ year, onChange, t }: IProps) {
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorRef.current)
  }

  const closeHandler = () => {
    setAnchorEl(null)
  }

  const increase = () => {
    if (onChange) {
      onChange(year + 1)
    }
  }

  const decrease = () => {
    if (onChange) {
      onChange(year - 1)
    }
  }

  const changeHandler = (y: number) => {
    if (onChange) {
      onChange(y)
    }
    closeHandler()
  }

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        p={0.5}
        sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 1 }}
        ref={anchorRef}
      >
        <IconButton onClick={decrease} sx={{ borderRadius: 1 }}>
          <Iconify icon="solar:alt-arrow-left-bold" width={15} />
        </IconButton>
        <IconButton sx={{ borderRadius: 1, height: 31 }} onClick={clickHandler}>
          <Typography variant="subtitle2" width={50} textAlign="center" sx={{ cursor: 'pointer' }}>
            {year}
            {t('unit.year')}
          </Typography>
        </IconButton>
        <IconButton onClick={increase} sx={{ borderRadius: 1 }}>
          <Iconify icon="solar:alt-arrow-right-bold" width={15} />
        </IconButton>
      </Stack>

      <Popover
        open={!!anchorEl}
        onClose={closeHandler}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ScrollContainer sx={{ width: 137, maxHeight: 200 }}>
          <Stack spacing={0.5} p={0.5}>
            {years.map((y) => (
              <Button key={y} variant="soft" onClick={() => changeHandler(y)}>
                <Typography variant="subtitle2" color="text.secondary">
                  {y}
                  {t('unit.year')}
                </Typography>
              </Button>
            ))}
          </Stack>
        </ScrollContainer>
      </Popover>
    </>
  )
}
