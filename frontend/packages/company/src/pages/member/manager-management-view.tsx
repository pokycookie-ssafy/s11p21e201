import type { IManager, IManagerCreateRequest } from '@/types/employees'
import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import api from '@/configs/api'
import { useState } from 'react'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { m, useBoolean } from '@e201/utils'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import ManagerCreateModal from '@/sections/member-management/manager-create-modal'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Card, Stack, Button, Tooltip, Collapse, IconButton } from '@mui/material'

import { Iconify, Typography, Breadcrumbs } from '@e201/ui'

export default function ManagerManagementView() {
  const { t } = useTranslate('member')

  const queryClient = useQueryClient()

  const deleteConfirm = useBoolean()
  const createModal = useBoolean()

  const [selected, setSelected] = useState<GridRowSelectionModel>([])

  const { data: managers, isPending: managerIsPending } = useQuery({
    queryKey: [api.manager.list],
    queryFn: async () => {
      const response = await axios.get<IManager[]>(api.manager.list)
      return response.data
    },
  })

  const { mutate: createManager } = useMutation({
    mutationKey: [api.manager.create],
    mutationFn: async (req: IManagerCreateRequest) => {
      const response = await axios.post(api.manager.create, req)
      return response.data
    },
  })

  const createManagerHandler = (req: IManagerCreateRequest) => {
    createManager(req, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [api.manager.list] })
        createModal.onFalse()
      },
    })
  }

  const columns: GridColDef<IManager>[] = [
    {
      field: 'code',
      headerName: t('field.manager_code'),
      width: 150,
    },
    {
      field: 'departmentName',
      headerName: t('field.department'),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'createdAt',
      headerName: t('field.created_at'),
      type: 'date',
      resizable: false,
      width: 150,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
  ]

  return (
    <>
      <Box>
        <Breadcrumbs
          title={t('breadcrumbs.manager_management')}
          routes={[
            { title: t('breadcrumbs.management'), path: paths.management.member.root },
            { title: t('breadcrumbs.member_management'), path: paths.management.member.list },
            { title: t('breadcrumbs.manager_management') },
          ]}
          action={
            <Button color="secondary" onClick={createModal.onTrue}>
              <Iconify icon="ic:round-plus" />
              <Typography variant="subtitle2" pl={0.5}>
                {t('button.create_manager')}
              </Typography>
            </Button>
          }
        />

        <Card>
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
              <Tooltip title={t('tooltip.delete')} disableInteractive>
                <IconButton color="error" onClick={deleteConfirm.onTrue}>
                  <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Collapse>

          <DataGrid
            columns={columns}
            rows={managers}
            rowSelectionModel={selected}
            onRowSelectionModelChange={setSelected}
            checkboxSelection
            disableMultipleRowSelection
            hideFooter
            loading={managerIsPending}
            slotProps={{
              noRowsOverlay: {},
              noResultsOverlay: {},
            }}
            sx={{ height: 500 }}
          />
        </Card>
      </Box>

      {createModal.value && (
        <ManagerCreateModal
          open={createModal.value}
          onClose={createModal.onFalse}
          onSubmit={createManagerHandler}
        />
      )}
    </>
  )
}
