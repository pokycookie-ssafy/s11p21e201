import paths from '@/configs/paths'
import tossLogo from '@/assets/img/toss-logo.jpg'
import { ModeButton, LocaleButton } from '@/components/setting-button'

import { Box, alpha, Stack } from '@mui/material'

import { Link } from '@e201/ui'

interface IProps {
  logo?: boolean
}

export default function Header({ logo }: IProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
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
            src={tossLogo}
            sx={{
              width: 120,
              objectFit: 'cover',
            }}
          />
        </Link>
      ) : (
        <Box height={60} />
      )}
      <Stack direction="row" justifyContent="flex-end">
        <ModeButton />
        <LocaleButton />
      </Stack>
    </Stack>
  )
}
