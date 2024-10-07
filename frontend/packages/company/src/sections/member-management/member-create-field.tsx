import { useState, useEffect } from 'react'

import { Stack, TextField } from '@mui/material'

interface IProps {
  value?: string
  onChange?: (value?: string) => void
  placeholder?: string
}

export default function MemberCreateField({ value, onChange, placeholder: placeholer }: IProps) {
  const [curr, setCurr] = useState<string | undefined>(undefined)

  const onBlur = () => {
    if (onChange) {
      onChange(curr)
    }
  }

  useEffect(() => {
    if (value !== curr) {
      setCurr(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Stack height={1} justifyContent="center">
      <TextField
        value={curr ?? ''}
        onChange={(e) => setCurr(e.target.value)}
        variant="standard"
        onBlur={onBlur}
        InputProps={{ disableUnderline: true }}
        inputProps={{ style: { fontSize: 14, fontWeight: 500 } }}
        placeholder={placeholer}
      />
    </Stack>
  )
}
