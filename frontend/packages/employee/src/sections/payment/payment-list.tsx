import type { IPayment } from '@/types/payment'

import dayjs from 'dayjs'
import { useTranslate } from '@/locales'
import { fNumber, useBoolean } from '@e201/utils'

import { Box, Stack, Button, Divider, SwipeableDrawer } from '@mui/material'

import { Typography } from '@e201/ui'

interface IProps {
  payment: IPayment
}

export default function PaymentList({ payment }: IProps) {
  const { t } = useTranslate('payment')

  const drawer = useBoolean()

  return (
    <>
      <Button variant="soft" onClick={drawer.onTrue} sx={{ p: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" width={1}>
          <Stack alignContent="flex-start" textAlign="left" spacing={0.5}>
            <Typography fontSize={15} fontWeight={500}>
              {payment.storeName}
            </Typography>
            <Typography variant="caption" textAlign="left" color="text.secondary">
              {dayjs(payment.paymentDate).format('YYYY.MM.DD HH:mm')}
            </Typography>
          </Stack>

          <Typography color="primary.main" fontSize={14} fontWeight={500}>
            -{fNumber(payment.amount)}
            {t('unit.won')}
          </Typography>
        </Stack>
      </Button>

      <SwipeableDrawer
        open={drawer.value}
        onOpen={drawer.onTrue}
        onClose={drawer.onFalse}
        anchor="bottom"
        PaperProps={{
          style: { borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
        }}
        disableSwipeToOpen
      >
        <Box p={2}>
          <Stack spacing={0.5}>
            <Typography variant="subtitle1">{payment.storeName}</Typography>
            <Typography fontSize={24} fontWeight={800} color="primary.main">
              {fNumber(payment.amount)}
              {t('unit.won')}
            </Typography>
            <Typography variant="caption" fontWeight={500} textAlign="left" color="text.secondary">
              {dayjs(payment.paymentDate).format('YYYY.MM.DD HH:mm')}
            </Typography>
          </Stack>

          <Divider sx={{ py: 1, mb: 2 }} />

          <Stack spacing={1} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
            {payment.menus.map((menu, i) => (
              <Stack key={i} width={1} direction="row" justifyContent="space-between">
                <Stack>
                  <Typography variant="subtitle1">{menu.name}</Typography>
                  <Typography variant="caption">{menu.category}</Typography>
                </Stack>
                <Typography variant="subtitle1" color="primary.main">
                  {fNumber(menu.price)}
                  {t('unit.won')}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
