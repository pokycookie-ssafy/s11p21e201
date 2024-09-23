import { useState } from 'react'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useQuery } from '@tanstack/react-query'
import ManagerInfoDialog from '@/sections/member-management/manager-infodialog'
import ManagerCreateDialog from '@/sections/member-management/manager-createdialog'

import { Stack, Button, Divider, Typography, Pagination } from '@mui/material'

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
}

export default function ManagerManagement() {
  const { t } = useTranslate('management')

  const [openManagerInfoDialog, setOpenManagerInfoDialog] = useState(false)
  const [selectedManager, setSelectedManager] = useState<IManager | null>(null)

  const [openManagerCreateDialog, setOpenManagerCreateDialog] = useState(false)

  const handleOpenManagerInfoDialog = (manager: IManager) => {
    setSelectedManager(manager)
    setOpenManagerInfoDialog(true)
  }

  const handleCloseManagerInfoDialog = () => {
    setOpenManagerInfoDialog(false)
    setSelectedManager(null)
  }

  const handleOpenManagerCreateDialog = () => {
    setOpenManagerCreateDialog(true)
  }

  const handleCloseManagerCreateDialog = () => {
    setOpenManagerCreateDialog(false)
  }

  const { data: managers = [] } = useQuery({
    queryKey: ['managers'],

    queryFn: fetchManagers,
  })

  return (
    <Stack spacing={5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{t('manager_management')}</Typography>
        <Button variant="contained" onClick={() => handleOpenManagerCreateDialog()}>
          {t('create_manager')}
        </Button>
      </Stack>
      <Stack>
        {managers.map((manager: IManager) => (
          <Stack key={manager.id}>
            <Stack direction="row" alignItems="center" padding={2}>
              <Typography
                onClick={() => handleOpenManagerInfoDialog(manager)}
                sx={{ cursor: 'pointer' }}
              >
                {manager.departmentName}
              </Typography>
            </Stack>
            <Divider />
          </Stack>
        ))}
      </Stack>
      <Pagination count={10} sx={{ display: 'flex', justifyContent: 'center' }} />
      <ManagerInfoDialog
        open={openManagerInfoDialog}
        manager={selectedManager}
        onClose={handleCloseManagerInfoDialog}
      />
      <ManagerCreateDialog
        open={openManagerCreateDialog}
        onClose={handleCloseManagerCreateDialog}
      />
    </Stack>
  )
}
