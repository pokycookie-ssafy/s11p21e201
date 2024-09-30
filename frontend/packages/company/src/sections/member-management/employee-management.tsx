import type { GridColDef, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import axios from '@/configs/axios'
// import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
// import EmployeeInfoDialog from '@/sections/member-management/employee-infodialog'
// import EmployeeCreateDialog from '@/sections/member-management/employee-createdialog'
import { fNumber } from '@/utils/number-format'

import { DataGrid } from '@mui/x-data-grid'
import {
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
  const [selected, setSelected] = useState<GridRowSelectionModel>([])
  const [memberSearch, setMemberSearch] = useState<string>('')

  const { t } = useTranslate('member')
  const { data, isPending } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  })

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    let filtered = [...data]
    if (memberSearch.trim() !== '') {
      filtered = filtered.filter((member) => member.name.includes(memberSearch.trim()))
    }
    return filtered
  }, [data, memberSearch])

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('create')
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('name'),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'spentAmount',
      headerName: t('spent_amount'),
      width: 150,
      renderCell: (params) => fNumber(params.value),
    },
    {
      field: 'supportAmount',
      headerName: t('allotted_amount'),
      width: 150,
      renderCell: (params) => fNumber(params.value),
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
      field: 'action',
      type: 'actions',
      align: 'left',
      resizable: false,
      getActions: (params: GridRowParams) => [
        <Tooltip title={t('edit_info')} arrow disableInteractive>
          <IconButton>
            <Iconify icon="solar:pen-linear" />
          </IconButton>
        </Tooltip>,
        <Tooltip title={t('delete')} arrow disableInteractive>
          <IconButton color="error">
            <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
          </IconButton>
        </Tooltip>,
      ],
    },
  ]

  return (
    <Stack gap={3}>
      {/* <Breadcrumbs
        title="계약 요청"
        routes={[
          { title: '관리', path: paths.management.contract.root },
          { title: '계약 관리', path: paths.management.contract.root },
          { title: '계약 요청' },
          ]}
          action={
            <Button>
            <Iconify icon="ic:round-plus" />
            <Typography variant="subtitle2" pl={0.5}>
              직원 계정 추가
            </Typography>
          </Button>
        }
      /> */}
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3" fontWeight={800}>
          {t('employee_management')}
        </Typography>
        <Button sx={{ alignSelf: 'center', height: 'auto' }} onClick={() => handleNavigate()}>
          <Iconify icon="ic:round-plus" />
          <Typography variant="subtitle2" pl={0.5}>
            {t('create_employee')}
          </Typography>
        </Button>
      </Stack>

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
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
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
            <Typography variant="subtitle1">{selected.length} selected</Typography>
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
    </Stack>
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
