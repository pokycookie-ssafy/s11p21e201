import paths from '@/configs/paths'
import { ModeButton, LocaleButton } from '@/components/setting-button'

import { Stack, AppBar, Toolbar, Typography } from '@mui/material'

import { Link } from '@e201/ui'

export function Header() {
  return (
    <AppBar position="static" sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1}>
          <Link to={paths.root}>
            <Typography variant="h5" color="white">
              S11P2E201
            </Typography>
          </Link>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <ModeButton />
          <LocaleButton />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
