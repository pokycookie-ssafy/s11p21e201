import paths from '@/configs/paths'
import { ModeButton } from '@/components/setting-button'

import { Stack, IconButton } from '@mui/material'

import { Link, Iconify } from '@e201/ui'

export default function PaymentHeader() {
  return (
    <Stack
      component="header"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1}
      width={1}
      spacing={4}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Link to={paths.main}>
        <IconButton>
          <Iconify icon="solar:arrow-left-linear" width={25} />
        </IconButton>
      </Link>
      <Stack direction="row" justifyContent="flex-end">
        <ModeButton />
      </Stack>
    </Stack>
  )
}
