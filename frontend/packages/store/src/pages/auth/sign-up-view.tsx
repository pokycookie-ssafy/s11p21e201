import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Step, Stack, Button, Stepper, StepLabel, Typography } from '@mui/material'

import { Container } from '@e201/ui'

import SignUpTermView from './sign-up-term-view'
import SignUpFormView from './sign-up-form-view'

export default function SignUpView() {
  const { t } = useTranslate('sign-up')

  const navigate = useNavigate()

  const [currStep, setCurrStep] = useState(0)

  const steps = [t('steps.term'), t('steps.form'), t('steps.complete')]

  const currView = useMemo(() => {
    const handleButtonClick = () => {
      navigate('/') // '/' 경로로 이동
    }
    if (currStep === 0) {
      return <SignUpTermView onNext={() => setCurrStep(1)} />
    }
    if (currStep === 1) {
      return <SignUpFormView onNext={() => setCurrStep(2)} />
    }
    return (
      <Stack p={10} spacing={5} alignItems="center" justifyContent="center">
        <Stack spacing={3} alignItems="center">
          <Typography variant="h1">가입이 완료되었습니다!</Typography>
          <Typography variant="h5">사내대장부의 가족이 되신 것을 환영합니다.</Typography>
        </Stack>
        <Button onClick={handleButtonClick} variant="contained" sx={{ width: 'auto', px: 4 }}>
          시작하기
        </Button>
      </Stack>
    )
  }, [currStep, navigate])

  return (
    <Container>
      <Stepper alternativeLabel activeStep={currStep}>
        {steps.map((label, i) => (
          <Step key={i}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ py: 8 }}>{currView}</Box>
    </Container>
  )
}
