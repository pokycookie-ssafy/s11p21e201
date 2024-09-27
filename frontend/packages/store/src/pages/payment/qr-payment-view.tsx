import type { IMenu } from '@/types/menu'

import { toast } from 'sonner'
import api from '@/configs/api'
import axios from '@/configs/axios'
import { useBoolean } from '@e201/utils'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import PaymentQr from '@/sections/qr-payment/payment-qr'
import PaymentMenu from '@/sections/qr-payment/payment-menu'
import PaymentOrder from '@/sections/qr-payment/payment-order'

import { Tab, Tabs, Stack, CircularProgress } from '@mui/material'

import { ScrollContainer } from '@e201/ui'

export interface IOrder {
  menu: IMenu
  count: number
}

export default function QrPaymentView() {
  const { t } = useTranslate('qr-payment')

  const [tab, setTab] = useState<string | null>(null)
  const [order, setOrder] = useState<Map<string, IOrder>>(new Map())

  const qrOpen = useBoolean()

  const queryFn = async () => {
    const response = await axios.get<IMenu[]>(api.menu.list)
    return response.data
  }

  const { data: menus, isPending, isError } = useQuery({ queryKey: [api.menu.list], queryFn })

  const categories = useMemo(() => {
    if (!menus) {
      return []
    }
    const categorySet = new Set<string>()
    menus.forEach((menu) => {
      if (menu.category) {
        categorySet.add(menu.category)
      }
    })
    return Array.from(categorySet)
  }, [menus])

  const filteredMenus = useMemo<IMenu[]>(() => {
    if (!menus) {
      return []
    }
    if (tab === null) {
      return menus
    }
    return menus.filter((menu) => menu.category === tab)
  }, [menus, tab])

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

  const submitHandler = (qrData: string) => {
    console.log(qrData)
    toast.success(t('toast.success'))
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
            <Tab label={t('label.all')} value={null} key={0} />
            {categories.map((category, i) => (
              <Tab label={category} value={category} key={i + 1} />
            ))}
          </Tabs>

          {isPending ? (
            <Stack width={1} height={1} justifyContent="center" alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <ScrollContainer sx={{ height: 1, pl: 1, pb: 1 }}>
              <PaymentMenu onClick={orderHandler} menus={filteredMenus} />
            </ScrollContainer>
          )}
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
