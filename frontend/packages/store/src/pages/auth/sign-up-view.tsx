import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'

import { Box, Step, Stepper, Container, StepLabel } from '@mui/material'

import SignupTermView from './sign-up-term-view'
import SignUpFormView from './sign-up-form-view'

export default function SignUpView() {
  const { t } = useTranslate('sign-up')

  const [currStep, setCurrStep] = useState(0)

  const steps = [t('steps.term'), t('steps.form'), t('steps.complete')]

  const currView = useMemo(() => {
    if (currStep === 0) {
      return <SignupTermView onNext={() => setCurrStep(1)} />
    }
    if (currStep === 1) {
      return <SignUpFormView onNext={() => setCurrStep(2)} />
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
