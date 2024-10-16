import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import type { IMenu, IMenuEditRequest, IMenuCreateRequest } from '@/types/menu'

import { toast } from 'sonner'
import api from '@/configs/api'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useRef, useMemo, useState } from 'react'
import { DialogDelete } from '@/components/dialog'
import { m, fNumber, useBoolean } from '@e201/utils'
import NewMenuModal from '@/sections/menu-management/new-menu-modal'
import EditMenuModal from '@/sections/menu-management/edit-menu-modal'
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
  IconButton,
} from '@mui/material'

import { Iconify, Typography, Breadcrumbs } from '@e201/ui'

export default function MenuManagementView() {
  const { t } = useTranslate('menu-management')

  const [tab, setTab] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [selected, setSelected] = useState<GridRowSelectionModel>([])

  const newMenuModal = useBoolean()
  const editMenuModal = useBoolean()
  const deleteConfirm = useBoolean()
  const deleteAllConfirm = useBoolean()

  const menuForDelete = useRef<IMenu | null>(null)
  const menuForEdit = useRef<IMenu | null>(null)

  const queryClient = useQueryClient()

  const queryFn = async () => {
    const response = await axios.get<IMenu[]>(api.menu.list)
    return response.data
  }

  const { data: menus, isPending, isError } = useQuery({ queryKey: [api.menu.list], queryFn })
  const { mutate: createMenu } = useMutation({
    mutationKey: [api.menu.create],
    mutationFn: async ({ name, price, category }: IMenuCreateRequest) => {
      const response = await axios.post(api.menu.create, { name, price, category })
      return response.data
    },
  })
  const { mutate: deleteMenu } = useMutation({
    mutationKey: [api.menu.delete],
    mutationFn: async (menuId: string) => {
      const response = await axios.delete(api.menu.deleteWithId(menuId))
      return response.data
    },
  })
  const { mutate: editMenu } = useMutation({
    mutationKey: [api.menu.edit],
    mutationFn: async ({ menuId, name, price, category }: IMenuEditRequest) => {
      const response = await axios.put(api.menu.editWithId(menuId), { name, price, category })
      return response.data
    },
  })

  const createMenuHandler = (req: IMenuCreateRequest) => {
    createMenu(req, {
      onSuccess: () => {
        toast.success(t('toast.create'))
        queryClient.invalidateQueries({ queryKey: [api.menu.list] })
        newMenuModal.onFalse()
      },
    })
  }

  const deleteMenuHandler = () => {
    if (!menuForDelete.current) {
      return
    }
    deleteMenu(menuForDelete.current.id, {
      onSuccess: () => {
        toast.success(t('toast.delete'))
        queryClient.invalidateQueries({ queryKey: [api.menu.list] })
        deleteConfirm.onFalse()
        deleteAllConfirm.onFalse()
      },
    })
  }

  const deleteAllHandler = () => {
    selected.forEach((id) => {
      deleteMenu(id as string, {
        onSuccess: () => {
          toast.success(t('toast.delete'))
          queryClient.invalidateQueries({ queryKey: [api.menu.list] })
          deleteConfirm.onFalse()
          deleteAllConfirm.onFalse()
        },
      })
    })
  }

  const editMenuHandler = (data: Omit<IMenuEditRequest, 'menuId'>) => {
    if (!menuForEdit.current) {
      return
    }
    editMenu(
      {
        menuId: menuForEdit.current.id,
        name: data.name,
        price: data.price,
        category: data.category,
      },
      {
        onSuccess: () => {
          toast.success(t('toast.edit'))
          queryClient.invalidateQueries({ queryKey: [api.menu.list] })
          editMenuModal.onFalse()
        },
      }
    )
  }

  const filteredMenus = useMemo<IMenu[]>(() => {
    if (!menus) {
      return []
    }

    let filtered = [...menus]
    if (tab !== null) {
      filtered = filtered.filter((menu) => menu.category === tab)
    }
    if (search.trim() !== '') {
      filtered = filtered.filter((menu) => menu.name.includes(search.trim()))
    }
    return filtered
  }, [menus, search, tab])

  const categories = useMemo(() => {
    if (!menus) {
      return []
    }
    const categorySet = new Set<string>()
    menus.forEach((menu) => {
      if (menu.category) {
        categorySet.add(menu.category)
      }
    })
    return Array.from(categorySet)
  }, [menus])

  const editButtonHandler = (menu: IMenu) => {
    menuForEdit.current = menu
    editMenuModal.onTrue()
  }

  const deleteButtonHandler = (menu: IMenu) => {
    menuForDelete.current = menu
    deleteConfirm.onTrue()
  }

  const columns: GridColDef<IMenu>[] = [
    { field: 'name', headerName: t('field.name'), flex: 1, minWidth: 100 },
    { field: 'category', headerName: t('field.category'), width: 100 },
    {
      field: 'price',
      headerName: t('field.price'),
      type: 'number',
      width: 100,
      valueFormatter: (value: number) => `${fNumber(value)}${t('unit.won')}`,
    },
    {
      field: 'action',
      type: 'actions',
      align: 'left',
      getActions: (params) => [
        <Tooltip title={t('tooltip.edit')} disableInteractive>
          <IconButton onClick={() => editButtonHandler(params.row)}>
            <Iconify icon="solar:pen-linear" />
          </IconButton>
        </Tooltip>,
        <Tooltip title={t('tooltip.delete')} disableInteractive>
          <IconButton color="error" onClick={() => deleteButtonHandler(params.row)}>
            <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
          </IconButton>
        </Tooltip>,
      ],
    },
  ]

  if (isError) {
    return 'Error'
  }

  return (
    <>
      <Box>
        <Breadcrumbs
          title={t('breadcrumbs.menu_management')}
          routes={[
            { title: t('breadcrumbs.management'), path: paths.management.menu },
            { title: t('breadcrumbs.menu_management') },
          ]}
          action={
            <Button onClick={newMenuModal.onTrue} color="secondary">
              <Iconify icon="ic:round-plus" />
              <Typography variant="subtitle2" pl={0.5}>
                {t('button.create_menu')}
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
              {categories.map((category, i) => (
                <Tab label={category} value={category} key={i + 1} />
              ))}
            </Tabs>
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              label={t('label.search')}
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
            rows={filteredMenus}
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
      {newMenuModal.value && (
        <NewMenuModal
          open={newMenuModal.value}
          onClose={newMenuModal.onFalse}
          categories={categories}
          onSubmit={createMenuHandler}
        />
      )}
      {editMenuModal.value && (
        <EditMenuModal
          data={menuForEdit.current}
          open={editMenuModal.value}
          onClose={editMenuModal.onFalse}
          categories={categories}
          onSubmit={editMenuHandler}
        />
      )}
      <DialogDelete
        open={deleteConfirm.value}
        onClose={deleteConfirm.onFalse}
        onSubmit={deleteMenuHandler}
        content={m(t('dialog.delete_content'), [menuForDelete.current?.name ?? ''])}
      />
      <DialogDelete
        open={deleteAllConfirm.value}
        onClose={deleteAllConfirm.onFalse}
        onSubmit={deleteAllHandler}
        title={t('dialog.delete_all')}
        content={m(t('dialog.delete_all_content'), [selected.length])}
      />
    </>
  )
}
