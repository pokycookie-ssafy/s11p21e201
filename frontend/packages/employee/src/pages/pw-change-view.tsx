import type { FormEvent, ChangeEvent } from 'react'

import { useState } from 'react'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useChangePw } from '@/hooks/api'
import logo from '@/assets/img/toss-logo.jpg'
import { useNavigate } from 'react-router-dom'

import { Card, Stack, Button, Container, TextField, CardMedia, Typography } from '@mui/material'

import { Link } from '@e201/ui'

export default function PwChangeView() {
  const { t, i18n } = useTranslate('common')

  const getPlaceholderText = (labelKey: string): string =>
    i18n.language === 'en'
      ? `${t('auth.input')} ${t(labelKey)}`
      : `${t(labelKey)} ${t('auth.input')}`

  const [form, setForm] = useState({
    originPassword: '', // 기존 비밀번호
    newPassword: '', // 새 비밀번호
    confirmPassword: '', // 새 비밀번호 확인
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  // 입력값이 변경될 때 form 상태를 업데이트하는 함수
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const id = 'e7ce2fe0-bf18-408e-b3ea-cb45fa46a469'
  const mutation = useChangePw()

  // handleSubmit 함수
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 비밀번호 변경 mutation 실행
    mutation.mutate(
      {
        id, // 변경하려는 사용자의 ID (필요 시 form에서 가져옴)
        originPassword: form.originPassword, // 기존 비밀번호
        newPassword: form.newPassword, // 새 비밀번호
        confirmPassword: form.confirmPassword, // 새 비밀번호 확인
      },
      {
        onSuccess: (data) => {
          // 비밀번호 변경 성공 시 루트 페이지로 이동
          navigate(paths.root)
        },
        onError: () => {
          // 비밀번호 변경 실패 시 에러 메시지 표시
          setError('비밀번호 변경 실패. 다시 시도해 주세요.')
        },
      }
    )
  }

  return (
    <Stack sx={{ height: 1, justifyContent: 'center' }}>
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
        {/* 비밀번호 변경 inputfield 및 버튼 */}
        <Stack alignItems="center" component="form" onSubmit={handleSubmit}>
          <TextField
            label={t('pw.originPw')}
            placeholder={getPlaceholderText('pw.originPw')}
            type="password"
            fullWidth
            required
            name="originPassword"
            margin="normal"
            autoFocus
            onChange={handleInput}
          />
          <TextField
            label={t('pw.newPw')}
            placeholder={getPlaceholderText('pw.newPw')}
            type="password"
            fullWidth
            required
            name="newPassword"
            margin="normal"
            onChange={handleInput}
          />
          <TextField
            label={t('pw.confirmPw')}
            placeholder={t('pw.confirmPwMent')}
            type="password"
            fullWidth
            required
            name="confirmPassword"
            margin="normal"
            onChange={handleInput}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t('auth.changePw')}
          </Button>
          <Link to={paths.signIn} sx={{ ml: 'auto' }}>
            {t('auth.logout')}
          </Link>
        </Stack>
      </Container>
    </Stack>
  )
}
