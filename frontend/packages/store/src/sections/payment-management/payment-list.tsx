import type { IPaymentGroup } from '@/types/payment'

import dayjs from 'dayjs'
import { fNumber } from '@e201/utils'

import { Box, Stack, Divider, Collapse, IconButton } from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

interface IProps {
  open: boolean
  onOpen: () => void
  onClose: () => void
  data: IPaymentGroup
}

export default function PaymentList({ open, onOpen, onClose, data }: IProps) {
  return (
    <Stack sx={{ borderBottom: (theme) => `1px dashed ${theme.palette.divider}` }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={3}
        width={1}
        p={1}
        pl={2}
        overflow="hidden"
      >
        <Stack flex={1} minWidth={100}>
          <Typography ellipsis variant="subtitle1">
            {data.companyName}
          </Typography>
          <Typography ellipsis variant="caption">
            {data.employeeCode}
          </Typography>
        </Stack>

        <Stack alignItems="flex-end" width={120} flexShrink={0}>
          <Typography ellipsis variant="subtitle1" color="primary.main">
            {fNumber(data.totalPrice)}원
          </Typography>
          <Typography ellipsis variant="caption">
            메뉴 {data.menus.length}개
          </Typography>
        </Stack>

        <Stack alignItems="flex-end" width={76} flexShrink={0}>
          <Typography ellipsis variant="subtitle2" color="text.secondary">
            {dayjs(data.createdAt).format('YYYY.MM.DD')}
          </Typography>
          <Typography ellipsis variant="caption">
            {dayjs(data.createdAt).format('HH:mm')}
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconButton onClick={open ? onClose : onOpen}>
            <Iconify icon={`solar:alt-arrow-${open ? 'up' : 'down'}-line-duotone`} />
          </IconButton>
          <IconButton>
            <Iconify icon="pepicons-pencil:dots-y" />
          </IconButton>
        </Stack>
      </Stack>

      <Collapse in={open}>
        <Box
          p={1.5}
          bgcolor="background.paper"
          sx={{ borderTop: (theme) => `1px dashed ${theme.palette.divider}` }}
        >
          <Stack
            borderRadius={2}
            bgcolor="background.default"
            divider={<Divider orientation="horizontal" sx={{ borderStyle: 'dashed' }} />}
          >
            {data.menus.map((menu, i) => (
              <Stack key={i} direction="row" py={1} px={2} justifyContent="space-between">
                <Typography variant="subtitle2" fontWeight={500} color="text.secondary">
                  {menu.name}
                </Typography>
                <Typography variant="subtitle2" fontWeight={500} color="text.secondary">
                  {fNumber(menu.price)}원
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Collapse>
    </Stack>
  )
}
