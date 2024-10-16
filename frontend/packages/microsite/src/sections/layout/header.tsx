import tossLogo from '@/assets/img/toss-logo.jpg'
import whiteLogo from '@/assets/img/logo-white.png'
import { ModeButton, LocaleButton } from '@/components/setting-button'

import { Box, alpha, Stack, useTheme } from '@mui/material'

import { Link } from '@e201/ui'

interface IProps {
  logo?: boolean
}

export default function Header({ logo }: IProps) {
  const { palette } = useTheme()

  // const { breakpoints } = useTheme()
  // const visible = useMediaQuery(breakpoints.down('md'))

  return (
    <Stack
      component="header"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      sx={{
        bgcolor: (theme) => alpha(theme.palette.background.default, 0.7),
        backdropFilter: 'blur(4px)',
        width: '100%',
        zIndex: 2,
        px: 1,
        py: 1,
      }}
    >
      <Link to="/" sx={{ display: 'flex', alignItems: 'center' }}>
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

      <Stack direction="row" justifyContent="flex-end">
        <ModeButton />
        <LocaleButton />
      </Stack>
    </Stack>
  )
}
