import type { MouseEvent } from 'react'
import type { TFunction } from 'i18next'

import { m } from '@e201/utils'
import { useRef, useState } from 'react'
import { Stack, Button, Popover, IconButton } from '@mui/material'

import { Iconify } from '../iconify'
import { Typography } from '../typography'
import { ScrollContainer } from '../scrollbar'

interface IProps {
  year: number
  month: number
  t: TFunction<string, undefined>
  onChange?: (year: number, month: number) => void
}

export function SelectDate({ month, year, t, onChange }: IProps) {
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const NOW = new Date().getFullYear()
  const YEAR_START = NOW - 100
  const YEAR_END = NOW
  const MONTH_START = 1
  const MONTH_END = 12

  const monthArr = Array.from({ length: MONTH_END - MONTH_START + 1 }, (_, i) => MONTH_START + i)
  const yearArr = Array.from({ length: YEAR_END - YEAR_START }, (_, i) => YEAR_END - i)

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorRef.current)
  }

  const closeHandler = () => {
    setAnchorEl(null)
  }

  const yearHandler = (value: number) => {
    if (onChange) {
      onChange(value, month)
    }
  }

  const monthHandler = (value: number) => {
    if (onChange) {
      onChange(year, value)
    }
  }

  const increase = () => {
    if (!onChange) {
      return
    }
    if (month === 12) {
      onChange(year + 1, 1)
      return
    }
    onChange(year, month + 1)
  }

  const decrease = () => {
    if (!onChange) {
      return
    }
    if (month === 1) {
      onChange(year - 1, 12)
      return
    }
    onChange(year, month - 1)
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
          <Typography variant="subtitle2" width={85} textAlign="center" sx={{ cursor: 'pointer' }}>
            {m(t('unit.date'), [year, month])}
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
        <Stack direction="row">
          <ScrollContainer sx={{ width: 100, maxHeight: 200 }}>
            <Stack spacing={0.5} p={0.5}>
              {yearArr.map((e) => (
                <Button key={e} variant="soft" onClick={() => yearHandler(e)}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {e}년
                  </Typography>
                </Button>
              ))}
            </Stack>
          </ScrollContainer>

          <ScrollContainer sx={{ width: 72, maxHeight: 200 }}>
            <Stack spacing={0.5} p={0.5}>
              {monthArr.map((e) => (
                <Button key={e} variant="soft" onClick={() => monthHandler(e)}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {e}월
                  </Typography>
                </Button>
              ))}
            </Stack>
          </ScrollContainer>
        </Stack>
      </Popover>
    </>
  )
}
