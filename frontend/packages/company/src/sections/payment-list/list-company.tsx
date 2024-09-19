import React from 'react'
import { useTranslate } from '@/locales'
// import ListAccordion from '@/sections/payment-list/list-accordion'

import { Stack, Button, TextField, Typography, ButtonGroup } from '@mui/material'

// interface AccordionData {
//   id: string
//   name: string
//   items: string[]
// }
export default function ListCompany() {
  const { t } = useTranslate('payment')

  return (
    <Stack spacing={3}>
      <Stack direction="row">
        <ButtonGroup variant="outlined">
          <Button>{t('sort_department')}</Button>
          <Button>{t('sort_restaurant')}</Button>
          <Button>{t('sort_employee')}</Button>
        </ButtonGroup>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row">
          <Typography variant="h5">9월</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <TextField id="outlined-basic" label="시작년도" variant="outlined" size="small" />
          <TextField id="outlined-basic" label="시작월" variant="outlined" size="small" />
          <Typography>~</Typography>
          <TextField id="outlined-basic" label="종료년도" variant="outlined" size="small" />
          <TextField id="outlined-basic" label="종료월" variant="outlined" size="small" />
        </Stack>
      </Stack>
      {/* <Stack spacing={2}>
        {accordions.map((accordion) => (
          <ListAccordion key={accordion.id} name={accordion.name} items={accordion.items} />
        ))}
      </Stack> */}
    </Stack>
  )
}
