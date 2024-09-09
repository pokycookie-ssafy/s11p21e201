import type { Theme, SxProps } from '@mui/material'

import { Link as MuiLink } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface IProps {
  children: React.ReactNode
  to: string
  sx?: SxProps<Theme>
}

export function Link({ children, to, sx }: IProps) {
  return (
    <MuiLink component={RouterLink} to={to} underline="hover" sx={sx}>
      {children}
    </MuiLink>
  )
}
