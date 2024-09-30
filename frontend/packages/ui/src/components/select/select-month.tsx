import type { MouseEvent } from 'react'

import { useState } from 'react'
import { Stack, Button, Popover } from '@mui/material'

import { Iconify } from '../iconify'
import { Typography } from '../typography'
import { ScrollContainer } from '../scrollbar'

interface IProps {
  month: number
  onChange?: (month: number) => void
}

const START = 1
const END = 12

const years = Array.from({ length: END - START + 1 }, (_, i) => START + i)

export function SelectMonth({ month, onChange }: IProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const closeHandler = () => {
    setAnchorEl(null)
  }

  const changeHandler = (y: number) => {
    if (onChange) {
      onChange(y)
    }
    closeHandler()
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={clickHandler}
        sx={{
          p: 1,
          pl: 1.5,
          width: 80,
          flexShrink: 0,
          color: (theme) => theme.palette.text.secondary,
          borderColor: (theme) => theme.palette.text.disabled,
        }}
        color="inherit"
      >
        <Stack
          direction="row"
          width={1}
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle2" color="text.primary">
            {month}월
          </Typography>
          <Iconify icon="solar:alt-arrow-down-line-duotone" />
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
      >
        <ScrollContainer sx={{ width: 80, maxHeight: 200 }}>
          <Stack spacing={0.5} p={0.5}>
            {years.map((y) => (
              <Button key={y} variant="soft" onClick={() => changeHandler(y)}>
                <Typography variant="subtitle2" color="text.secondary">
                  {y}월
                </Typography>
              </Button>
            ))}
          </Stack>
        </ScrollContainer>
      </Popover>
    </>
  )
}
