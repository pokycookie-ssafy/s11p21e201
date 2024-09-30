import type { ReactNode } from 'react'

type LabelType = 'success' | 'warning' | 'error'

interface ILabelProps {
  children?: ReactNode
  status?: LabelType
}

export type { ILabelProps }
