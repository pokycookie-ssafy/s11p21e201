import type { IContract } from '@/types/contract'
import type { GridColDef } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Card, Stack, Button, TextField, Typography } from '@mui/material'

import { Iconify, Breadcrumbs } from '@e201/ui'

export default function ContractNowManagementView() {
  const fetchContracts = async () => {
    const response = await axios.get<IContract[]>('/companies/stores')
    return response.data
  }

  const navigate = useNavigate()

  const { t } = useTranslate('contract')

  const { data, isPending } = useQuery({
    queryKey: ['contract-stores'],
    queryFn: fetchContracts,
  })

  const [storeSearch, setStoreSearch] = useState<string>('')

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    let filtered = [...data]
    if (storeSearch.trim() !== '') {
      filtered = filtered.filter((contract) => contract.name.includes(storeSearch.trim()))
    }
    return filtered
  }, [data, storeSearch])

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('restaurant_name'), flex: 1, minWidth: 100 },
    { field: 'phone', headerName: t('phone_number'), width: 180, resizable: false },
    { field: 'address', headerName: t('address'), width: 300 },
    {
      field: 'createdAt',
      type: 'date',
      headerName: t('contract_date'),
      width: 120,
      resizable: false,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
  ]

  return (
    <Box>
      <Breadcrumbs
        title={t('breadcrumbs.contract_management')}
        routes={[
          { title: t('breadcrumbs.management'), path: paths.management.contract.now },
          { title: t('breadcrumbs.contract_management'), path: paths.management.contract.now },
          { title: t('breadcrumbs.contract_management') },
        ]}
        action={
          <Button color="secondary" onClick={() => navigate(paths.management.contract.new)}>
            <Iconify icon="ic:round-plus" />
            <Typography variant="subtitle2" pl={0.5}>
              {t('add_contract')}
            </Typography>
          </Button>
        }
      />

      <Card>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Stack width={1} direction="row" alignItems="center" spacing={1}>
            <TextField
              value={storeSearch}
              onChange={(e) => setStoreSearch(e.target.value)}
              size="small"
              label="search"
              fullWidth
            />
          </Stack>
        </Stack>

        <DataGrid
          columns={columns}
          rows={filteredData}
          checkboxSelection
          hideFooter
          loading={isPending}
          slotProps={{
            noRowsOverlay: {},
            noResultsOverlay: {},
          }}
          sx={{ height: 500 }}
        />
      </Card>
    </Box>
  )
}
