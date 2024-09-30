import type { INavItem } from '@/configs/nav'
import type { Theme, SxProps } from '@mui/material'

import nav from '@/configs/nav'
import { useMemo } from 'react'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useBoolean } from '@/hooks/use-boolean'
import tossLogo from '@/assets/img/toss-logo.jpg'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  Box,
  Stack,
  alpha,
  Button,
  Collapse,
  useTheme,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { Link, Iconify, ScrollContainer } from '@e201/ui'

interface IProps {
  drawer?: boolean
}

export default function Nav({ drawer }: IProps) {
  const { t } = useTranslate('nav')

  const location = useLocation()

  const logoutHandler = () => {
    // logout
  }

  const { breakpoints } = useTheme()
  const invisible = useMediaQuery(breakpoints.down('md')) && !drawer

  return (
    <Stack
      sx={{
        width: 300,
        height: '100vh',
        flexShrink: 0,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        display: invisible ? 'none' : 'flex',
      }}
    >
      <NavLogo />
      <ScrollContainer sx={{ flex: 1, bgcolor: (theme) => theme.palette.background.default }}>
        <Stack component="nav" py={1} px={2} spacing={3}>
          {nav.map((group, i1) => (
            <Stack key={i1} spacing={0.5} sx={{ color: (theme) => theme.palette.text.secondary }}>
              <Typography variant="subtitle1" pl={2} pb={1}>
                {t(group.title)}
              </Typography>
              {group.group.map((item, i2) => (
                <NavItem key={i2} item={item} path={location.pathname} />
              ))}
            </Stack>
          ))}
          <Button variant="contained" color="error" onClick={logoutHandler}>
            {t('logout')}
          </Button>
        </Stack>
      </ScrollContainer>
    </Stack>
  )
}

function NavLogo() {
  return (
    <Stack
      height={76}
      direction="row"
      alignItems="center"
      sx={{ bgcolor: (theme) => theme.palette.background.default }}
    >
      <Link
        to={paths.root}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          alt="logo"
          src={tossLogo}
          sx={{
            height: 60,
            objectFit: 'cover',
          }}
        />
      </Link>
    </Stack>
  )
}

interface INavItemProps {
  item: INavItem
  depth?: number
  path: string
}

function NavItem({ item, depth = 0, path }: INavItemProps) {
  const { t } = useTranslate('nav')

  const navigate = useNavigate()

  const open = useBoolean()

  const clickHandler = () => {
    if (item.group) {
      open.toggle()
      return
    }
    navigate(item.path)
  }

  const buttonSx = useMemo<SxProps<Theme> | undefined>(() => {
    if (path.startsWith(item.path)) {
      return {
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
        color: (theme) => theme.palette.primary.main,
        ':hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
        },
      }
    }
    open.onFalse()
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.path, path])

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        {depth > 0 ? (
          <Box sx={{ width: 10, borderBottom: (theme) => `2px solid ${theme.palette.divider}` }} />
        ) : null}
        <Button
          variant="soft"
          sx={{
            justifyContent: 'flex-start',
            height: 44,
            width: 1,
            ...buttonSx,
          }}
          onClick={clickHandler}
        >
          <Stack width={1} direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
              {item.icon && <Iconify icon={item.icon} width={25} />}
              <Typography variant="subtitle2">{t(item.title)}</Typography>
            </Stack>
            {item.group && (
              <Iconify icon={open.value ? 'mingcute:down-line' : 'mingcute:right-line'} />
            )}
          </Stack>
        </Button>
      </Stack>
      {item.group && (
        <Collapse in={open.value} sx={{ mt: open.value ? 0.5 : 0, transition: 'all' }}>
          <Stack direction="row" width={1} height="calc(100% - 21px)" pl={3}>
            <Box sx={{ height: 1, borderLeft: (theme) => `2px solid ${theme.palette.divider}` }} />
            <Stack width={1} spacing={0.5} sx={{ color: (theme) => theme.palette.text.secondary }}>
              {item.group.map((e, i) => (
                <NavItem key={i} item={e} depth={depth + 1} path={path} />
              ))}
            </Stack>
          </Stack>
        </Collapse>
      )}
    </Box>
  )
}
