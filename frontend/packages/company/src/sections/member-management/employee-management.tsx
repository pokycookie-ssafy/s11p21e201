import type { GridColDef, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import { useState } from 'react'
import axios from '@/configs/axios'
// import paths from '@/configs/paths'
// import { useTranslate } from '@/locales'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
// import EmployeeInfoDialog from '@/sections/member-management/employee-infodialog'
// import EmployeeCreateDialog from '@/sections/member-management/employee-createdialog'

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

  const { data, isPending, isError } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  })

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('create')
  }
  const handleRowSelectionChange = (selection: GridRowSelectionModel) => {
    setSelected(selection)
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '이름',
      flex: 1,
      minWidth: 150,
    },
    { field: 'spentAmount', headerName: '사용량', width: 150 },
    { field: 'supportAmount', headerName: '할당 금액', width: 150 },
    {
      field: 'createdAt',
      type: 'date',
      headerName: '계정 생성일',
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
        <Tooltip title="정보 수정" arrow disableInteractive>
          <IconButton>
            <Iconify icon="solar:pen-linear" />
          </IconButton>
        </Tooltip>,
        <Tooltip title="삭제" arrow disableInteractive>
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
          직원 관리
        </Typography>
        <Button sx={{ alignSelf: 'center', height: 'auto' }} onClick={() => handleNavigate()}>
          <Iconify icon="ic:round-plus" />
          <Typography variant="subtitle2" pl={0.5}>
            직원 계정 추가
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
            <TextField size="small" label="search" fullWidth />
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
              <Tooltip title="일괄 수락" arrow disableInteractive>
                <IconButton color="success">
                  <Iconify icon="iconamoon:check-bold" />
                </IconButton>
              </Tooltip>
              <Tooltip title="일괄 거절" arrow disableInteractive>
                <IconButton color="error">
                  <Iconify icon="gravity-ui:xmark" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Collapse>

        <DataGrid
          columns={columns}
          rows={data}
          // rows={data || []} // 데이터가 없을 경우 빈 배열로 설정
          // getRowId={(row) => row.id} // 각 행의 고유한 id로 사용
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
