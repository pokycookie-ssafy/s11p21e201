import { useMemo } from 'react'
import term from '@/assets/data/term'
import { useTranslate } from '@/locales'
import { useBoolean } from '@e201/utils'
import Term from '@/sections/sign-up/term'

import { Stack, Button } from '@mui/material'

interface IProps {
  onNext?: () => void
}

export default function SignUpTermView({ onNext }: IProps) {
  const { t } = useTranslate('sign-up')

  const service = useBoolean()
  const personal = useBoolean()

  const isAllChecked = useMemo(() => service.value && personal.value, [service, personal])

  return (
    <Stack spacing={4}>
      <Term
        checked={service.value}
        onCheck={service.toggle}
        term={term.service}
        title={t('term.service')}
      />
      <Term
        checked={personal.value}
        onCheck={personal.toggle}
        term={term.personal}
        title={t('term.personal')}
      />
      <Button disabled={!isAllChecked} onClick={onNext}>
        {t('button.next')}
      </Button>
    </Stack>
  )
}
