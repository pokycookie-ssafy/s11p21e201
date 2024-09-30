import type { SyntheticEvent } from 'react'
import type { TextFieldProps } from '@mui/material'

import { TextField, Autocomplete } from '@mui/material'

import { Typography } from '../typography'

import type { SelectProps, ISelectOption } from './type'

type TProps = Omit<TextFieldProps, 'onChange'> & SelectProps

export function Select({ value, options, onChange, ...others }: TProps) {
  const changeHandler = (e: SyntheticEvent<Element, Event>, v: string | ISelectOption | null) => {
    if (!onChange) {
      return
    }
    if (typeof v === 'string') {
      onChange({ label: v, value: v })
      return
    }
    onChange(v)
  }

  return (
    <Autocomplete
      fullWidth
      value={value}
      options={options}
      onChange={changeHandler}
      renderInput={(params) => <TextField {...params} {...others} />}
      renderOption={({ key, ...props }, option) => (
        <Typography variant="subtitle2" fontWeight={500} key={key} {...props}>
          {option.label}
        </Typography>
      )}
    />
  )
}
