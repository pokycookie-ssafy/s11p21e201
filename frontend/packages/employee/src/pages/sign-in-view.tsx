import { toast } from 'sonner'
import api from '@/configs/api'
import { useEffect } from 'react'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'
import { useForm } from 'react-hook-form'
import logo from '@/assets/img/toss-logo.jpg'
import { useNavigate } from 'react-router-dom'
import whiteLogo from '@/assets/img/logo-white.png'

import { Stack, Button, useTheme, Container, CardMedia } from '@mui/material'

import { FormInput, FullContainer } from '@e201/ui'

interface IForm {
  code: string
  password: string
}

export default function SignInView() {
  const { t } = useTranslate('sign-in')

  const { login, isLogin } = useAuthStore()

  const { palette } = useTheme()

  const navigate = useNavigate()

  const formMethod = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      code: '',
      password: '',
    },
  })
  const { control } = formMethod

  const submitHandler = async (form: IForm) => {
    try {
      const { data, status } = await axios.post(api.login, form)
      if (status === 201) {
        login(data)
        navigate(paths.main)
      }
      navigate(paths.root)
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
    <FullContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <Stack alignItems="center" mb={3}>
          <CardMedia
            component="img"
            image={palette.mode === 'light' ? logo : whiteLogo}
            alt="logo"
            sx={{ width: '0.5' }}
          />
        </Stack>

        <form onSubmit={formMethod.handleSubmit(submitHandler)} noValidate>
          <Stack spacing={1} mb={3}>
            <FormInput
              name="code"
              control={control}
              label={t('field.code')}
              rules={{
                required: t('validate.code.required'),
              }}
            />
            <FormInput
              name="password"
              control={control}
              type="password"
              label={t('field.password')}
              rules={{
                required: t('validate.password.required'),
              }}
            />
          </Stack>

          <Button type="submit" fullWidth variant="contained">
            {t('button.login')}
          </Button>
        </form>
      </Container>
    </FullContainer>
  )
}
