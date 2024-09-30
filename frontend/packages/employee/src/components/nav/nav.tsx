import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { Link, useLocation } from 'react-router-dom'

import { Tab, Tabs, Stack, Typography } from '@mui/material'

import { Iconify } from '@e201/ui'

export function Nav() {
  const { t } = useTranslate('common')

  const location = useLocation()
  const currentPath = location.pathname

  const navLinks = [
    { label: t('auth.changePw'), icon: 'mdi:password-reset', path: paths.auth.changePw },
    { label: t('main.title'), icon: 'iconamoon:home', path: paths.root },
    { label: t('account.title'), icon: 'ant-design:account-book-outlined', path: paths.payments },
  ]

  const currentTab = navLinks.findIndex((link) => link.path === currentPath)

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        width: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 80,
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 15,
      }}
    >
      <Tabs
        value={currentTab}
        sx={{
          width: '100%',
        }}
      >
        {navLinks.map((link, index) => (
          <Tab
            key={link.path}
            component={Link}
            to={link.path}
            label={
              <Stack sx={{ height: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                <Iconify icon={link.icon} width="48" height="48" />
                <Typography>{link.label}</Typography>
              </Stack>
            }
            sx={{ flex: 1, minWidth: 0, padding: 0 }}
            onTouchStart={(e) => {
              e.currentTarget.click()
            }}
          />
        ))}
      </Tabs>
    </Stack>
  )
}
