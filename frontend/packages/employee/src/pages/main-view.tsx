import { QrSlider } from '@/sections/slide'
import { StoresList } from '@/sections/stores-list'
import { MealUsageBar } from '@/sections/meal-usage-bar'

import { Stack } from '@mui/material'

export default function MainPage() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={(theme) => ({
        width: 1,
        padding: 2,
        [theme.breakpoints.up('sm')]: { width: '90%', padding: 3 },
        [theme.breakpoints.up('md')]: { width: '80%' },
        [theme.breakpoints.up('lg')]: { width: '70%' },
      })}
    >
      <MealUsageBar />
      <StoresList />
      <QrSlider />
    </Stack>
  )
}
