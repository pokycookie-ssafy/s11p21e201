import type { ContainerProps } from '@mui/material'

import { Container as MuiContainer } from '@mui/material'

interface IProps extends ContainerProps {
  children: React.ReactNode
}

export function Container({ children, ...others }: IProps) {
  return (
    <MuiContainer disableGutters sx={{ p: 8, pt: 15 }} maxWidth="md" {...others}>
      {children}
    </MuiContainer>
  )
}
