import { useRef, useState } from 'react'
import Header from '@/sections/layout/header'
import Main1 from '@/sections/microsite/main1'
import Main2 from '@/sections/microsite/main2'

import { Box } from '@mui/material'

export default function Microsite() {
  const main1Ref = useRef<HTMLDivElement | null>(null)
  const main2Ref = useRef<HTMLDivElement | null>(null)
  const [currentSection, setCurrentSection] = useState(1)

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0 && currentSection === 1 && main2Ref.current) {
      main2Ref.current.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(2)
    } else if (e.deltaY < 0 && currentSection === 2 && main1Ref.current) {
      main1Ref.current.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(1)
    }
  }

  const handleScrollToNextSection = () => {
    if (main2Ref.current) {
      main2Ref.current.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(2)
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
      onWheel={handleWheel}
    >
      <Header />
      <Box
        ref={main1Ref}
        sx={{
          height: '100vh',
          scrollSnapAlign: 'start',
        }}
      >
        <Main1 scrollToNextSection={handleScrollToNextSection} />
      </Box>
      <Box
        ref={main2Ref}
        sx={{
          height: '100vh',
          scrollSnapAlign: 'start',
          overflowY: 'hidden',
        }}
      >
        <Main2 />
      </Box>
    </Box>
  )
}
