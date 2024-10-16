import { useRef, useState } from 'react'
import Header from '@/sections/layout/header'
import Main1 from '@/sections/microsite/main1'
import Main2 from '@/sections/microsite/main2'
import Main3 from '@/sections/microsite/main3'
import Main4 from '@/sections/microsite/main4'
import Main5 from '@/sections/microsite/main5'
import Main6 from '@/sections/microsite/main6'
import Main7 from '@/sections/microsite/main7'

import { Box } from '@mui/material'

export default function Microsite() {
  const totalSections = 7

  const main1Ref = useRef<HTMLDivElement | null>(null)
  const main2Ref = useRef<HTMLDivElement | null>(null)
  const main3Ref = useRef<HTMLDivElement | null>(null)
  const main4Ref = useRef<HTMLDivElement | null>(null)
  const main5Ref = useRef<HTMLDivElement | null>(null)
  const main6Ref = useRef<HTMLDivElement | null>(null)
  const main7Ref = useRef<HTMLDivElement | null>(null)

  // refs를 배열로 관리합니다.
  const sectionRefs = [main1Ref, main2Ref, main3Ref, main4Ref, main5Ref, main6Ref, main7Ref]

  const [currentSection, setCurrentSection] = useState(1)
  const [scrollDeltaY, setScrollDeltaY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isScrolling) return

    e.preventDefault()

    setScrollDeltaY((prevDeltaY) => {
      const newDeltaY = prevDeltaY + e.deltaY
      const threshold = 100

      if (newDeltaY > threshold && currentSection < totalSections) {
        const nextSection = currentSection + 1
        const nextSectionRef = sectionRefs[nextSection - 1]
        if (nextSectionRef.current) {
          setIsScrolling(true)
          nextSectionRef.current.scrollIntoView({ behavior: 'smooth' })
          setTimeout(() => {
            setCurrentSection(nextSection)
            setIsScrolling(false)
          }, 500)
        }
        return 0
      }
      if (newDeltaY < -threshold && currentSection > 1) {
        const prevSection = currentSection - 1
        const prevSectionRef = sectionRefs[prevSection - 1]
        if (prevSectionRef.current) {
          setIsScrolling(true)
          prevSectionRef.current.scrollIntoView({ behavior: 'smooth' })
          setTimeout(() => {
            setCurrentSection(prevSection)
            setIsScrolling(false)
          }, 500)
        }
        return 0
      }
      return newDeltaY
    })
  }

  const handleScrollToNextSection = () => {
    if (currentSection < totalSections) {
      const nextSection = currentSection + 1
      const nextSectionRef = sectionRefs[nextSection - 1]
      if (nextSectionRef.current) {
        nextSectionRef.current.scrollIntoView({ behavior: 'smooth' })
        setCurrentSection(nextSection)
      }
    }
  }

  const sectionComponents = [
    <Main1 key={1} scrollToNextSection={handleScrollToNextSection} />,
    <Main2 key={2} scrollToNextSection={handleScrollToNextSection} />,
    <Main3 key={3} scrollToNextSection={handleScrollToNextSection} />,
    <Main4 key={4} scrollToNextSection={handleScrollToNextSection} />,
    <Main5 key={5} scrollToNextSection={handleScrollToNextSection} />,
    <Main6 key={6} scrollToNextSection={handleScrollToNextSection} />,
    <Main7 key={7} scrollToNextSection={handleScrollToNextSection} />,
  ]

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
      {sectionComponents.map((Component, index) => (
        <Box
          key={index}
          ref={sectionRefs[index]}
          sx={{
            height: '100vh',
            scrollSnapAlign: 'start',
            overflowY: 'hidden',
          }}
        >
          {Component}
        </Box>
      ))}
    </Box>
  )
}
