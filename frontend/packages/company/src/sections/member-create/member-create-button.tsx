import { Button } from '@mui/material'
import { styled } from '@mui/material/styles' // MUI 컴포넌트들
import { useTranslate } from '@/locales'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

interface FileUploadButtonProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function MemberCreateButton({ onFileUpload }: FileUploadButtonProps) {
  const { t } = useTranslate('member')
  return (
    <Button variant="contained" component="label" sx={{ alignSelf: 'center', height: 'auto' }}>
      {t('upload_excel')}
      <VisuallyHiddenInput type="file" accept=".xlsx, .xls" onChange={onFileUpload} />
    </Button>
  )
}
