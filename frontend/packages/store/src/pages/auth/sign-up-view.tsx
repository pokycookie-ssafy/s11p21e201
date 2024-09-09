import { useMemo, useState } from 'react'

import { Box, Step, Stepper, Container, StepLabel } from '@mui/material'

import SignupTermView from './sign-up-term-view'
import SignUpFormView from './sign-up-form-view'

export default function SignUpView() {
  const [currStep, setCurrStep] = useState(0)

  const steps = ['약관동의', '회원정보입력', '가입완료']

  const currView = useMemo(() => {
    if (currStep === 0) {
      return <SignupTermView onNext={() => setCurrStep(1)} />
    }
    if (currStep === 1) {
      return <SignUpFormView />
    }
    return <Box />
  }, [currStep])

  return (
    <Container disableGutters sx={{ p: 8 }} maxWidth="md">
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
