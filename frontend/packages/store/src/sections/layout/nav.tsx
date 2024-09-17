import type { INavItem } from '@/configs/nav'

import nav from '@/configs/nav'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useBoolean } from '@e201/utils'
import tossLogo from '@/assets/img/toss-logo.jpg'

import { Box, Stack, Button, Collapse, Typography } from '@mui/material'

import { Link, Iconify, ScrollContainer } from '@e201/ui'

export default function Nav() {
  const { t } = useTranslate('nav')

  return (
    <ScrollContainer
      sx={{
        width: 300,
        height: '100vh',
        flexShrink: 0,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack
        mb={2}
        top={0}
        width={1}
        height={76}
        position="sticky"
        zIndex={1}
        justifyContent="center"
        sx={{ bgcolor: (theme) => theme.palette.background.default }}
      >
        <Link
          to={paths.main}
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
      <Stack component="nav" p={1} spacing={3}>
        {nav.map((group, i1) => (
          <Stack key={i1} spacing={0.5} sx={{ color: (theme) => theme.palette.text.secondary }}>
            <Typography variant="subtitle1" pl={2} pb={1}>
              {t(group.title)}
            </Typography>
            {group.group.map((item, i2) => (
              <NavItem key={i2} item={item} />
            ))}
          </Stack>
        ))}
      </Stack>
    </ScrollContainer>
  )
}

interface IProps {
  item: INavItem
  depth?: number
}

function NavItem({ item, depth = 0 }: IProps) {
  const { t } = useTranslate('nav')

  const open = useBoolean()

  const clickHandler = () => {
    if (item.group) {
      open.toggle()
    }
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        {depth > 0 ? (
          <Box sx={{ width: 10, borderBottom: (theme) => `2px solid ${theme.palette.divider}` }} />
        ) : null}
        <Button
          variant="soft"
          sx={{ justifyContent: 'flex-start', height: 44, width: 1 }}
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
                <NavItem key={i} item={e} depth={depth + 1} />
              ))}
            </Stack>
          </Stack>
        </Collapse>
      )}
    </Box>
  )
}
