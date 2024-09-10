import type { ISignUpResponse } from '@/types/sign-up'

import api from '@/configs/api'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import BusinessLicenseForm from '@/sections/sign-up/business-license-form'

import { Box, Stack, Button, useTheme, TextField, Typography, useMediaQuery } from '@mui/material'

import { Upload } from '@e201/ui'

interface IProps {
  onNext: () => void
}

export default function SignUpFormView({ onNext }: IProps) {
  const { t } = useTranslate('sign-up')

  const { breakpoints } = useTheme()
  const stackDirection = useMediaQuery(breakpoints.up('md')) ? 'row' : 'column'

  const [file, setFile] = useState<File | null>(null)

  const queryFn = async () => {
    const response = await axios.post<ISignUpResponse>(api.signUp.ocr, {})
    return response.data
  }

  const {
    data: licenseData,
    isPending,
    isError,
  } = useQuery({
    queryKey: [api.signUp.ocr, file],
    queryFn,
    enabled: !!file,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const fileChangeHandler = (files: File[]) => {
    if (files.length === 0) {
      setFile(null)
      return
    }
    setFile(files[0])
  }

  const submitHandler = () => {
    onNext()
  }

  const BusinessLicenseFormRender = useMemo(() => {
    if (!file) {
      return null
    }
    if (isError) {
      return <Box>Error</Box>
    }
    return <BusinessLicenseForm isPending={isPending} license={licenseData} />
  }, [isError, licenseData, file, isPending])

  return (
    <Stack spacing={4}>
      <Stack spacing={4} direction={stackDirection}>
        <Stack spacing={1} width={1} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ pl: 1, pb: 1 }}>
            {t('title.user')}
          </Typography>
          <TextField fullWidth label={t('form.email')} size="small" />
          <TextField fullWidth label={t('form.password')} size="small" type="password" />
          <TextField fullWidth label={t('form.password_confirm')} size="small" type="password" />
          <TextField fullWidth label={t('form.phone')} size="small" type="tel" />
        </Stack>

        <Stack spacing={1} width={1} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ pl: 1, pb: 1 }}>
            {t('title.account')}
          </Typography>
          <TextField fullWidth label={t('form.bank')} size="small" />
          <TextField fullWidth label={t('form.account')} size="small" />
        </Stack>
      </Stack>

      <Stack spacing={1} width={1} sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ pl: 1, pb: 1 }}>
          {t('title.business')}
        </Typography>
        <Upload placeholder={t('form.upload')} onChange={fileChangeHandler} />
        {BusinessLicenseFormRender}
      </Stack>

      <Button onClick={submitHandler}>{t('button.next')}</Button>
    </Stack>
  )
}
