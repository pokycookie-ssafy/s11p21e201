import { useTranslate } from '@/locales'
import { useRef, useState, useEffect } from 'react'
import contract from '@/assets/img/contract_mockup.png'

import { Box, Stack, useTheme, keyframes, Typography } from '@mui/material'

interface Main4Props {
  scrollToNextSection: () => void // 추가: 프롭스 타입 정의
}

export default function Main4({ scrollToNextSection }: Main4Props) {
  const { t } = useTranslate('microsite')
  const theme = useTheme()

  // 애니메이션 정의
  const fadeInUp = keyframes`
    from {
      opacity: 0;
      transform: translateY(50px); 
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `

  const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

  const [isVisible, setIsVisible] = useState(false)
  const targetRef = useRef<HTMLDivElement | null>(null)

  // Intersection Observer 적용
  useEffect(() => {
    const targetNode = targetRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { threshold: 0.3 }
    )

    if (targetNode) {
      observer.observe(targetNode)
    }

    return () => {
      if (targetNode) {
        observer.unobserve(targetNode)
      }
    }
  }, [])

  return (
    <Stack
      ref={targetRef}
      sx={{
        width: '100vw',
        minHeight: '100vh',
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: '100vw',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          background: `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.grey[300]})`,
          minHeight: '100vh',
        }}
      >
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '50%',
            padding: 2,
            // animation: isVisible ? `${fadeInRight} 1s ease-out forwards` : 'none',
          }}
        >
          <Stack spacing={2} pl={20}>
            <Stack>
              <Typography variant="h3" sx={{ color: theme.palette.primary.light }}>
                계약
              </Typography>
              <Typography variant="h1">두꺼운 장부 없이</Typography>
              <Typography variant="h1">계약 관리</Typography>
            </Stack>
            <Typography variant="h3">계약의 디지털화 이제 이루어 보십쇼</Typography>
          </Stack>
        </Stack>
        <Box
          component="img"
          src={contract}
          sx={{
            width: '40vw',
            height: 'auto',
            maxHeight: '50vh',
            objectFit: 'contain',
            animation: isVisible ? `${fadeInRight} 1s ease-out forwards` : 'none',
          }}
        />
      </Stack>
    </Stack>
  )
}
