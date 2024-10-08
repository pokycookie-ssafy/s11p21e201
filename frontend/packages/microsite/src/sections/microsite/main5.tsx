import { useTranslate } from '@/locales'
import qrpay from '@/assets/img/qrpay_mockup.png'
import { useRef, useState, useEffect } from 'react'

import { Box, Stack, useTheme, keyframes, Typography } from '@mui/material'

import { Iconify } from '@e201/ui'

interface Main5Props {
  scrollToNextSection: () => void // 추가: 프롭스 타입 정의
}

export default function Main5({ scrollToNextSection }: Main5Props) {
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
          src={qrpay}
          sx={{
            width: '50vw',
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
                결제
              </Typography>
              <Typography variant="h1">복잡한 수기 장부 대신</Typography>
              <Typography variant="h1">간편한 QR 결제</Typography>
            </Stack>
            <Typography variant="h3">QR 결제를 한다면? 아주 좋을 듯합니다.</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
