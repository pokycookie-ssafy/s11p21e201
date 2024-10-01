import { useMemo } from 'react'
import { Box, alpha, darken, useTheme } from '@mui/material'

import { Typography } from '../typography'

import type { ILabelProps } from './types'

export function Label({ children, status }: ILabelProps) {
  const theme = useTheme()

  const color = useMemo(() => {
    if (status === 'success') {
      return theme.palette.success.main
    }
    if (status === 'warning') {
      return theme.palette.warning.main
    }
    if (status === 'error') {
      return theme.palette.error.main
    }
    return theme.palette.primary.main
  }, [status, theme.palette])

  const childrenNode = useMemo(() => {
    if (!children) {
      return null
    }
    if (typeof children === 'string') {
      return (
        <Typography ellipsis variant="subtitle2" fontSize={13} color={darken(color, 0.3)}>
          {children}
        </Typography>
      )
    }
    return children
  }, [children, color])

  return (
    <Box sx={{ px: 1, py: 0.3, borderRadius: 1, bgcolor: alpha(color, 0.2), userSelect: 'none' }}>
      {childrenNode}
    </Box>
  )
}
