import { useTranslate } from '@/locales'
import { useRef, useState, useEffect } from 'react'
import dashboard from '@/assets/img/dashboard_mu.png'

import { Box, Stack, useTheme, keyframes, Typography } from '@mui/material'

interface Main3Props {
  scrollToNextSection: () => void // 추가: 프롭스 타입 정의
}

export default function Main3({ scrollToNextSection }: Main3Props) {
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
        <Box
          component="img"
          src={dashboard}
          sx={{
            width: '40vw',
            height: 'auto',
            maxHeight: '50vh',
            objectFit: 'contain',
            animation: isVisible ? `${fadeInUp} 1s ease-out forwards` : 'none',
          }}
        />

        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '50%',
            padding: 2,
            animation: isVisible ? `${fadeInUp} 1s ease-out forwards` : 'none',
          }}
        >
          <Stack pl={10} spacing={3}>
            <Stack>
              <Typography variant="h3" sx={{ color: theme.palette.primary.light }}>
                대시보드
              </Typography>
              <Typography variant="h1">식대 관리는,</Typography>
              <Typography variant="h1">보기 좋게 한 눈에</Typography>
            </Stack>
            <Typography variant="h3">얼마를 썼고 얼마를 받았고, 계산할 필요 없슴다</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
