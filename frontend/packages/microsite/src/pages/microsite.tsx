import { useRef, useState } from 'react'
import Header from '@/sections/layout/header'
import Main1 from '@/sections/microsite/main1'
import Main2 from '@/sections/microsite/main2'
import Main3 from '@/sections/microsite/main3'
import Main4 from '@/sections/microsite/main4'

import { Box } from '@mui/material'

export default function Microsite() {
  const main1Ref = useRef<HTMLDivElement | null>(null)
  const main2Ref = useRef<HTMLDivElement | null>(null)
  const main3Ref = useRef<HTMLDivElement | null>(null)
  const main4Ref = useRef<HTMLDivElement | null>(null)

  const [currentSection, setCurrentSection] = useState(1)

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      // 스크롤을 아래로 내릴 때
      if (currentSection === 1 && main2Ref.current) {
        main2Ref.current.scrollIntoView({ behavior: 'smooth' })
        setCurrentSection(2)
      } else if (currentSection === 2 && main3Ref.current) {
        main3Ref.current.scrollIntoView({ behavior: 'smooth' })
        setCurrentSection(3)
      } else if (currentSection === 3 && main4Ref.current) {
        main4Ref.current.scrollIntoView({ behavior: 'smooth' })
        setCurrentSection(4)
      } else if (e.deltaY < 0) {
        // 스크롤을 위로 올릴 때
        if (currentSection === 2 && main1Ref.current) {
          main1Ref.current.scrollIntoView({ behavior: 'smooth' })
          setCurrentSection(1)
        } else if (currentSection === 3 && main2Ref.current) {
          main2Ref.current.scrollIntoView({ behavior: 'smooth' })
          setCurrentSection(2)
        } else if (currentSection === 4 && main3Ref.current) {
          main3Ref.current.scrollIntoView({ behavior: 'smooth' })
          setCurrentSection(3)
        }
      }
    }
  }
  const handleScrollToNextSection = () => {
    if (currentSection === 1 && main2Ref.current) {
      main2Ref.current.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(2)
    } else if (currentSection === 2 && main3Ref.current) {
      main3Ref.current.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(3)
    } else if (currentSection === 3 && main4Ref.current) {
      main4Ref.current.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(4)
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
        <Main2 scrollToNextSection={handleScrollToNextSection} />
      </Box>
      <Box
        ref={main3Ref}
        sx={{
          height: '100vh',
          scrollSnapAlign: 'start',
          overflowY: 'hidden',
        }}
      >
        <Main3 scrollToNextSection={handleScrollToNextSection} />
      </Box>
      <Box
        ref={main4Ref}
        sx={{
          height: '100vh',
          scrollSnapAlign: 'start',
          overflowY: 'hidden',
        }}
      >
        <Main4 scrollToNextSection={handleScrollToNextSection} />
      </Box>
    </Box>
  )
}
