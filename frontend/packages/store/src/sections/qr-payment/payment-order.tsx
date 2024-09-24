import type { IOrder } from '@/pages/payment/qr-payment-view'

import { useMemo } from 'react'
import { fNumber } from '@e201/utils'

import { Box, Stack, Button, Divider } from '@mui/material'

import { ScrollContainer } from '@e201/ui'

import PaymentOrderList from './payment-order-list'

interface IProps {
  orders: IOrder[]
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onDelete: (id: string) => void
  onSubmit: () => void
}

export default function PaymentOrder({
  orders,
  onIncrease,
  onDecrease,
  onDelete,
  onSubmit,
}: IProps) {
  const totalPrice = useMemo(
    () => orders.reduce((acc, curr) => acc + curr.menu.price * curr.count, 0),
    [orders]
  )

  return (
    <Stack
      width={300}
      height={1}
      flexShrink={0}
      sx={{ borderLeft: (theme) => `1px solid ${theme.palette.divider}` }}
      bgcolor="background.default"
    >
      <ScrollContainer sx={{ flex: 1 }}>
        <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          {orders.map((order) => (
            <PaymentOrderList
              order={order}
              key={order.menu.id}
              onIncrease={() => onIncrease(order.menu.id)}
              onDecrease={() => onDecrease(order.menu.id)}
              onDelete={() => onDelete(order.menu.id)}
            />
          ))}
        </Stack>
      </ScrollContainer>

      <Box p={1}>
        <Button
          fullWidth
          color="secondary"
          size="large"
          disabled={totalPrice === 0}
          onClick={onSubmit}
        >
          {totalPrice > 0 ? `${fNumber(totalPrice)}원 결제` : '상품을 선택해주세요'}
        </Button>
      </Box>
    </Stack>
  )
}
