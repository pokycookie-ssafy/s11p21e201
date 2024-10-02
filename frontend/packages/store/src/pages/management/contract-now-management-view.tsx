import type { IContractResponse } from '@/types/contract'
import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import { toast } from 'sonner'
import api from '@/configs/api'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { m, useBoolean } from '@e201/utils'
import isBetween from 'dayjs/plugin/isBetween'
import { useNavigate } from 'react-router-dom'
import { DialogDelete } from '@/components/dialog'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Card, Stack, Button, Tooltip, Collapse, TextField, IconButton } from '@mui/material'

import { Iconify, Typography, Breadcrumbs } from '@e201/ui'

dayjs.extend(isBetween)

export default function ContractNowManagementView() {
  const { t } = useTranslate('contract-management')

  const [selected, setSelected] = useState<GridRowSelectionModel>([])
  const [companySearch, setCompanySearch] = useState<string>('')

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const deleteAllConfirm = useBoolean()

  const queryFn = async () => {
    const response = await axios.get<IContractResponse[]>(api.contract.list('all', 'complete'))
    return response.data
  }

  const { data, isPending } = useQuery({ queryKey: [api.contract.list], queryFn })

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    let filtered = [...data]
    if (companySearch.trim() !== '') {
      filtered = filtered.filter((contract) => contract.companyName.includes(companySearch.trim()))
    }
    return filtered
  }, [data, companySearch])

  const deleteSubmitHandler = () => {
    toast.success(t('toast.contract_cancel'))
    queryClient.invalidateQueries({ queryKey: [api.contract.list] })
    deleteAllConfirm.onFalse()
  }

  const columns: GridColDef[] = [
    { field: 'companyName', headerName: t('field.company_name'), flex: 1, minWidth: 100 },
    { field: 'companyEmail', headerName: t('field.email'), width: 200 },
    { field: 'companyPhone', headerName: t('field.phone'), width: 150, resizable: false },
    {
      field: 'settlementDate',
      headerName: t('field.settlement_date'),
      width: 100,
      valueFormatter: (value: number) => m(t('row.settlement_date'), [value]),
    },
    {
      field: 'contractDate',
      type: 'date',
      headerName: t('field.contract_date'),
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
            { title: t('breadcrumbs.management'), path: paths.management.menu },
            { title: t('breadcrumbs.contract_management'), path: paths.management.contract.now },
            { title: t('breadcrumbs.contract_management') },
          ]}
          action={
            <Button color="secondary" onClick={() => navigate(paths.management.contract.new)}>
              <Iconify icon="ic:round-plus" />
              <Typography variant="subtitle2" pl={0.5}>
                {t('button.create_contract')}
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
            spacing={1}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <TextField
              value={companySearch}
              onChange={(e) => setCompanySearch(e.target.value)}
              size="small"
              label={t('label.company_search')}
              fullWidth
            />
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
            getRowId={(row) => row.contractId}
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
