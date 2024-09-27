import type { IPaymentGroup, IPaymentResponse } from '@/types/payment'
import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import { toast } from 'sonner'
import api from '@/configs/api'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { grouping } from '@/utils/payment'
import { DialogDelete } from '@/components/dialog'
import { m, fNumber, useBoolean } from '@e201/utils'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SelectYear, SelectMonth } from '@/components/select'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Card, Stack, Tooltip, Collapse, IconButton } from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

export function PaymentManagementView() {
  const { t } = useTranslate('payment-management')

  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)

  const deleteAllConfirm = useBoolean()

  const queryClient = useQueryClient()

  const [selected, setSelected] = useState<GridRowSelectionModel>([])

  const queryFn = async () => {
    const response = await axios.get<IPaymentResponse[]>(api.management.payment)
    return response.data
  }

  const { data, isPending, isError } = useQuery({ queryKey: [api.management.payment], queryFn })

  const groupedData = useMemo(() => {
    if (!data) {
      return []
    }
    return grouping(data)
  }, [data])

  const deleteSubmitHandler = () => {
    toast.success(t('toast.delete'))
    queryClient.invalidateQueries({ queryKey: [api.menu.list] })
    deleteAllConfirm.onFalse()
  }

  const columns: GridColDef<IPaymentGroup>[] = [
    { field: 'companyName', headerName: t('field.company_name'), flex: 1, minWidth: 100 },
    { field: 'employeeCode', headerName: t('field.employee_code'), width: 100 },
    {
      field: 'menu',
      headerName: t('field.menu'),
      flex: 2,
      minWidth: 100,
      valueGetter: (_, row) => row.menus.map((menu) => menu.name).join(', '),
    },
    {
      field: 'totalPrice',
      headerName: t('field.total_price'),
      type: 'number',
      width: 100,
      valueFormatter: (value: number) => `${fNumber(value)}${t('unit.won')}`,
    },
    {
      field: 'createdAt',
      headerName: t('field.payment_time'),
      type: 'dateTime',
      width: 150,
      resizable: false,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD HH:mm'),
    },
  ]

  if (isError) {
    return null
  }

  return (
    <>
      <Box>
        <Breadcrumbs
          title={t('breadcrumbs.payment_management')}
          routes={[
            { title: t('breadcrumbs.management'), path: paths.management.menu },
            { title: t('breadcrumbs.payment_management') },
          ]}
        />

        <Card>
          <Stack
            direction="row"
            p={2}
            spacing={1}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <SelectYear year={year} onChange={setYear} />
            <SelectMonth month={month} onChange={setMonth} />
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
              bgcolor="background.paper"
              sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
              <Typography variant="subtitle2">
                {m(t('label.selected'), [selected.length])}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title={t('tooltip.delete_all')} disableInteractive>
                  <IconButton color="error" onClick={deleteAllConfirm.onTrue}>
                    <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Collapse>

          <DataGrid
            columns={columns}
            rows={groupedData}
            rowSelectionModel={selected}
            onRowSelectionModelChange={setSelected}
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
        title={t('dialog.delete_all')}
        content={m(t('dialog.delete_all_content'), [selected.length])}
      />
    </>
  )
}
