import type { IDepartment, IDepartmentCreateRequset } from '@/types/employees'

import api from '@/configs/api'
import { useState } from 'react'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { m, useBoolean } from '@e201/utils'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import DepartmentCreateModal from '@/sections/member-management/department-create-modal'

import { Box, Card, Stack, Button, Tooltip, Collapse, IconButton } from '@mui/material'
import { DataGrid, type GridColDef, type GridRowSelectionModel } from '@mui/x-data-grid'

import { Iconify, Typography, Breadcrumbs } from '@e201/ui'

export default function DepartmentManagementView() {
  const { t } = useTranslate('member')

  const queryClient = useQueryClient()

  const deleteConfirm = useBoolean()
  const createModal = useBoolean()

  const [selected, setSelected] = useState<GridRowSelectionModel>([])

  const { data: departments, isPending: departmentIsPending } = useQuery({
    queryKey: [api.department.list],
    queryFn: async () => {
      const response = await axios.get<IDepartment[]>(api.department.list)
      return response.data
    },
  })

  const { mutate: createManager } = useMutation({
    mutationKey: [api.department.create],
    mutationFn: async (req: IDepartmentCreateRequset) => {
      const response = await axios.post(api.department.create, req)
      return response.data
    },
  })

  const createManagerHandler = (req: IDepartmentCreateRequset) => {
    createManager(req, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [api.department.list] })
        createModal.onFalse()
      },
    })
  }

  const columns: GridColDef<IDepartment>[] = [
    {
      field: 'code',
      headerName: t('field.department_code'),
      width: 150,
    },
    {
      field: 'name',
      headerName: t('field.department'),
      flex: 1,
      minWidth: 150,
    },
  ]

  return (
    <>
      <Box>
        <Breadcrumbs
          title={t('breadcrumbs.department_management')}
          routes={[
            { title: t('breadcrumbs.management'), path: paths.management.member.list },
            { title: t('breadcrumbs.member_management'), path: paths.management.member.list },
            { title: t('breadcrumbs.department_management') },
          ]}
          action={
            <Button color="secondary" onClick={createModal.onTrue}>
              <Iconify icon="ic:round-plus" />
              <Typography variant="subtitle2" pl={0.5}>
                {t('button.create_department')}
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
            rows={departments}
            rowSelectionModel={selected}
            onRowSelectionModelChange={setSelected}
            checkboxSelection
            disableMultipleRowSelection
            hideFooter
            loading={departmentIsPending}
            slotProps={{
              noRowsOverlay: {},
              noResultsOverlay: {},
            }}
            sx={{ height: 500 }}
          />
        </Card>
      </Box>

      <DepartmentCreateModal
        open={createModal.value}
        onClose={createModal.onFalse}
        onSubmit={createManagerHandler}
      />
    </>
  )
}
