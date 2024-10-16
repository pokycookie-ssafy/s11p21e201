import type { TextFieldProps } from '@mui/material'
import type { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

interface IControl<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  rules?: Omit<RegisterOptions<T>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

type TProps<T extends FieldValues> = TextFieldProps & IControl<T>

export function FormInput<T extends FieldValues>({ control, name, rules, ...others }: TProps<T>) {
  const { field, fieldState } = useController({ name, control, rules })

  return (
    <TextField
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      inputRef={field.ref}
      size={others.size || 'small'}
      fullWidth={others.fullWidth || true}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      {...others}
    >
      {others.children}
    </TextField>
  )
}
