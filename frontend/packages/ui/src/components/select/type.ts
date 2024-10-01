interface ISelectOption {
  label: string
  value: string
}

interface SelectProps {
  value: ISelectOption | null
  options: ISelectOption[]
  onChange?: (selected: ISelectOption | null) => void
}

interface ISelectCreatableProps {
  options: ISelectOption[]
  label?: string
  onChange?: (selected: ISelectOption | null) => void
}

export type { SelectProps, ISelectOption, ISelectCreatableProps }
