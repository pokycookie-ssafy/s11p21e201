import type { IMenu } from '@/types/menu'

import { toast } from 'sonner'
import { useState } from 'react'
import { useBoolean } from '@e201/utils'
import PaymentQr from '@/sections/qr-payment/payment-qr'
import PaymentMenu from '@/sections/qr-payment/payment-menu'
import PaymentOrder from '@/sections/qr-payment/payment-order'

import { Tab, Tabs, Stack } from '@mui/material'

import { ScrollContainer } from '@e201/ui'

const mock: IMenu[] = [
  { name: '아메리카노', price: 4000, id: '1' },
  { name: '아이스 아메리카노', price: 4500, id: '2' },
  { name: '카페라떼', price: 5000, id: '3' },
  { name: '바닐라라떼', price: 5000, id: '4' },
  { name: '쑥라떼', price: 5000, id: '5' },
  { name: '마주스', price: 5000, id: '6' },
  { name: '오곡라떼', price: 5000, id: '7' },
  { name: '헤이즐넛라떼', price: 5000, id: '8' },
  { name: '시나몬라떼', price: 6000, id: '9' },
  { name: '루이보스티', price: 5000, id: '10' },
  { name: '페퍼민트티', price: 5000, id: '11' },
  { name: '검은콩스무디', price: 6000, id: '12' },
  { name: '애플스무디', price: 6000, id: '13' },
  { name: '자몽스무디', price: 6000, id: '14' },
  { name: '카모마일티', price: 5000, id: '15' },
  { name: '카야잼토스트', price: 4000, id: '16' },
]

export interface IOrder {
  menu: IMenu
  count: number
}

export default function QrPaymentView() {
  const [tab, setTab] = useState<string | null>(null)
  const [order, setOrder] = useState<Map<string, IOrder>>(new Map())

  const qrOpen = useBoolean()

  const orderHandler = (menu: IMenu) => {
    const prev = new Map(order)
    if (!prev.has(menu.id)) {
      prev.set(menu.id, { menu, count: 0 })
    }
    const curr = prev.get(menu.id)
    if (curr) {
      curr.count += 1
    }
    setOrder(prev)
  }

  const increaseHandler = (id: string) => {
    const prev = new Map(order)
    const curr = prev.get(id)
    if (curr) {
      curr.count += 1
    }
    setOrder(prev)
  }

  const decreaseHandler = (id: string) => {
    const prev = new Map(order)
    const curr = prev.get(id)
    if (curr && curr.count > 1) {
      curr.count -= 1
    }
    setOrder(prev)
  }

  const deleteHandler = (id: string) => {
    const prev = new Map(order)
    prev.delete(id)
    setOrder(prev)
  }

  const submitHandler = (data: string) => {
    console.log(data)
    toast.success('결제가 완료되었습니다')
    setOrder(new Map())
  }

  return (
    <>
      <Stack direction="row" flex={1} overflow="hidden">
        <Stack flex={1} overflow="hidden" bgcolor="background.paper" spacing={1}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <Tab label="전체 메뉴" value={null} />
            <Tab label="정식" value="정식" />
            <Tab label="세트" value="세트" />
            <Tab label="사이드" value="사이드" />
            <Tab label="음료" value="음료" />
          </Tabs>

          <ScrollContainer sx={{ height: 1, pl: 1, pb: 1 }}>
            <PaymentMenu onClick={orderHandler} menus={mock} />
          </ScrollContainer>
        </Stack>
        <PaymentOrder
          orders={Array.from(order.values())}
          onIncrease={increaseHandler}
          onDecrease={decreaseHandler}
          onDelete={deleteHandler}
          onSubmit={qrOpen.onTrue}
        />
      </Stack>
      <PaymentQr open={qrOpen.value} onClose={qrOpen.onFalse} onSuccess={submitHandler} />
    </>
  )
}
