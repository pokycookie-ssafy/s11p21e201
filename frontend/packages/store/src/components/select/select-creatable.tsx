import type { TextFieldProps } from '@mui/material'

import { useState, useEffect } from 'react'

import { TextField, Autocomplete, createFilterOptions } from '@mui/material'

interface ISelectOption {
  label: string
  value: string
}

interface IProps {
  options: ISelectOption[]
  onChange?: (selected: ISelectOption | null) => void
}

type TProps = TextFieldProps & IProps

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
          filtered.push({ label: `ADD ${inputValue}`, value: inputValue })
        }
        return filtered
      }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="category" {...others} />}
    />
  )
}
