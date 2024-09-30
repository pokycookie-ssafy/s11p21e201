import type { FormEvent, ChangeEvent } from 'react'

import paths from '@/configs/paths'
import { useLogin } from '@/hooks/api'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import logo from '@/assets/img/toss-logo.jpg'
import { useNavigate } from 'react-router-dom'

import {
  Card,
  Stack,
  Button,
  Checkbox,
  Container,
  TextField,
  CardMedia,
  Typography,
  FormControlLabel,
} from '@mui/material'

import { Link, FullContainer } from '@e201/ui'

export default function SignInView() {
  const { t, i18n } = useTranslate('common')

  const [remember, setRemember] = useState(false)

  const getPlaceholderText = (labelKey: string): string =>
    i18n.language === 'en'
      ? `${t('auth.input')} ${t(labelKey)}`
      : `${t(labelKey)} ${t('auth.input')}`

  const [form, setForm] = useState({
    companyCode: '',
    employeeCode: '',
    password: '',
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  // 입력값이 변경될 때 form 상태를 업데이트하는 함수
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const mutation = useLogin()

  // Checkbox의 상태 변경 함수 추가
  const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (remember) {
      localStorage.setItem('loginInfo', JSON.stringify(form))
    }
    mutation.mutate(form, {
      onSuccess: (data) => {
        navigate(paths.root)
      },
      onError: () => {
        setError(t('signin.error'))
      },
    })
  }

  // 컴포넌트 마운트 시 로컬 스토리지에서 로그인 정보 불러오기
  useEffect(() => {
    const savedLoginInfo = localStorage.getItem('loginInfo')
    if (savedLoginInfo) {
      const parsedInfo = JSON.parse(savedLoginInfo)
      setForm(parsedInfo)
      setRemember(true) // remember 상태도 true로 설정
    }
  }, [])

  return (
    <FullContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="xs">
        {/* 로고 */}
        <Card
          sx={{
            bgcolor: 'transparent',
            boxShadow: 'none',
            border: 'none',
            elevation: 0,
            width: '1',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CardMedia component="img" image={logo} alt="logo" sx={{ width: '0.5' }} />
        </Card>
        {/* 로그인 inputfield 및 버튼 */}
        <Stack alignItems="center" component="form" onSubmit={handleSubmit}>
          <TextField
            label={t('signin.companyCode')}
            placeholder={getPlaceholderText('signin.companyCode')}
            fullWidth
            required
            name="companyCode"
            margin="normal"
            autoFocus
            value={form.companyCode}
            onChange={handleInput}
          />
          <TextField
            label={t('signin.employeeCode')}
            placeholder={getPlaceholderText('signin.employeeCode')}
            fullWidth
            required
            name="employeeCode"
            margin="normal"
            value={form.employeeCode}
            onChange={handleInput}
          />
          <TextField
            label={t('signin.password')}
            placeholder={getPlaceholderText('signin.password')}
            type="password"
            fullWidth
            required
            name="password"
            margin="normal"
            value={form.password}
            onChange={handleInput}
          />

          <FormControlLabel
            control={
              <Checkbox value="remember" checked={remember} onChange={handleRememberChange} />
            }
            label={t('signin.remember')}
            sx={{ mr: 'auto' }}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t('signin.title')}
          </Button>
          <Link to={paths.auth.changePw} sx={{ ml: 'auto' }}>
            {t('auth.changePw')}
          </Link>
        </Stack>
      </Container>
    </FullContainer>
  )
}
