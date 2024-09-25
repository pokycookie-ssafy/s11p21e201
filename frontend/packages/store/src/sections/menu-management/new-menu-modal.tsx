import { SelectCreatable } from '@/components/select'

import { Box, Stack, Dialog, Button, TextField } from '@mui/material'

import { Typography } from '@e201/ui'

interface IProps {
  open: boolean
  onClose: () => void
  categories: string[]
  onSubmit?: () => void
}

export default function NewMenuModal({ open, onClose, categories, onSubmit }: IProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box p={2}>
        <Typography variant="h5" fontWeight={800} mb={2} pl={0.5}>
          메뉴 추가
        </Typography>
        <Stack spacing={1}>
          <TextField label="메뉴 이름" />
          <SelectCreatable
            options={categories.map((category) => ({ label: category, value: category }))}
          />
          <TextField label="가격" />
          <Button size="large">메뉴 추가</Button>
        </Stack>
      </Box>
    </Dialog>
  )
}
