import type { IPaymentResponse } from '@/types/payment'

import api from '@/configs/api'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useMemo, useState } from 'react'
import { grouping } from '@/utils/payment'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SelectYear, SelectMonth } from '@/components/select'
import PaymentList from '@/sections/payment-management/payment-list'

import { Box, Card, Stack, Pagination } from '@mui/material'

import { Typography } from '@e201/ui'

export function PaymentManagementView() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)

  const queryFn = async () => {
    const response = await axios.get<IPaymentResponse[]>(api.management.payment)
    return response.data
  }

  const { data, isPending, isError } = useQuery({ queryKey: [api.management.payment], queryFn })

  const groupedData = useMemo(() => {
    if (isPending || isError) {
      return []
    }
    return grouping(data)
  }, [data, isError, isPending])

  if (isPending) {
    return null
  }

  if (isError) {
    return null
  }

  return (
    <Box>
      <Breadcrumbs
        title="장부 관리"
        routes={[{ title: '관리', path: paths.management.menu }, { title: '장부 관리' }]}
      />

      <Card>
        <Stack direction="row" p={2} spacing={1}>
          <SelectYear year={year} onChange={setYear} />
          <SelectMonth month={month} onChange={setMonth} />
        </Stack>

        <PaymentListHeader />

        {groupedData.map((group, i) => (
          <PaymentList
            key={group.id}
            data={group}
            open={openIdx === i}
            onOpen={() => setOpenIdx(i)}
            onClose={() => setOpenIdx(null)}
          />
        ))}

        <Stack direction="row" justifyContent="center" width={1} px={1} p={2}>
          <Pagination count={10} siblingCount={1} boundaryCount={0} />
        </Stack>
      </Card>
    </Box>
  )
}

function PaymentListHeader() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={3}
      p={1}
      pl={2}
      bgcolor="background.paper"
      height={60}
    >
      <Typography variant="subtitle2" color="text.secondary" flex={1} minWidth={100} flexShrink={0}>
        회사
      </Typography>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        textAlign="end"
        width={120}
        flexShrink={0}
      >
        가격
      </Typography>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        flexShrink={0}
        textAlign="end"
        width={76}
      >
        시간
      </Typography>
      <Box width={72} />
    </Stack>
  )
}
