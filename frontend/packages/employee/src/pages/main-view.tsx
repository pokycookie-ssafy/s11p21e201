import MealUsage from '@/sections/main/meal-usage'
import StoreList from '@/sections/main/store-list'
import { useSwipeStore } from '@/stores/use-swipe-store'

import { Stack } from '@mui/material'

export default function MainView() {
  const { open } = useSwipeStore()

  const onQr = () => {
    open()
  }

  return (
    <Stack width={1} py={4} alignItems="center" spacing={2}>
      <MealUsage onQr={onQr} />
      <StoreList />
    </Stack>
  )
}
