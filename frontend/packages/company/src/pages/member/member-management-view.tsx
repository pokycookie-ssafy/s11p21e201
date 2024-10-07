import type { ISelectOption } from '@e201/ui'
import type { IEmployee, IDepartment } from '@/types/employees'
import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import { toast } from 'sonner'
import api from '@/configs/api'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'
import { m, useBoolean } from '@e201/utils'
import { useNavigate } from 'react-router-dom'
import { fNumber } from '@/utils/number-format'
import { useRef, useMemo, useState } from 'react'
import { DialogDelete } from '@/components/dialog'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  Tab,
  Card,
  Tabs,
  Stack,
  Button,
  Tooltip,
  Collapse,
  TextField,
  Typography,
  IconButton,
} from '@mui/material'

import { Iconify, Breadcrumbs } from '@e201/ui'

export default function MemberManagementView() {
  const { t } = useTranslate('member')

  const queryClient = useQueryClient()

  const { isCompany } = useAuthStore()

  const navigate = useNavigate()

  const deleteConfirm = useBoolean()
  const deleteAllConfirm = useBoolean()

  const employeeForDelete = useRef<IEmployee | null>(null)

  const [tab, setTab] = useState<string | null>(null)
  const [selected, setSelected] = useState<GridRowSelectionModel>([])
  const [memberSearch, setMemberSearch] = useState<string>('')

  const { data: employees, isPending: employeeIsPending } = useQuery({
    queryKey: [api.employee.list],
    queryFn: async () => {
      const response = await axios.get<IEmployee[]>(api.employee.list)
      return response.data
    },
  })

  const { data: departments } = useQuery({
    queryKey: [api.department.list],
    queryFn: async () => {
      const response = await axios.get<IDepartment[]>(api.department.list)
      return response.data
    },
    enabled: isCompany,
  })

  const { mutate: deleteEmployee } = useMutation({
    mutationKey: [api.employee.delete],
    mutationFn: async (employeeId: string) => {
      const response = await axios.delete(api.employee.deleteWith(employeeId))
      return response.data
    },
  })

  const departmentOptions = useMemo<ISelectOption[]>(() => {
    if (!isCompany) {
      return []
    }
    if (!departments) {
      return []
    }
    return departments.map((e) => ({ label: e.name, value: e.id }))
  }, [departments, isCompany])

  const filteredData = useMemo(() => {
    if (!employees) {
      return []
    }

    let filtered = [...employees]
    if (memberSearch.trim() !== '') {
      filtered = filtered.filter((member) => member.employeeName.includes(memberSearch.trim()))
    }
    if (tab) {
      filtered = filtered.filter((member) => member.departmentId === tab)
    }
    return filtered
  }, [employees, memberSearch, tab])

  const navigateToCreate = () => {
    navigate(paths.management.member.create)
  }

  const deleteHandler = (employee: IEmployee) => {
    employeeForDelete.current = employee
    deleteConfirm.onTrue()
  }

  const deleteSubmitHandler = () => {
    toast.success(t('toast.delete'))
    // queryClient.invalidateQueries({ queryKey: [''] })
    deleteAllConfirm.onFalse()
  }

  const columns: GridColDef[] = [
    {
      field: 'employeeName',
      headerName: t('field.employee_name'),
      width: 100,
    },
    {
      field: 'employeeCode',
      headerName: t('field.employee_number'),
      width: 150,
    },
    {
      field: 'departmentName',
      headerName: t('field.department'),
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'createdAt',
      type: 'date',
      headerName: t('account_created_date'),
      resizable: false,
      width: 120,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'supportAmount',
      headerName: t('allotted_amount'),
      type: 'number',
      width: 120,
      resizable: false,
      renderCell: (params) => `${fNumber(params.value)} ${t('unit.won')}`,
    },
    {
      field: 'action',
      type: 'actions',
      resizable: false,
      getActions: (params) => [
        // <Tooltip title={t('edit_info')} arrow disableInteractive>
        //   <IconButton>
        //     <Iconify icon="solar:pen-linear" />
        //   </IconButton>
        // </Tooltip>,
        <Tooltip title={t('delete')} arrow disableInteractive>
          <IconButton color="error" onClick={() => deleteHandler(params.row)}>
            <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
          </IconButton>
        </Tooltip>,
      ],
    },
  ]

  return (
    <>
      <Box>
        <Breadcrumbs
          title={t('breadcrumbs.title')}
          routes={[
            { title: t('breadcrumbs.management'), path: paths.management.member.list },
            { title: t('breadcrumbs.title') },
          ]}
          action={
            isCompany ? null : (
              <Button color="secondary" onClick={navigateToCreate}>
                <Iconify icon="ic:round-plus" />
                <Typography variant="subtitle2" pl={0.5}>
                  {t('button.create_member')}
                </Typography>
              </Button>
            )
          }
        />

        <Card>
          <Box px={2} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              variant="scrollable"
              sx={{ borderColor: 'red' }}
            >
              <Tab label={t('label.all')} value={null} key={0} />
              {departmentOptions.map((department, i) => (
                <Tab label={department.label} value={department.value} key={i + 1} />
              ))}
            </Tabs>
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            spacing={1}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <TextField
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              size="small"
              label={t('label.name_search')}
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
              <Tooltip title={t('tooltip.delete_all')} disableInteractive>
                <IconButton color="error" onClick={deleteAllConfirm.onTrue}>
                  <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Collapse>

          <DataGrid
            columns={columns}
            rows={filteredData}
            rowSelectionModel={selected}
            onRowSelectionModelChange={setSelected}
            checkboxSelection
            hideFooter
            loading={employeeIsPending}
            slotProps={{
              noRowsOverlay: {},
              noResultsOverlay: {},
            }}
            sx={{ height: 500 }}
          />
        </Card>
      </Box>
      <DialogDelete
        open={deleteConfirm.value}
        onClose={deleteConfirm.onFalse}
        onSubmit={deleteSubmitHandler}
        content={m(t('dialog.delete_content'), [
          employeeForDelete.current?.employeeName,
          employeeForDelete.current?.employeeCode,
        ])}
      />
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
