import type { IOrder } from '@/pages/payment/qr-payment-view'

import { fNumber } from '@e201/utils'

import { Box, Stack, Divider, IconButton } from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

interface IProps {
  order: IOrder
  onIncrease: () => void
  onDecrease: () => void
  onDelete: () => void
}

export default function PaymentOrderList({ order, onIncrease, onDecrease, onDelete }: IProps) {
  return (
    <Stack p={2} spacing={1}>
      <Stack
        component="li"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle1">{order.menu.name}</Typography>
          <Iconify icon="iconoir:xmark" width={15} />
          <Typography variant="subtitle1">{order.count}</Typography>
        </Stack>
        <Stack>
          <Typography variant="subtitle1" color="secondary.main">
            {fNumber(order.menu.price * order.count)}원
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Typography variant="caption">({fNumber(order.menu.price)}</Typography>
            <Iconify icon="iconoir:xmark" width={10} />
            <Typography variant="caption">{order.count})</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          overflow="hidden"
          border={(theme) => `1px solid ${theme.palette.divider}`}
          borderRadius={1}
          divider={<Divider orientation="vertical" />}
        >
          <IconButton sx={{ borderRadius: 0 }} onClick={onDecrease}>
            <Iconify icon="tabler:minus" />
          </IconButton>
          <Box width={36}>
            <Typography variant="subtitle2" textAlign="center">
              {order.count}
            </Typography>
          </Box>
          <IconButton sx={{ borderRadius: 0 }} onClick={onIncrease}>
            <Iconify icon="tabler:plus" />
          </IconButton>
        </Stack>

        <IconButton sx={{ borderRadius: 1 }} color="error" onClick={onDelete}>
          <Iconify icon="solar:trash-bin-2-linear" />
        </IconButton>
      </Stack>
    </Stack>
  )
}
