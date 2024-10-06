import { useEffect } from 'react'
import { useTranslate } from '@/locales'
import { useBoolean } from '@e201/utils'
import { useForm } from 'react-hook-form'

import { Box, Stack, Button, Collapse, Typography } from '@mui/material'

import { FormInput } from '@e201/ui'

interface IForm {
  currPassword: string
  password: string
  passwordConfirm: string
}

interface IProps {
  open: boolean
}

export default function ChangePassword({ open }: IProps) {
  const { t } = useTranslate()

  const mobileFocus = useBoolean()

  const formMethod = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      currPassword: '',
      password: '',
      passwordConfirm: '',
    },
  })
  const { control, watch } = formMethod

  // handleSubmit 함수
  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  //   // 비밀번호 변경 mutation 실행
  //   mutation.mutate(
  //     {
  //       id, // 변경하려는 사용자의 ID (필요 시 form에서 가져옴)
  //       originPassword: form.originPassword, // 기존 비밀번호
  //       newPassword: form.newPassword, // 새 비밀번호
  //       confirmPassword: form.confirmPassword, // 새 비밀번호 확인
  //     },
  //     {
  //       onSuccess: (data) => {
  //         // 비밀번호 변경 성공 시 루트 페이지로 이동
  //         navigate(paths.root)
  //       },
  //       onError: () => {
  //         // 비밀번호 변경 실패 시 에러 메시지 표시
  //         setError('비밀번호 변경 실패. 다시 시도해 주세요.')
  //       },
  //     }
  //   )
  // }

  const submitHandler = async (form: IForm) => {}

  useEffect(() => {
    if (open) {
      formMethod.clearErrors()
      formMethod.setValue('currPassword', '')
      formMethod.setValue('password', '')
      formMethod.setValue('passwordConfirm', '')
    }
  }, [formMethod, open])

  return (
    <Stack p={2} sx={{ height: 1, justifyContent: 'center' }}>
      <Box p={1} mb={2}>
        <Typography variant="h4">{t('pw.title')}</Typography>
      </Box>
      <form onSubmit={formMethod.handleSubmit(submitHandler)} noValidate>
        <Stack spacing={1}>
          <FormInput
            autoFocus
            name="currPassword"
            control={control}
            type="password"
            label={t('pw.originPw')}
            onFocus={mobileFocus.onTrue}
            onBlur={mobileFocus.onFalse}
            rules={{
              required: t('validate.password.required'),
            }}
          />
          <FormInput
            name="password"
            control={control}
            type="password"
            label={t('pw.newPw')}
            onFocus={mobileFocus.onTrue}
            onBlur={mobileFocus.onFalse}
            rules={{
              required: t('validate.password.required'),
            }}
          />
          <FormInput
            name="passwordConfirm"
            control={control}
            type="password"
            label={t('pw.confirmPw')}
            onFocus={mobileFocus.onTrue}
            onBlur={mobileFocus.onFalse}
            rules={{
              required: t('validate.password.required'),
              validate: {
                confirm: (value) =>
                  value === watch('password') || t('validate.password_confirm.validate'),
              },
            }}
          />
        </Stack>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {t('auth.changePw')}
        </Button>
        {/* mobile 키보드가 화면을 가릴 시 사용 */}
        <Collapse>
          <Box />
        </Collapse>
      </form>
    </Stack>
  )
}
