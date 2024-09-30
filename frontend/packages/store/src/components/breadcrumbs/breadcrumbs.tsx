import type { ReactNode } from 'react'
import type { Theme, SxProps } from '@mui/material'

import { Stack } from '@mui/material'

import { Link, Iconify, Typography } from '@e201/ui'

interface IPath {
  title: string
  path?: string
}

interface IProps {
  title: string
  routes: IPath[]
  sx?: SxProps<Theme>
  action?: ReactNode
}

export function Breadcrumbs({ title, routes, sx, action }: IProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 5, pl: 1, ...sx }}
    >
      <Stack spacing={1}>
        <Typography variant="h3" fontWeight={800}>
          {title}
        </Typography>
        <Stack direction="row" divider={<Iconify icon="ph:dot-bold" />}>
          {routes.map((route, i) =>
            route.path ? (
              <Link
                key={i}
                to={route.path}
                sx={{ ':hover': { textDecorationColor: (theme) => theme.palette.text.primary } }}
              >
                <Typography variant="subtitle2" fontWeight={400} color="text.primary">
                  {route.title}
                </Typography>
              </Link>
            ) : (
              <Typography variant="subtitle2" fontWeight={400} key={i}>
                {route.title}
              </Typography>
            )
          )}
        </Stack>
      </Stack>
      {action}
    </Stack>
  )
}
