import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { ModeButton, LocaleButton } from '@/components/setting-button'

import { Box, Step, Stepper, Container, StepLabel } from '@mui/material'

import SignUpTermView from './sign-up-term-view'
import SignUpFormView from './sign-up-form-view'

export default function SignUpView() {
  const { t } = useTranslate('sign-up')

  const [currStep, setCurrStep] = useState(0)

  const steps = [t('steps.term'), t('steps.form'), t('steps.complete')]

  const currView = useMemo(() => {
    if (currStep === 0) {
      return <SignUpTermView onNext={() => setCurrStep(1)} />
    }
    if (currStep === 1) {
      return <SignUpFormView onNext={() => setCurrStep(2)} />
    }
    return <Box />
  }, [currStep])

  return (
    <>
      <Box sx={{ position: 'fixed', right: 0, p: 2 }}>
        <ModeButton />
        <LocaleButton />
      </Box>
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
    </>
  )
}
