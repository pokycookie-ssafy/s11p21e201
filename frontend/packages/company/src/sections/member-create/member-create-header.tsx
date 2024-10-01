import { useTranslate } from '@/locales'

import { Box, Stack, Checkbox } from '@mui/material'

import { Typography } from '@e201/ui'

interface IProps {
  check: boolean
  onCheck: () => void
}

export default function MemberCreateHeader({ check, onCheck }: IProps) {
  const { t } = useTranslate('member')

  return (
    <Stack
      component="li"
      direction="row"
      alignItems="center"
      spacing={1}
      height={56}
      px={1}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Box width={50}>
        <Checkbox checked={check} />
      </Box>
      <Typography fontSize={14} fontWeight={500} width={200}>
        {t('field.employee_number')}
      </Typography>
      <Typography fontSize={14} fontWeight={500} flex={1}>
        {t('field.employee_name')}
      </Typography>
    </Stack>
  )
}
