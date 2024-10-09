import paths from '@/configs/paths'
import { useBoolean } from '@/hooks/use-boolean'
import tossLogo from '@/assets/img/toss-logo.jpg'
import whiteLogo from '@/assets/img/logo-white.png'
import { ModeButton, LocaleButton } from '@/components/setting-button'

import {
  Box,
  alpha,
  Stack,
  useTheme,
  IconButton,
  useMediaQuery,
  SwipeableDrawer,
} from '@mui/material'

import { Link, Iconify } from '@e201/ui'

import Nav from './nav'

interface IProps {
  logo?: boolean
}

export default function Header({ logo }: IProps) {
  const { breakpoints, palette } = useTheme()
  const visible = useMediaQuery(breakpoints.down('md'))

  const drawer = useBoolean()

  return (
    <Stack
      component="header"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      position="sticky"
      sx={{
        bgcolor: (theme) => alpha(theme.palette.background.default, 0.7),
        backdropFilter: 'blur(4px)',
        width: 1,
        zIndex: 2,
        top: 0,
        px: 2,
        py: 1,
      }}
    >
      {logo ? (
        <Link to={paths.main} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            alt="logo"
            src={palette.mode === 'light' ? tossLogo : whiteLogo}
            sx={{
              width: 120,
              objectFit: 'cover',
            }}
          />
        </Link>
      ) : (
        <Stack direction="row" alignItems="center" height={60}>
          {visible && (
            <IconButton onClick={drawer.onTrue}>
              <Iconify icon="solar:hamburger-menu-linear" width={25} />
            </IconButton>
          )}
          <SwipeableDrawer open={drawer.value} onOpen={drawer.onTrue} onClose={drawer.onFalse}>
            <Nav drawer />
          </SwipeableDrawer>
        </Stack>
      )}
      <Stack direction="row" justifyContent="flex-end">
        <ModeButton />
        <LocaleButton />
      </Stack>
    </Stack>
  )
}
