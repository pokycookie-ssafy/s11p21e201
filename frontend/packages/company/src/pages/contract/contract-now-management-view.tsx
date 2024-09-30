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
        title={t('contract_management')}
        routes={[
          { title: t('contract_management') },
          { title: t('request_contract'), path: paths.management.contract.request },
          { title: t('contract_log'), path: paths.management.contract.history },
        ]}
        action={
          <Button onClick={() => navigate(paths.management.contract.new)}>
            <Iconify icon="ic:round-plus" />
            <Typography variant="subtitle2" pl={0.5}>
              {t('add_contract')}
            </Typography>
          </Button>
        }
      />

      <Card>
        {/* <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab label="전체" value={null} key={0} />
          {categories.map((category, i) => (
            <Tab label={category} value={category} key={i + 1} />
          ))}
        </Tabs> */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={1}
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
          hideFooterPagination
          disableColumnSorting
          disableColumnFilter
          disableColumnMenu
          disableRowSelectionOnClick
          loading={isPending}
          slotProps={{
            noRowsOverlay: {},
            noResultsOverlay: {},
          }}
          sx={{
            height: 500,
            '& .MuiDataGrid-columnSeparator': {
              color: 'transparent',
              ':hover': {
                color: (theme) => theme.palette.divider,
              },
            },
            '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
            '& .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
            '.MuiDataGrid-columnHeaders': {
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            },
          }}
        />
      </Card>
    </Box>
  )
}
