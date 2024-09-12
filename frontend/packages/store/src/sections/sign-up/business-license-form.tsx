import { useTranslate } from '@/locales'

import { Box, Stack, useTheme, TextField, useMediaQuery, CircularProgress } from '@mui/material'

interface ILicense {
  companyName: string
  repName: string
  address: string
  registerNumber: string
  type: string
  openDate: string
}

interface IProps {
  license?: ILicense
  isPending?: boolean
}

export default function BusinessLicenseForm({ license, isPending }: IProps) {
  const { t } = useTranslate('sign-up')

  const { breakpoints } = useTheme()
  const stackDirection = useMediaQuery(breakpoints.up('md')) ? 'row' : 'column'

  return (
    <Box position="relative" pt={2}>
      <Stack spacing={2}>
        <TextField
          sx={{ width: 1 }}
          label={t('form.rep_name')}
          value={license?.repName ?? ''}
          size="small"
          aria-readonly
          disabled={isPending}
        />

        <Stack spacing={2} direction={stackDirection}>
          <TextField
            sx={{ width: 1 }}
            label={t('form.company_name')}
            value={license?.companyName ?? ''}
            size="small"
            aria-readonly
            disabled={isPending}
          />
          <TextField
            sx={{ width: 1 }}
            label={t('form.register_number')}
            value={license?.registerNumber ?? ''}
            size="small"
            aria-readonly
            disabled={isPending}
          />
        </Stack>

        <Stack spacing={2} direction={stackDirection}>
          <TextField
            sx={{ width: 1 }}
            label={t('form.open_date')}
            value={license?.openDate ?? ''}
            size="small"
            aria-readonly
            disabled={isPending}
          />
          <TextField
            sx={{ width: 1 }}
            label={t('form.type')}
            value={license?.type ?? ''}
            size="small"
            aria-readonly
            disabled={isPending}
          />
        </Stack>

        <TextField
          label={t('form.company_address')}
          value={license?.address ?? ''}
          size="small"
          aria-readonly
          disabled={isPending}
        />
      </Stack>

      {isPending && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ width: 1, height: 1 }}
          spacing={1}
          position="absolute"
          left={0}
          top={0}
        >
          <CircularProgress />
        </Stack>
      )}
    </Box>
  )
}
