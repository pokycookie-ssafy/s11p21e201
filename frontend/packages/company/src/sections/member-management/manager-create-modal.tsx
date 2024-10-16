import type { ISelectOption } from '@e201/ui'
import type { IDepartment } from '@/types/employees'

import api from '@/configs/api'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import { Box, Stack, Dialog, Button } from '@mui/material'

import { Select, FormInput, Breadcrumbs, SelectCreatable } from '@e201/ui'

interface IForm {
  code: string
  password: string
}

interface ISubmit extends IForm {
  departmentId: string
}

interface IProps {
  open: boolean
  onClose: () => void
  onSubmit?: (data: ISubmit) => void
}

export default function ManagerCreateModal({ open, onClose, onSubmit }: IProps) {
  const { t } = useTranslate('member')

  const [department, setDepartment] = useState<ISelectOption | null>(null)

  const formMethod = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      code: '',
      password: '',
    },
  })
  const { control } = formMethod

  const { data: departments } = useQuery({
    queryKey: [api.department.list],
    queryFn: async () => {
      const response = await axios.get<IDepartment[]>(api.department.list)
      return response.data
    },
  })

  const departmentOptions = useMemo<ISelectOption[]>(() => {
    if (!departments) {
      return []
    }
    return departments.map((e) => ({ label: e.name, value: e.id }))
  }, [departments])

  const submitHandler = (form: IForm) => {
    if (department && onSubmit) {
      onSubmit({
        code: form.code,
        password: form.password,
        departmentId: department.value,
      })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={formMethod.handleSubmit(submitHandler)} noValidate>
        <Box p={3}>
          <Breadcrumbs
            title={t('breadcrumbs.create_manager')}
            routes={[
              { title: t('breadcrumbs.management'), path: paths.management.member.list },
              { title: t('breadcrumbs.member_management'), path: paths.management.member.list },
              { title: t('breadcrumbs.manager_management'), path: paths.management.manager.root },
              { title: t('breadcrumbs.create_manager') },
            ]}
          />

          <Stack spacing={2}>
            <Select
              label={t('label.department')}
              size="small"
              options={departmentOptions}
              onChange={setDepartment}
              value={department}
            />
            <FormInput name="code" control={control} label={t('label.manager_code')} size="small" />
            <FormInput
              name="password"
              type="password"
              control={control}
              label={t('label.manager_password')}
              size="small"
            />
            <Button size="large" color="secondary" type="submit">
              {t('button.create_manager')}
            </Button>
          </Stack>
        </Box>
      </form>
    </Dialog>
  )
}
