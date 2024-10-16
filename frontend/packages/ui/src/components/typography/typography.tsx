import type { Theme, SxProps, TypographyProps } from '@mui/material'

import { useMemo } from 'react'
import { Typography as MuiTypography } from '@mui/material'

interface IProps extends TypographyProps {
  ellipsis?: boolean
}

export function Typography({ children, ellipsis, ...others }: IProps) {
  const ellipsisSx = useMemo<SxProps<Theme> | undefined>(() => {
    if (!ellipsis) {
      return undefined
    }
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }
  }, [ellipsis])

  return (
    <MuiTypography sx={{ ...ellipsisSx }} {...others}>
      {children}
    </MuiTypography>
  )
}
