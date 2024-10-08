import type { IPasswordChangeRequest } from '@/types/password'

import { toast } from 'sonner'
import api from '@/configs/api'
import { useEffect } from 'react'
import axios from '@/configs/axios'
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
  onClose: () => void
}

export default function ChangePassword({ open, onClose }: IProps) {
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

  const submitHandler = async (form: IForm) => {
    try {
      const req: IPasswordChangeRequest = {
        beforePassword: form.currPassword,
        afterPassword: form.password,
      }
      await axios.put(api.changePassword, req)
      toast.success(t('toast.password_changed'))
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

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
