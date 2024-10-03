import type { NavValue } from '@/configs/nav'

import paths from '@/configs/paths'
import { navs } from '@/configs/nav'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Tab, Box, Tabs, Stack } from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

export function Nav() {
  const { t } = useTranslate()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [tab, setTab] = useState<NavValue>('main')

  useEffect(() => {
    if (pathname === paths.main) {
      setTab('main')
      return
    }
    if (pathname === paths.payments) {
      setTab('payments')
      return
    }
    if (pathname === paths.setting) {
      setTab('setting')
    }
  }, [pathname])

  return (
    <Box width={1} zIndex={10} boxShadow="0px -2px 10px 0px rgba(0, 0, 0, 0.1)">
      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
        {navs.map((nav, i) => (
          <Tab
            key={i}
            value={nav.value}
            label={
              <Stack alignItems="center" spacing={0.5}>
                <Iconify icon={nav.icon} />
                <Typography ellipsis variant="caption">
                  {t(nav.label)}
                </Typography>
              </Stack>
            }
            onClick={() => navigate(nav.path)}
          />
        ))}
      </Tabs>
    </Box>
  )
}
