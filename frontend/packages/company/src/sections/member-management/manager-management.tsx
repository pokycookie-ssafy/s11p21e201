import type { GridColDef, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fNumber } from '@/utils/number-format'
import { useQuery } from '@tanstack/react-query'

import { DataGrid } from '@mui/x-data-grid'
import {
  Card,
  Stack,
  Button,
  Divider,
  Tooltip,
  Collapse,
  TextField,
  Typography,
  Pagination,
  IconButton,
} from '@mui/material'

import { Iconify } from '@e201/ui'

const fetchManagers = async () => {
  const response = await axios.get('/companies/managers')
  return response.data
}

interface IManager {
  id: string
  departmentId: string
  departmentName: String
  supportAmount: number
  spentAmount: number
  createdAt: Date
}

export default function ManagerManagement() {
  const [selected, setSelected] = useState<GridRowSelectionModel>([])
  const [memberSearch, setMemberSearch] = useState<string>('')

  const { t } = useTranslate('member')

  const { data, isPending, isError } = useQuery({
    queryKey: ['managers'],
    queryFn: fetchManagers,
  })

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    let filtered = [...data]
    if (memberSearch.trim() !== '') {
      filtered = filtered.filter((member) => member.departmentName.includes(memberSearch.trim()))
    }
    return filtered
  }, [data, memberSearch])

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('create')
  }

  const columns: GridColDef[] = [
    {
      field: 'departmentName',
      headerName: t('deparment_name'),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'spentAmount',
      headerName: t('spent_amount'),
      width: 150,
      renderCell: (params) => fNumber(params.value),
    },
    { field: 'supportAmount', headerName: t('allotted_amount'), width: 150 },
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
          {t('manager_management')}
        </Typography>
        <Button sx={{ alignSelf: 'center', height: 'auto' }} onClick={() => handleNavigate()}>
          <Iconify icon="ic:round-plus" />
          <Typography variant="subtitle2" pl={0.5}>
            {t('create_manager')}
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

//   return (
//     <Stack spacing={5}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center">
//         <Typography variant="h5">{t('manager_management')}</Typography>
//         <Button variant="contained" onClick={() => handleOpenManagerCreateDialog()}>
//           {t('create_manager')}
//         </Button>
//       </Stack>
//       <Stack>
//         {managers.map((manager: IManager) => (
//           <Stack key={manager.id}>
//             <Stack direction="row" alignItems="center" padding={2}>
//               <Typography
//                 onClick={() => handleOpenManagerInfoDialog(manager)}
//                 sx={{ cursor: 'pointer' }}
//               >
//                 {manager.departmentName}
//               </Typography>
//             </Stack>
//             <Divider />
//           </Stack>
//         ))}
//       </Stack>
//       <Pagination count={10} sx={{ display: 'flex', justifyContent: 'center' }} />
//       <ManagerInfoDialog
//         open={openManagerInfoDialog}
//         manager={selectedManager}
//         onClose={handleCloseManagerInfoDialog}
//       />
//       <ManagerCreateDialog
//         open={openManagerCreateDialog}
//         onClose={handleCloseManagerCreateDialog}
//       />
//     </Stack>
//   )
// }
