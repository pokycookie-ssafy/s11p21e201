import { QrSlider } from '@/sections/slide'
import { StoresList } from '@/sections/stores-list'
import { MealUsageBar } from '@/sections/meal-usage-bar'

import { Box } from '@mui/material'

export default function MainPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MealUsageBar />
      <StoresList />
      <QrSlider />
    </Box>
  )
}
