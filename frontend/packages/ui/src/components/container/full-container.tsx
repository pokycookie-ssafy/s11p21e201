import type { Theme, SxProps } from '@mui/material'

import { Box } from '@mui/material'

interface IProps {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export function FullContainer({ children, sx }: IProps) {
  return (
    <Box sx={{ width: 'calc(100vw - (100vw - 100%))', height: '100vh', ...sx }}>{children}</Box>
  )
}
