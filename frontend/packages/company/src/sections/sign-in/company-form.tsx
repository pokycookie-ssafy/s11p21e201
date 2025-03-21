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
  email?: string
  password?: string
}

export default function CompanyForm() {
  const { t } = useTranslate('sign-in')

  const { loginCompany: login } = useAuthStore()

  const formMethod = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { control: companyControl } = formMethod

  const submitHandler = async (form: IForm) => {
    try {
      const { data, status } = await axios.post(api.auth.login, form)
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
            name="email"
            control={companyControl}
            fullWidth
            label={t('label.email')}
            size="small"
            rules={{
              required: t('validate.email.required'),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t('validate.email.pattern'),
              },
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
