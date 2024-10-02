import type { IContract, IContractResponse } from '@/types/contract'
import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import { toast } from 'sonner'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { m, useBoolean } from '@e201/utils'
import { useNavigate } from 'react-router-dom'
import { DialogDelete } from '@/components/dialog'
import { useQuery, useQueryClient } from '@tanstack/react-query'

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

import { Iconify, Breadcrumbs } from '@e201/ui'

export default function ContractNowManagementView() {
  const navigate = useNavigate()

  const { t } = useTranslate('contract')

  const [selected, setSelected] = useState<GridRowSelectionModel>([])
  const [storeSearch, setStoreSearch] = useState<string>('')

  const queryClient = useQueryClient()

  const deleteAllConfirm = useBoolean()

  const fetchContracts = async () => {
    const response = await axios.get<IContractResponse[]>('/companies/stores')
    return response.data
  }

  const { data, isPending } = useQuery({
    queryKey: ['contract-stores'],
    queryFn: fetchContracts,
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

  const deleteSubmitHandler = () => {
    toast.success(t('toast.contract_cancel'))
    queryClient.invalidateQueries({ queryKey: [''] })
    deleteAllConfirm.onFalse()
  }

  const columns: GridColDef<IContractResponse>[] = [
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
    <>
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

          <Collapse in={selected.length > 0}>
            <Stack
              width={1}
              height={57}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              px={2}
              py={1}
              bgcolor="background.paper"
              sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
              <Typography variant="subtitle2">
                {m(t('label.selected'), [selected.length])}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title={t('tooltip.contract_cancel')} disableInteractive>
                  <IconButton color="error" onClick={deleteAllConfirm.onTrue}>
                    <Iconify icon="line-md:file-cancel" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Collapse>

          <DataGrid
            columns={columns}
            rows={filteredData}
            rowSelectionModel={selected}
            onRowSelectionModelChange={setSelected}
            disableMultipleRowSelection
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

      <DialogDelete
        open={deleteAllConfirm.value}
        onClose={deleteAllConfirm.onFalse}
        onSubmit={deleteSubmitHandler}
        title={t('dialog.cancel')}
        content={m(t('dialog.cancel_content'), [
          data?.find((e) => e.contractId === selected[0])?.companyName ?? '',
        ])}
      />
    </>
  )
}
