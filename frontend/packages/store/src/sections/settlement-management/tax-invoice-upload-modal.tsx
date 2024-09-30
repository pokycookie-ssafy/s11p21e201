import { useState } from 'react'
import paths from '@/configs/paths'

import { Stack, Dialog, Button } from '@mui/material'

import { Upload, Breadcrumbs } from '@e201/ui'

interface IProps {
  open: boolean
  onClose: () => void
  onSubmit?: (file: File) => void
}

export default function TaxInvoiceUploadModal({ open, onClose, onSubmit }: IProps) {
  const [file, setFile] = useState<File | null>(null)

  const fileHandler = (files: File[]) => {
    if (files && files.length > 0) {
      setFile(files[0])
      return
    }
    setFile(null)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Stack p={3}>
        <Breadcrumbs
          title="정산 관리"
          routes={[
            { title: '관리', path: paths.management.menu },
            { title: '정산 관리', path: paths.management.settlement.date },
            { title: '회사별 관리', path: paths.management.settlement.company },
            { title: '세금계산서 업로드' },
          ]}
        />
        <Stack spacing={1}>
          <Upload placeholder="세금계산서를 업로드해주세요" onChange={fileHandler} />
          <Button disabled={file === null}>업로드</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}
