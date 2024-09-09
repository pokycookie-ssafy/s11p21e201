import { useTranslate } from '@/locales'

import { Box, Stack, Checkbox, Typography, FormControlLabel } from '@mui/material'

import { ScrollContainer } from '@e201/ui'

interface IProps {
  title: string
  term: string
  checked: boolean
  onCheck?: () => void
}

export default function Term({ title, term, checked, onCheck }: IProps) {
  const { t } = useTranslate('sign-up')

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" sx={{ pl: 1 }}>
        {title}
      </Typography>
      <Box
        sx={{ borderRadius: 1, border: (theme) => `1px solid ${theme.palette.divider}` }}
        overflow="hidden"
      >
        <ScrollContainer sx={{ maxHeight: 400, p: 2 }}>
          <Typography variant="caption" whiteSpace="pre-wrap">
            {term}
          </Typography>
        </ScrollContainer>
      </Box>

      <Stack direction="row" justifyContent="flex-end" sx={{ userSelect: 'none' }}>
        <FormControlLabel
          label={t('button.agree')}
          control={<Checkbox onClick={onCheck} checked={checked} />}
        />
      </Stack>
    </Stack>
  )
}
