import type { TextFieldProps } from '@mui/material'

import { useState, useEffect } from 'react'
import { TextField, Autocomplete, createFilterOptions } from '@mui/material'

import type { ISelectOption, ISelectCreatableProps } from './type'

type TProps = Omit<TextFieldProps, 'onChange'> & ISelectCreatableProps

const filter = createFilterOptions<ISelectOption>()

export function SelectCreatable({ options, onChange, ...others }: TProps) {
  const [value, setValue] = useState<ISelectOption | null>(null)

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [onChange, value])

  return (
    <Autocomplete
      fullWidth
      value={value}
      options={options}
      onChange={(_, v) => {
        if (typeof v === 'string') {
          setValue({ value: v, label: v })
          return
        }
        setValue(v)
      }}
      filterOptions={(filterOptions, params) => {
        const filtered = filter(filterOptions, params)
        const { inputValue } = params
        const isExisting = filterOptions.some((option) => inputValue === option.label)

        if (inputValue.trim() !== '' && !isExisting) {
          filtered.push({ label: `${inputValue}`, value: inputValue })
        }
        return filtered
      }}
      freeSolo
      renderInput={(params) => <TextField {...params} {...others} />}
    />
  )
}
