import MealUsage from '@/sections/main/meal-usage'
import { useSwipeStore } from '@/stores/use-swipe-store'

import { Stack } from '@mui/material'

export default function MainView() {
  const { open } = useSwipeStore()

  const onQr = () => {
    open()
  }

  return (
    <Stack width={1} height={1} py={4} alignItems="center">
      <MealUsage onQr={onQr} />
    </Stack>
  )
}
