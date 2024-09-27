import type { IMenu } from '@/types/menu'

import api from '@/configs/api'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useBoolean } from '@e201/utils'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'
import menuColumns from '@/sections/menu-management/menu-columns'
import NewMenuModal from '@/sections/menu-management/new-menu-modal'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Tab, Card, Tabs, Stack, Button, TextField } from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

export default function MenuManagementView() {
  const { t } = useTranslate('menu-management')

  const [tab, setTab] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')

  const newMenuModal = useBoolean()

  const queryFn = async () => {
    const response = await axios.get<IMenu[]>(api.menu.list)
    return response.data
  }

  const { data: menus, isPending, isError } = useQuery({ queryKey: [api.menu.list], queryFn })

  const columns = useMemo(() => menuColumns(t), [t])

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

          <DataGrid
            columns={columns}
            rows={filteredMenus}
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
      <NewMenuModal
        open={newMenuModal.value}
        onClose={newMenuModal.onFalse}
        categories={categories}
      />
    </>
  )
}
