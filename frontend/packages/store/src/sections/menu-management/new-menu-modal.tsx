import type { ISelectOption } from '@e201/ui'
import type { IMenuCreateRequest } from '@/types/menu'

import { useState } from 'react'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useForm } from 'react-hook-form'

import { Box, Stack, Dialog, Button } from '@mui/material'

import { FormInput, Breadcrumbs, SelectCreatable } from '@e201/ui'

interface IForm {
  name: string
  price: number
}

interface IProps {
  open: boolean
  onClose: () => void
  categories: string[]
  onSubmit?: (data: IMenuCreateRequest) => void
}

export default function NewMenuModal({ open, onClose, categories, onSubmit }: IProps) {
  const { t } = useTranslate('menu-management')

  const [category, setCategory] = useState<ISelectOption | null>(null)

  const formMethod = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      price: 0,
    },
  })
  const { control } = formMethod

  const submitHandler = (form: IForm) => {
    if (onSubmit && category) {
      onSubmit({ name: form.name, price: form.price, category: category.value })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={formMethod.handleSubmit(submitHandler)} noValidate>
        <Box p={3}>
          <Breadcrumbs
            title={t('breadcrumbs.create_menu')}
            routes={[
              { title: t('breadcrumbs.management'), path: paths.management.menu },
              { title: t('breadcrumbs.menu_management'), path: paths.management.menu },
              { title: t('breadcrumbs.create_menu') },
            ]}
          />
          <Stack spacing={2}>
            <FormInput name="name" control={control} label={t('label.menu_name')} size="small" />
            <SelectCreatable
              label={t('label.category')}
              size="small"
              options={categories.map((c) => ({ label: c, value: c }))}
              onChange={setCategory}
              value={category?.label}
            />
            <FormInput name="price" control={control} label={t('label.price')} size="small" />
            <Button size="large" color="secondary" type="submit">
              {t('button.create_menu')}
            </Button>
          </Stack>
        </Box>
      </form>
    </Dialog>
  )
}
