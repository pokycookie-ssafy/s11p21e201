import paths from '@/configs/paths'
import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CompanyForm from '@/sections/sign-in/company-form'
import ManagerForm from '@/sections/sign-in/manager-form'

import { Box, Tab, Tabs } from '@mui/material'

type LoginType = 'company' | 'manager'

export default function SignInView() {
  const { t } = useTranslate('sign-in')

  const { isLogin } = useAuthStore()

  const navigate = useNavigate()

  const [tab, setTab] = useState<LoginType>('company')

  useEffect(() => {
    if (isLogin) {
      navigate(paths.main)
    }
  }, [isLogin, navigate])

  return (
    <Box p={2} borderRadius={1} sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
      <Box mb={4} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Tabs variant="fullWidth" value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label={t('tab.company')} value="company" />
          <Tab label={t('tab.manager')} value="manager" />
        </Tabs>
      </Box>
      {tab === 'company' ? <CompanyForm /> : <ManagerForm />}
    </Box>
  )
}
