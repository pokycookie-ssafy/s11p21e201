import { toast } from 'sonner'
import api from '@/configs/api'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'
import { useForm } from 'react-hook-form'

import { Stack, Button } from '@mui/material'

import { Link, FormInput, Typography } from '@e201/ui'

interface IForm {
  code?: string
  password?: string
}

export default function ManagerForm() {
  const { t } = useTranslate('sign-in')

  const { loginManager: login } = useAuthStore()

  const formMethod = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      code: 'E201',
      password: '12345678',
    },
  })
  const { control: companyControl } = formMethod

  const submitHandler = async (form: IForm) => {
    try {
      const { data, status } = await axios.post(api.manager.login, form)
      if (status === 201) {
        login(data)
      }
    } catch (error) {
      toast.error(t('validate.login'))
    }
  }

  return (
    <form onSubmit={formMethod.handleSubmit(submitHandler)} noValidate>
      <Stack alignItems="center" sx={{ width: 400 }}>
        <Stack spacing={2} width={1} sx={{ mb: 2 }}>
          <FormInput
            name="code"
            control={companyControl}
            fullWidth
            label={t('label.code')}
            size="small"
            rules={{
              required: t('validate.code.required'),
            }}
          />
          <FormInput
            name="password"
            control={companyControl}
            fullWidth
            label={t('label.password')}
            size="small"
            type="password"
            rules={{
              required: t('validate.password.required'),
              minLength: {
                value: 8,
                message: t('validate.password.minLength'),
              },
            }}
          />
        </Stack>

        <Stack spacing={1} width={1}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Link to={paths.auth.signUp}>
              <Typography variant="subtitle2">{t('button.sign_up')}</Typography>
            </Link>
          </Stack>

          <Button type="submit">{t('button.sign_in')}</Button>
        </Stack>
      </Stack>
    </form>
  )
}
