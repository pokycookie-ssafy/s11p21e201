import { toast } from 'sonner'
import api from '@/configs/api'
import { useEffect } from 'react'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Stack, Button, Typography } from '@mui/material'

import { Link, FormInput } from '@e201/ui'

interface IForm {
  email: string
  password: string
}

export default function SignInView() {
  const { t } = useTranslate('sign-in')

  const { login, isLogin } = useAuthStore()

  const navigate = useNavigate()

  const formMethod = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      email: 'test@ssafy.com',
      password: '12345678',
    },
  })
  const { control } = formMethod

  const submitHandler = async (form: any) => {
    try {
      const { data, status } = await axios.post(api.auth.login, form)
      if (status === 201) {
        login(data)
      }
    } catch (error) {
      toast.error(t('validate.login'))
    }
  }

  useEffect(() => {
    if (isLogin) {
      navigate(paths.main)
    }
  }, [isLogin, navigate])

  return (
    <form onSubmit={formMethod.handleSubmit(submitHandler)} noValidate>
      <Stack alignItems="center" sx={{ width: 400 }}>
        <Typography variant="h6" sx={{ mb: 4 }}>
          {t('title')}
        </Typography>

        <Stack spacing={2} width={1} sx={{ mb: 2 }}>
          <FormInput
            name="email"
            control={control}
            InputLabelProps={{ shrink: true }}
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
            control={control}
            InputLabelProps={{ shrink: true }}
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
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Link to={paths.auth.signUp}>
              <Typography variant="subtitle2">{t('button.sign_up')}</Typography>
            </Link>
            <Link to={paths.auth.signUp}>
              <Typography variant="subtitle2">{t('button.forgot_account')}</Typography>
            </Link>
          </Stack>

          <Button type="submit">{t('button.sign_in')}</Button>
        </Stack>
      </Stack>
    </form>
  )
}
