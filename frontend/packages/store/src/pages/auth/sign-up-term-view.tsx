import { useMemo } from 'react'
import term from '@/assets/data/term'
import { useTranslate } from '@/locales'
import Term from '@/sections/sign-up/term'
import { useBoolean } from '@/hooks/use-boolean'

import { Stack, Button } from '@mui/material'

interface IProps {
  onNext?: () => void
}

export default function SignupTermView({ onNext }: IProps) {
  const { t } = useTranslate()

  const service = useBoolean()
  const personal = useBoolean()

  const isAllChecked = useMemo(() => service.value && personal.value, [service, personal])

  return (
    <Stack spacing={4}>
      <Term
        checked={service.value}
        onCheck={service.toggle}
        term={term.service}
        title={t('서비스 이용약관')}
      />
      <Term
        checked={personal.value}
        onCheck={personal.toggle}
        term={term.personal}
        title={t('개인정보 수집 및 이용 동의')}
      />
      <Button disabled={!isAllChecked} onClick={onNext}>
        {t('다음')}
      </Button>
    </Stack>
  )
}
