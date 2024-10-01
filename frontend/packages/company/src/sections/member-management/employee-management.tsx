import type { ISelectOption } from '@e201/ui'
import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

// import EmployeeCreateDialog from '@/sections/member-management/employee-createdialog'
// import EmployeeInfoDialog from '@/sections/member-management/employee-infodialog'
// import paths from '@/configs/paths'

import dayjs from 'dayjs'
import { toast } from 'sonner'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { m, useBoolean } from '@e201/utils'
import { useNavigate } from 'react-router-dom'
import { fNumber } from '@/utils/number-format'
import { useRef, useMemo, useState } from 'react'
import { DialogDelete } from '@/components/dialog'
import { useQuery, useQueryClient } from '@tanstack/react-query'

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

interface IEmployee {
  id: string
  name: string
  departmentId: string
  departmentName: string
  supportAmount: number
  spentAmount: number
  createdAt: Date
}

const fetchEmployees = async () => {
  const response = await axios.get<IEmployee[]>('/companies/employees')
  return response.data
}

export default function ContractRequestManagementView() {
  const { t } = useTranslate('member')

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const deleteConfirm = useBoolean()
  const deleteAllConfirm = useBoolean()

  const employeeForDelete = useRef<IEmployee | null>(null)

  const [tab, setTab] = useState<string | null>(null)
  const [selected, setSelected] = useState<GridRowSelectionModel>([])
  const [memberSearch, setMemberSearch] = useState<string>('')

  const { data, isPending } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  })

  const departments = useMemo(() => {
    if (!data) {
      return []
    }

    const departmentSet = new Set<string>()
    const departmentList: ISelectOption[] = []
    data.forEach((e) => {
      if (!departmentSet.has(e.departmentId)) {
        departmentList.push({ label: e.departmentName, value: e.departmentId })
      }
      departmentSet.add(e.departmentId)
    })
    return departmentList
  }, [data])

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    let filtered = [...data]
    if (memberSearch.trim() !== '') {
      filtered = filtered.filter((member) => member.name.includes(memberSearch.trim()))
    }
    if (tab) {
      filtered = filtered.filter((member) => member.departmentId === tab)
    }
    return filtered
  }, [data, memberSearch, tab])

  const handleNavigate = () => {
    navigate('create')
  }

  const deleteHandler = (employee: IEmployee) => {
    employeeForDelete.current = employee
    deleteConfirm.onTrue()
  }

  const deleteSubmitHandler = () => {
    toast.success(t('toast.delete'))
    queryClient.invalidateQueries({ queryKey: [''] })
    deleteAllConfirm.onFalse()
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('field.employee_name'),
      width: 100,
    },
    {
      field: 'id',
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
      field: 'spentAmount',
      headerName: t('spent_amount'),
      type: 'number',
      width: 120,
      resizable: false,
      renderCell: (params) => `${fNumber(params.value)} ${t('unit.won')}`,
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
      align: 'left',
      resizable: false,
      getActions: (params) => [
        <Tooltip title={t('edit_info')} arrow disableInteractive>
          <IconButton>
            <Iconify icon="solar:pen-linear" />
          </IconButton>
        </Tooltip>,
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
            { title: t('breadcrumbs.management'), path: paths.management.member.root },
            { title: t('breadcrumbs.title') },
          ]}
          action={
            <Button color="secondary" onClick={handleNavigate}>
              <Iconify icon="ic:round-plus" />
              <Typography variant="subtitle2" pl={0.5}>
                {t('button.create_member')}
              </Typography>
            </Button>
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
              {departments.map((department, i) => (
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
        open={deleteConfirm.value}
        onClose={deleteConfirm.onFalse}
        onSubmit={deleteSubmitHandler}
        content={m(t('dialog.delete_content'), [
          employeeForDelete.current?.name,
          employeeForDelete.current?.id,
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

// export default function EmployeeManagement() {
//   const { t } = useTranslate('management')
//   const navigate = useNavigate()

//   const handleNavigate = () => {
//     navigate('create')
//   }

//   const [openEmployeeInfoDialog, setOpenEmployeeInfoDialog] = useState(false)
//   const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null)

//   const [openEmployeeCreateDialog, setOpenEmployeeCreateDialog] = useState(false)

//   const handleOpenEmployeeInfoDialog = (employee: IEmployee) => {
//     setSelectedEmployee(employee)
//     setOpenEmployeeInfoDialog(true)
//   }

//   const handleCloseEmployeeInfoDialog = () => {
//     setOpenEmployeeInfoDialog(false)
//     setSelectedEmployee(null)
//   }

//   const handleCloseEmployeeCreateDialog = () => {
//     setOpenEmployeeCreateDialog(false)
//   }

//   const { data: employees = [] } = useQuery({
//     queryKey: ['employees'],

//     queryFn: fetchEmployees,
//   })

//   return (
//     <Stack spacing={5}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center">
//         <Typography variant="h5">{t('employee_management')}</Typography>
//         <Button variant="contained" onClick={() => handleNavigate()}>
//           {t('create_employee')}
//         </Button>
//       </Stack>
//       <Stack>
//         {employees.map((employee: IEmployee) => (
//           <Stack key={employee.id}>
//             <Stack direction="row" alignItems="center" padding={2}>
//               <Typography
//                 onClick={() => handleOpenEmployeeInfoDialog(employee)}
//                 sx={{ cursor: 'pointer' }}
//               >
//                 {employee.name}
//               </Typography>
//             </Stack>
//             <Divider />
//           </Stack>
//         ))}
//       </Stack>
//       <Pagination count={10} sx={{ display: 'flex', justifyContent: 'center' }} />
//       <EmployeeInfoDialog
//         open={openEmployeeInfoDialog}
//         employee={selectedEmployee}
//         onClose={handleCloseEmployeeInfoDialog}
//       />
//       <EmployeeCreateDialog
//         open={openEmployeeCreateDialog}
//         onClose={handleCloseEmployeeCreateDialog}
//       />
//     </Stack>
//   )
// }
