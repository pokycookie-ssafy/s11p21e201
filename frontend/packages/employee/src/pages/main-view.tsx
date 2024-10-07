import MealUsage from '@/sections/main/meal-usage'

import { Stack } from '@mui/material'

export default function MainView() {
  return (
    <Stack width={1} height={1} py={4} alignItems="center">
      <MealUsage />
    </Stack>
  )
}
