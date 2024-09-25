import { useState } from 'react'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useQuery } from '@tanstack/react-query'

import {
  Box,
  Tab,
  Tabs,
  Menu,
  Stack,
  Badge,
  Button,
  Divider,
  Typography,
  IconButton,
} from '@mui/material'

import { Iconify } from '@e201/ui'

const fetchOutgoingContracts = async (userCond = 'sender', status = 'in') => {
  const outgoing_response = await axios.get('/contract', {
    params: {
      userCond,
      status,
    },
  })
  return outgoing_response.data
}

const fetchIncomingContracts = async (userCond = 'receiver', status = 'in') => {
  const incoming_response = await axios.get('/contract', {
    params: {
      userCond,
      status,
    },
  })
  return incoming_response.data
}

interface IContract {
  contractDate: Date
  settlementDate: number
  contractId: string
  storeId: string
  companyId: string
  storeName: string
  companyName: string
}

export default function ContractViewMenu() {
  const { t } = useTranslate('management')

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [tabValue, setTabValue] = useState(0)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const isPopoverOpen = Boolean(anchorEl)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const { data: outgoings = [] } = useQuery({
    queryKey: ['outgoingContracts'],
    queryFn: () => fetchOutgoingContracts('sender', 'in'),
  })

  const { data: incomings = [] } = useQuery({
    queryKey: ['incomingContracts'],
    queryFn: () => fetchIncomingContracts('receiver', 'in'),
  })

  return (
    <Stack>
      <IconButton onClick={handleMenuOpen}>
        <Badge badgeContent={incomings.length} color="primary">
          <Iconify icon="mingcute:notification-line" />
        </Badge>
      </IconButton>
      <Menu
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ width: '400px', px: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ width: '100%' }}>
            <Tab label={t('incoming_request')} sx={{ width: '50%' }} />
            <Tab label={t('outgoing_request')} sx={{ width: '50%' }} />
          </Tabs>
          {tabValue === 0 && (
            <Box p={2} sx={{ width: '100%' }}>
              <Stack>
                {incomings.map((incoming: IContract) => (
                  <Stack key={incoming.contractId}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      padding={2}
                    >
                      <Typography>{incoming.storeName}</Typography>
                      <Button size="small">{t('approve')}</Button>
                    </Stack>
                    <Divider />
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}
          {tabValue === 1 && (
            <Box p={2} sx={{ width: '100%' }}>
              <Stack>
                {outgoings.map((outgoing: IContract) => (
                  <Stack key={outgoing.contractId}>
                    <Stack direction="row" alignItems="center" padding={2}>
                      <Typography>{outgoing.storeName}</Typography>
                    </Stack>
                    <Divider />
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Menu>
    </Stack>
  )
}
