import type { IBankResponse, ISignUpResponse } from '@/types/sign-up'

import api from '@/configs/api'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FormInput } from '@/components/form/form-input'
import BusinessLicenseForm from '@/sections/sign-up/business-license-form'

import {
  Box,
  Stack,
  Button,
  useTheme,
  MenuItem,
  Typography,
  useMediaQuery,
  CircularProgress,
} from '@mui/material'

import { Upload } from '@e201/ui'

interface IForm {
  email: string
  password: string
  passwordConfirm: string
  phone: string
  bank: string
  account: string
  companyName: string
  repName: string
  address: string
  registerNumber: string
  type: string
  openDate: string
}

interface IProps {
  onNext: () => void
}

export default function SignUpFormView({ onNext }: IProps) {
  const { t } = useTranslate('sign-up')

  const { breakpoints } = useTheme()
  const stackDirection = useMediaQuery(breakpoints.up('md')) ? 'row' : 'column'

  const [file, setFile] = useState<File | null>(null)

  const formMethod = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      bank: '',
      account: '',
      companyName: '',
      repName: '',
      address: '',
      registerNumber: '',
      type: '',
      openDate: '',
    },
  })
  const { control, watch } = formMethod

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

  const queryFn2 = async () => {
    const response = await axios.get<IBankResponse[]>(api.signUp.bank)
    return response.data
  }

  const {
    data: bankData,
    isPending: bankPending,
    isError: bankError,
  } = useQuery({
    queryKey: [api.signUp.bank],
    queryFn: queryFn2,
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

  const BankDataOptions = useMemo(() => {
    if (bankPending) {
      return (
        <Stack p={0.5} justifyContent="center" alignItems="center">
          <CircularProgress size={20} />
        </Stack>
      )
    }
    if (bankError) {
      return (
        <Stack p={0.5} justifyContent="center" alignItems="center">
          <Typography>{t('error.bank')}</Typography>
        </Stack>
      )
    }
    return bankData.map((option, i) => (
      <MenuItem key={i} value={option.bankCode}>
        {option.bankName}
      </MenuItem>
    ))
  }, [bankData, bankError, bankPending, t])

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
    <form onSubmit={formMethod.handleSubmit(submitHandler)} noValidate>
      <Stack spacing={4}>
        <Stack spacing={4} direction={stackDirection}>
          <Stack spacing={2} width={1} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ pl: 1 }}>
              {t('title.user')}
            </Typography>
            <FormInput
              name="email"
              control={control}
              rules={{
                required: t('validate.email.required'),
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: t('validate.email.pattern'),
                },
              }}
              label={t('form.email')}
              type="email"
            />
            <FormInput
              name="password"
              control={control}
              rules={{
                required: t('validate.password.required'),
                minLength: {
                  value: 8,
                  message: t('validate.password.minLength'),
                },
              }}
              label={t('form.password')}
              type="password"
            />
            <FormInput
              name="passwordConfirm"
              control={control}
              rules={{
                required: t('validate.password_confirm.validate'),
                validate: {
                  confirm: (value) =>
                    value === watch('password') || t('validate.password_confirm.validate'),
                },
              }}
              label={t('form.password_confirm')}
              type="password"
            />
            <FormInput
              name="phone"
              control={control}
              rules={{
                required: t('validate.phone.required'),
              }}
              label={t('form.phone')}
              type="tel"
            />
          </Stack>

          <Stack spacing={2} width={1} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ pl: 1 }}>
              {t('title.account')}
            </Typography>
            <FormInput name="bank" control={control} label={t('form.bank')} select>
              {BankDataOptions}
            </FormInput>
            <FormInput name="account" control={control} label={t('form.account')} />
          </Stack>
        </Stack>

        <Stack spacing={2} width={1} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ pl: 1 }}>
            {t('title.business')}
          </Typography>
          <Upload placeholder={t('form.upload')} onChange={fileChangeHandler} />
          {BusinessLicenseFormRender}
        </Stack>

        <Button type="submit">{t('button.next')}</Button>
      </Stack>
    </form>
  )
}
