import type { IMenu } from '@/types/menu'
import type { SelectChangeEvent } from '@mui/material'
import type { GridColDef, GridRowParams } from '@mui/x-data-grid'

import api from '@/configs/api'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fNumber, useBoolean } from '@e201/utils'
import { Breadcrumbs } from '@/components/breadcrumbs'
import NewMenuModal from '@/sections/menu-management/new-menu-modal'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Tab, Card, Tabs, Stack, Button, TextField, IconButton } from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

export default function MenuManagementView() {
  const [tab, setTab] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<Set<string>>(new Set())

  const newMenuModal = useBoolean()

  const queryFn = async () => {
    const response = await axios.get<IMenu[]>(api.menu.list)
    return response.data
  }

  const { data, isPending, isError } = useQuery({ queryKey: [api.menu.list], queryFn })

  const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', flex: 1, minWidth: 100 },
    { field: 'category', headerName: '분류' },
    {
      field: 'price',
      headerName: '가격',
      valueFormatter: (value: number) => `${fNumber(value)}원`,
    },
    {
      field: 'action',
      type: 'actions',
      align: 'left',
      getActions: (params: GridRowParams) => [
        <IconButton>
          <Iconify icon="solar:pen-linear" />
        </IconButton>,
        <IconButton color="error">
          <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
        </IconButton>,
      ],
    },
  ]

  const categories = useMemo(() => {
    if (!data) {
      return []
    }
    const categorySet = new Set<string>()
    data.forEach((menu) => {
      if (menu.category) {
        categorySet.add(menu.category)
      }
    })
    return Array.from(categorySet)
  }, [data])

  if (isError) {
    return 'Error'
  }

  const categoryFilterHandler = (e: SelectChangeEvent<string[]>) => {
    setCategoryFilter(new Set(e.target.value))
  }

  return (
    <>
      <Box>
        <Breadcrumbs
          title="메뉴 관리"
          routes={[{ title: '관리', path: paths.management.menu }, { title: '메뉴 관리' }]}
          action={
            <Button onClick={newMenuModal.onTrue}>
              <Iconify icon="ic:round-plus" />
              <Typography variant="subtitle2" pl={0.5}>
                메뉴 추가
              </Typography>
            </Button>
          }
        />
        <Card>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <Tab label="전체" value={null} key={0} />
            {categories.map((category, i) => (
              <Tab label={category} value={category} key={i + 1} />
            ))}
          </Tabs>
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
          <DataGrid
            columns={columns}
            rows={data}
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
      </Box>
      <NewMenuModal
        open={newMenuModal.value}
        onClose={newMenuModal.onFalse}
        categories={categories}
      />
    </>
  )
}
