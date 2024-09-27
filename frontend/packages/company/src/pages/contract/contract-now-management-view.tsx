import type { IContract } from '@/types/contract'
import type { GridColDef } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Card, Stack, Button, TextField, Typography } from '@mui/material'

import { Iconify } from '@e201/ui'

export default function ContractNowManagementView() {
  const fetchContracts = async () => {
    const response = await axios.get<IContract[]>('/companies/stores')
    return response.data
  }

  const { data, isPending, isError } = useQuery({
    queryKey: ['contract-stores'],
    queryFn: fetchContracts,
  })

  const columns: GridColDef[] = [
    { field: 'name', headerName: '식당명', flex: 1, minWidth: 100 },
    { field: 'phone', headerName: '대표번호', width: 180, resizable: false },
    { field: 'address', headerName: '주소', width: 300 },
    {
      field: 'createdAt',
      type: 'date',
      headerName: '계약날짜',
      width: 120,
      resizable: false,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
  ]

  return (
    <Box>
      <Breadcrumbs
        title="계약 관리"
        routes={[
          { title: '관리', path: 'paths.management.menu' },
          { title: '계약 관리', path: paths.management.contract.root },
          { title: '계약 관리' },
        ]}
        action={
          <Button>
            <Iconify icon="ic:round-plus" />
            <Typography variant="subtitle2" pl={0.5}>
              계약 추가
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
            <TextField size="small" label="search" fullWidth />
          </Stack>
        </Stack>
        <DataGrid
          columns={columns}
          rows={data}
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
