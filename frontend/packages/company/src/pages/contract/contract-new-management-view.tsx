import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'
import BusinessLicenseForm from '@/sections/contract-management/business-license-form'

import { Box, Button, TextField } from '@mui/material'

import { Upload, Container } from '@e201/ui'

interface ISignUpResponse {
  companyName: string
  repName: string
  address: string
  registerNumber: string
  type: string
  openDate: string
}

export default function ContractNewManagementView() {
  const { t } = useTranslate('contract')

  const [file, setFile] = useState<File | null>(null)

  const queryFn = async () => {
    const response = await axios.post<ISignUpResponse>('/', {})
    return response.data
  }

  const {
    data: licenseData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['/', file],
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
            defaultValue={25}
            fullWidth
            label={t('settlement_date')}
          />
          <Button sx={{ mt: 2 }} fullWidth>
            {t('request_contract')}
          </Button>
        </>
      )}
    </Container>
  )
}
