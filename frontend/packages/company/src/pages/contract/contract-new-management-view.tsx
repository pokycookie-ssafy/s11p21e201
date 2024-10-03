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
import BusinessLicenseForm from '@/sections/contract-management/business-license-form'

import { Box, Button, TextField } from '@mui/material'

import { Upload, Container, Breadcrumbs } from '@e201/ui'

export default function ContractNewManagementView() {
  const { t } = useTranslate('contract')

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
        settlementDate: Number.parseInt(settlementDate),
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
      return <Box>Error</Box>
    }
    return <BusinessLicenseForm isPending={isPending} license={licenseData} />
  }, [isError, licenseData, file, isPending])

  return (
    <Container maxWidth="sm" sx={{ p: 0 }}>
      <Breadcrumbs
        title={t('add_contract')}
        routes={[
          { title: t('contract_management'), path: paths.management.contract.now },
          { title: t('request_contract'), path: paths.management.contract.request },
          { title: t('add_contract') },
        ]}
      />

      <Upload placeholder={t('license_upload')} onChange={fileChangeHandler} />
      {BusinessLicenseFormRender}

      {!licenseData || file === null ? (
        <Button sx={{ mt: 2 }} fullWidth disabled>
          {t('need_ocr')}
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
            label={t('settlement_date')}
          />
          <Button sx={{ mt: 2 }} fullWidth onClick={submitHandler}>
            {t('request_contract')}
          </Button>
        </>
      )}
    </Container>
  )
}
