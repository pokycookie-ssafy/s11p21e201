import api from '@/configs/api'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useBoolean } from '@e201/utils'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, useThemeStore } from '@/stores'
import ChangePassword from '@/sections/setting/change-password'
import ChangeLanguage from '@/sections/setting/change-language'

import { Box, Stack, Button, Switch, Divider, SwipeableDrawer } from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

export default function SettingView() {
  const { t } = useTranslate('setting')

  const { mode, toggle } = useThemeStore()

  const { logout } = useAuthStore()

  const navigate = useNavigate()

  const languageDrawer = useBoolean()
  const changePasswordDrawer = useBoolean()

  const logoutHandler = async () => {
    try {
      await axios.delete(api.logout)
      logout()
      navigate(paths.signIn)
    } catch (error) {
      logout()
      navigate(paths.signIn)
      console.log(error)
    }
  }

  return (
    <>
      <Box px={1} py={2}>
        <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          <Box sx={{ p: 1 }}>
            <Stack
              width={1}
              py={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{t('dark_mode')}</Typography>
              <Switch checked={mode === 'dark'} onChange={() => toggle()} />
            </Stack>
          </Box>

          <Button variant="soft" sx={{ p: 1 }} onClick={languageDrawer.onTrue}>
            <Stack
              width={1}
              py={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{t('language')}</Typography>
              <Iconify icon="solar:alt-arrow-right-linear" />
            </Stack>
          </Button>

          <Button variant="soft" sx={{ p: 1 }} onClick={changePasswordDrawer.onTrue}>
            <Stack
              width={1}
              py={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{t('change_password')}</Typography>
              <Iconify icon="solar:alt-arrow-right-linear" />
            </Stack>
          </Button>

          <Button variant="soft" sx={{ p: 1 }} onClick={logoutHandler}>
            <Stack
              width={1}
              py={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{t('logout')}</Typography>
              <Iconify icon="solar:alt-arrow-right-linear" />
            </Stack>
          </Button>
        </Stack>
      </Box>

      <SwipeableDrawer
        open={languageDrawer.value}
        onOpen={languageDrawer.onTrue}
        onClose={languageDrawer.onFalse}
        anchor="bottom"
        PaperProps={{
          style: { borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
        }}
        disableSwipeToOpen
      >
        <ChangeLanguage />
      </SwipeableDrawer>

      <SwipeableDrawer
        open={changePasswordDrawer.value}
        onOpen={changePasswordDrawer.onTrue}
        onClose={changePasswordDrawer.onFalse}
        anchor="bottom"
        PaperProps={{
          style: { borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
        }}
        disableSwipeToOpen
      >
        <ChangePassword open={changePasswordDrawer.value} onClose={changePasswordDrawer.onFalse} />
      </SwipeableDrawer>
    </>
  )
}
