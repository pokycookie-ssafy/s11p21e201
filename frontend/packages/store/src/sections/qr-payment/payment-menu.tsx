import type { IMenu } from '@/types/menu'

import { useMemo } from 'react'
import { fNumber } from '@e201/utils'
import { useTranslate } from '@/locales'

import { Grid, Stack, Button, useTheme, useMediaQuery } from '@mui/material'

import { Typography } from '@e201/ui'

interface IProps {
  menus: IMenu[]
  onClick: (menu: IMenu) => void
}

export default function PaymentMenu({ menus, onClick }: IProps) {
  const { t } = useTranslate('qr-payment')

  const { breakpoints } = useTheme()

  const lg = useMediaQuery(breakpoints.up('lg'))
  const md = useMediaQuery(breakpoints.up('md'))
  const sm = useMediaQuery(breakpoints.up('sm'))

  const gridXs = useMemo(() => {
    if (lg) {
      return 2
    }
    if (md) {
      return 3
    }
    if (sm) {
      return 6
    }
    return 12
  }, [lg, md, sm])

  return (
    <Grid container spacing={1} pr={1.5}>
      {menus.map((menu, i) => (
        <Grid item xs={gridXs} key={i}>
          <Button
            variant="contained"
            color="inherit"
            fullWidth
            sx={{
              px: 1.5,
              '@media (hover: hover)': {
                ':hover': {
                  bgcolor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.getContrastText(theme.palette.primary.main),
                },
              },
            }}
            onClick={() => onClick(menu)}
          >
            <Stack alignItems="flex-start" width={1} height={80}>
              <Typography variant="subtitle1" textAlign="left">
                {menu.name}
              </Typography>
              <Typography variant="subtitle2" fontWeight={500}>
                {fNumber(menu.price)}
                {t('unit.won')}
              </Typography>
            </Stack>
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}
