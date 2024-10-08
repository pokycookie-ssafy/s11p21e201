import type { IStore } from '@/types/store'

import api from '@/configs/api'
import { useState } from 'react'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useQuery } from '@tanstack/react-query'

import { Box, Card, Stack, Button, Divider, Collapse } from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

export default function StoreList() {
  const { t } = useTranslate()

  const [collapseIdx, setCollapseIdx] = useState<number | null>(null)

  const { data } = useQuery({
    queryKey: [api.stores],
    queryFn: async () => {
      const response = await axios.get<IStore[]>(api.stores)
      return response.data
    },
  })

  const collapseHandler = (idx: number) => {
    if (collapseIdx === idx) {
      setCollapseIdx(null)
      return
    }
    setCollapseIdx(idx)
  }

  return (
    <Card sx={{ width: 1 }}>
      <Box p={2}>
        <Typography variant="subtitle2" align="left">
          {t('main.store_list')}
        </Typography>
      </Box>

      <Divider />

      <Stack component="ul" p={0} m={0} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
        {data?.map((store, i) => (
          <Box width={1} key={i}>
            <Button fullWidth variant="soft" sx={{ p: 0 }} onClick={() => collapseHandler(i)}>
              <Stack
                width={1}
                component="li"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                p={2}
              >
                <Typography>{store.storeName}</Typography>
                <Iconify icon="solar:alt-arrow-right-linear" />
              </Stack>
            </Button>
            <Collapse in={collapseIdx === i}>
              <Stack p={2} width={1} bgcolor="background.paper">
                <Typography textAlign="left" variant="subtitle2" fontWeight={500}>
                  {store.storePhone}
                </Typography>
                <Typography textAlign="left" variant="caption">
                  {store.storeAddress}
                </Typography>
              </Stack>
            </Collapse>
          </Box>
        ))}
      </Stack>
    </Card>
  )
}
