import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { Box } from '@mui/material'

export default function ContractNewManagementView() {
  const { t } = useTranslate('contract-management')

  return (
    <Box>
      <Breadcrumbs
        title={t('breadcrumbs.contract_create')}
        routes={[
          { title: t('breadcrumbs.management'), path: paths.management.menu },
          { title: t('breadcrumbs.contract_management'), path: paths.management.contract.now },
          { title: t('breadcrumbs.contract_create') },
        ]}
      />
    </Box>
  )
}
