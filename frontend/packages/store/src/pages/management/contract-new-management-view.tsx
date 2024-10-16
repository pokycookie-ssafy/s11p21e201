import type { ILicenseOcr } from '@/types/ocr'
import type { IContractCreateRequest } from '@/types/contract'

import api from '@/configs/api'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import BusinessLicenseForm from '@/sections/sign-up/business-license-form'

import { Stack, Button, TextField } from '@mui/material'

import { Upload, Iconify, Container, Typography, Breadcrumbs } from '@e201/ui'

export default function ContractNewManagementView() {
  const { t } = useTranslate('contract-management')

  const navigate = useNavigate()

  const { user } = useAuthStore()

  const [file, setFile] = useState<File | null>(null)
  const [settlementDate, setSettlementDate] = useState('25')

  const queryFn = async () => {
    const formData = new FormData()
    if (!file) {
      return undefined
    }
    formData.append('image', file)

    const response = await axios.post<ILicenseOcr>(api.common.ocr, formData, {
      headers: {
        'Content-Type': 'multipart/formdata',
      },
    })
    return response.data
  }

  const {
    data: licenseData,
    isPending,
    isError,
  } = useQuery({
    queryKey: [api.common.ocr, file],
    queryFn,
    enabled: !!file,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  })

  const fileChangeHandler = (files: File[]) => {
    if (files.length === 0) {
      setFile(null)
      return
    }
    setFile(files[0])
  }

  const submitHandler = async () => {
    try {
      if (!user || !licenseData) {
        return
      }
      const req: IContractCreateRequest = {
        senderId: user.id,
        receiverRegisterNumber: licenseData.registerNumber,
        settlementDay: Number.parseInt(settlementDate),
      }
      await axios.post(api.contract.create, req)
      navigate(paths.management.contract.now)
    } catch (error) {
      console.error(error)
    }
  }

  const BusinessLicenseFormRender = useMemo(() => {
    if (!file) {
      return null
    }
    if (isError) {
      return (
        <Stack
          width={1}
          height={200}
          justifyContent="center"
          alignItems="center"
          borderRadius={1}
          spacing={1}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <Iconify icon="fluent:document-error-24-filled" width={40} />
          <Typography fontSize={14} fontWeight={400}>
            {t('error.ocr')}
          </Typography>
        </Stack>
      )
    }
    return <BusinessLicenseForm isPending={isPending} license={licenseData} />
  }, [isError, licenseData, file, isPending, t])

  return (
    <Container maxWidth="sm" sx={{ p: 0 }}>
      <Breadcrumbs
        title={t('breadcrumbs.contract_create')}
        routes={[
          { title: t('breadcrumbs.management'), path: paths.management.menu },
          { title: t('breadcrumbs.contract_management'), path: paths.management.contract.now },
          { title: t('breadcrumbs.contract_create') },
        ]}
      />

      <Upload placeholder={t('label.license_upload')} onChange={fileChangeHandler} />
      {BusinessLicenseFormRender}

      {!licenseData || file === null ? (
        <Button sx={{ mt: 2 }} fullWidth disabled>
          {t('button.need_ocr')}
        </Button>
      ) : (
        <>
          <TextField
            type="number"
            sx={{ mt: 2 }}
            size="small"
            value={settlementDate}
            onChange={(e) => setSettlementDate(e.target.value)}
            fullWidth
            label={t('field.settlement_date')}
          />
          <Button sx={{ mt: 2 }} fullWidth onClick={submitHandler}>
            {t('button.request_contract')}
          </Button>
        </>
      )}
    </Container>
  )
}
