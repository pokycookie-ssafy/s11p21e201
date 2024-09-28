import type { GridColDef } from '@mui/x-data-grid'
import type { IContractResponse } from '@/types/contract'

import dayjs from 'dayjs'
import api from '@/configs/api'
import { m } from '@e201/utils'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import isBetween from 'dayjs/plugin/isBetween'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Card, Stack, Button, TextField } from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

dayjs.extend(isBetween)

export default function ContractNowManagementView() {
  const { t } = useTranslate('contract-management')

  const [companySearch, setCompanySearch] = useState<string>('')

  const queryFn = async () => {
    const response = await axios.get<IContractResponse[]>(api.contract.list)
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
    <Box>
      <Breadcrumbs
        title={t('breadcrumbs.contract_management')}
        routes={[
          { title: t('breadcrumbs.management'), path: paths.management.menu },
          { title: t('breadcrumbs.contract_management'), path: paths.management.contract.now },
          { title: t('breadcrumbs.contract_management') },
        ]}
        action={
          <Button color="secondary">
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
        <DataGrid
          columns={columns}
          getRowId={(row) => row.contractId}
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
