import paths from '@/configs/paths'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { Box } from '@mui/material'

export default function ContractHistoryManagementView() {
  return (
    <Box>
      <Breadcrumbs
        title="계약 기록"
        routes={[
          { title: '관리', path: paths.management.menu },
          { title: '계약 관리', path: paths.management.contract.root },
          { title: '계약 기록' },
        ]}
      />
    </Box>
  )
}
