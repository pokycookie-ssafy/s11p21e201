import { useMemo } from 'react'
import { useThemeStore } from '@/stores'

import { IconButton } from '@mui/material'

import { Iconify } from '@e201/ui'

export function ModeButton() {
  const { mode, toggle } = useThemeStore()

  const icon = useMemo(() => {
    if (mode === 'light') {
      return 'solar:sun-bold'
    }
    return 'solar:moon-bold'
  }, [mode])

  return (
    <IconButton onClick={toggle} sx={{ color: 'white' }}>
      <Iconify icon={icon} />
    </IconButton>
  )
}
