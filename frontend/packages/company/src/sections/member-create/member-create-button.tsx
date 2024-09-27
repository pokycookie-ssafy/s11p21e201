import { Button } from '@mui/material'
import { styled } from '@mui/material/styles' // MUI 컴포넌트들

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
  return (
    <Button variant="contained" component="label" sx={{ alignSelf: 'center', height: 'auto' }}>
      엑셀 파일 업로드
      <VisuallyHiddenInput type="file" accept=".xlsx, .xls" onChange={onFileUpload} />
    </Button>
  )
}
