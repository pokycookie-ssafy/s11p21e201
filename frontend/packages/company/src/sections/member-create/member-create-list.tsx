import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'

import { Box, Stack, alpha, Checkbox, TextField, IconButton } from '@mui/material'

import { Iconify } from '@e201/ui'

interface IProps {
  employeeNo?: string
  employeeName?: string
  onChange?: (no?: string, name?: string) => void
  onDelete?: () => void
}

export default function MemberCreateList({ employeeName, employeeNo, onChange, onDelete }: IProps) {
  const { t } = useTranslate('member')

  const [no, setNo] = useState<string | undefined>(undefined)
  const [name, setName] = useState<string | undefined>(undefined)

  const employeeNoBlur = () => {
    if (onChange) {
      onChange(no, name)
    }
  }

  const employeeNameBlur = () => {
    if (onChange) {
      onChange(no, name)
    }
  }

  useEffect(() => {
    if (employeeName !== name) {
      setName(employeeName)
    }
    if (employeeNo !== no) {
      setNo(employeeNo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeName, employeeNo])

  return (
    <Stack
      component="li"
      direction="row"
      alignItems="center"
      spacing={1}
      height={56}
      px={1}
      sx={{ borderBottom: (theme) => `1px solid ${alpha(theme.palette.divider, 0.3)}` }}
    >
      <Box width={50}>
        <Checkbox />
      </Box>
      <TextField
        value={no ?? ''}
        onChange={(e) => setNo(e.target.value)}
        variant="standard"
        onBlur={employeeNoBlur}
        InputProps={{ disableUnderline: true }}
        inputProps={{ style: { fontSize: 14, fontWeight: 500 } }}
        placeholder={t('label.enter_employee_no')}
        sx={{ width: 200 }}
      />
      <TextField
        value={name ?? ''}
        onChange={(e) => setName(e.target.value)}
        variant="standard"
        onBlur={employeeNameBlur}
        InputProps={{ disableUnderline: true }}
        inputProps={{ style: { fontSize: 14, fontWeight: 500 } }}
        placeholder={t('label.enter_employee_name')}
        sx={{ flex: 1 }}
      />
      <IconButton color="error" onClick={onDelete}>
        <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
      </IconButton>
    </Stack>
  )
}
