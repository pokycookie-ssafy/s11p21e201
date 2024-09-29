import type { IContractRequest } from '@/types/contract-request'
import type { GridColDef, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  Card,
  Stack,
  Button,
  Tooltip,
  Collapse,
  TextField,
  Typography,
  IconButton,
} from '@mui/material'

import { Iconify } from '@e201/ui'

export default function ContractRequestManagementView() {
  const [selected, setSelected] = useState<GridRowSelectionModel>([])

  const { t } = useTranslate('contract')

  const fetchContractRequest = async (userCond = 'receiver', status = 'in') => {
    const response = await axios.get<IContractRequest[]>('/contract', {
      params: {
        userCond,
        status,
      },
    })
    return response.data
  }

  const [storeSearch, setStoreSearch] = useState<string>('')

  const { data, isPending, isError } = useQuery({
    queryKey: ['contract'],
    queryFn: () => fetchContractRequest('receiver', 'in'),
  })

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    let filtered = [...data]
    if (storeSearch.trim() !== '') {
      filtered = filtered.filter((contract) => contract.storeName.includes(storeSearch.trim()))
    }
    return filtered
  }, [data, storeSearch])

  const handleRowSelectionChange = (selection: GridRowSelectionModel) => {
    setSelected(selection)
  }

  const columns: GridColDef[] = [
    {
      field: 'storeName',
      headerName: t('restaurant_name'),
      flex: 1,
      minWidth: 150,
    },
    { field: 'phone', headerName: t('phone_number'), width: 150, resizable: false },
    { field: 'address', headerName: t('address'), width: 300 },
    {
      field: 'contractDate',
      type: 'date',
      headerName: t('request_date'),
      resizable: false,
      width: 120,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'action',
      type: 'actions',
      headerName: t('action'),
      align: 'left',
      resizable: false,
      getActions: (params: GridRowParams) => [
        <Tooltip title={t('accept')} arrow disableInteractive>
          <IconButton color="success">
            <Iconify icon="iconamoon:check-bold" />
          </IconButton>
        </Tooltip>,
        <Tooltip title={t('reject')} arrow disableInteractive>
          <IconButton color="error">
            <Iconify icon="gravity-ui:xmark" />
          </IconButton>
        </Tooltip>,
      ],
    },
  ]

  return (
    <Box>
      <Breadcrumbs
        title={t('request_contract')}
        routes={[
          { title: t('contract_management'), path: paths.management.contract.now },
          { title: t('request_contract') },
          { title: t('contract_log'), path: paths.management.contract.history },
        ]}
        // action={
        //   <Button>
        //     <Iconify icon="ic:round-plus" />
        //     <Typography variant="subtitle2" pl={0.5}>
        //       계약 추가
        //     </Typography>
        //   </Button>
        // }
      />

      <Card>
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

        <Collapse in={selected.length > 0}>
          <Stack
            width={1}
            height={57}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            zIndex={1}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <Typography variant="subtitle1">
              {selected.length}
              {t('selected')}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title={t('accept_all')} arrow disableInteractive>
                <IconButton color="success">
                  <Iconify icon="iconamoon:check-bold" />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('reject_all')} arrow disableInteractive>
                <IconButton color="error">
                  <Iconify icon="gravity-ui:xmark" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Collapse>

        <DataGrid
          columns={columns}
          rows={filteredData}
          getRowId={(row) => row.contractId}
          rowSelectionModel={selected}
          onRowSelectionModelChange={setSelected}
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
