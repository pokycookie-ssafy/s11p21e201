import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useForm } from 'react-hook-form'

import { Box, Stack, Dialog, Button } from '@mui/material'

import { FormInput, Breadcrumbs } from '@e201/ui'

interface IForm {
  code: string
  name: string
}

interface IProps {
  open: boolean
  onClose: () => void
  onSubmit?: (data: IForm) => void
}

export default function DepartmentCreateModal({ open, onClose, onSubmit }: IProps) {
  const { t } = useTranslate('member')

  const formMethod = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      code: '',
      name: '',
    },
  })
  const { control } = formMethod

  const submitHandler = (form: IForm) => {
    if (onSubmit) {
      onSubmit(form)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={formMethod.handleSubmit(submitHandler)} noValidate>
        <Box p={3}>
          <Breadcrumbs
            title={t('breadcrumbs.create_department')}
            routes={[
              { title: t('breadcrumbs.management'), path: paths.management.member.list },
              { title: t('breadcrumbs.member_management'), path: paths.management.member.list },
              {
                title: t('breadcrumbs.department_management'),
                path: paths.management.manager.root,
              },
              { title: t('breadcrumbs.create_department') },
            ]}
          />

          <Stack spacing={2}>
            <FormInput
              name="code"
              control={control}
              label={t('label.department_code')}
              size="small"
            />
            <FormInput name="name" control={control} label={t('label.department')} size="small" />
            <Button size="large" color="secondary" type="submit">
              {t('button.create_department')}
            </Button>
          </Stack>
        </Box>
      </form>
    </Dialog>
  )
}
