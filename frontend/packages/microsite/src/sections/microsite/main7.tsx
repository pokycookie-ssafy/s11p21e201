import { useTranslate } from '@/locales'
import storebg from '@/assets/img/bgg1.jpg'
import { useRef, useState, useEffect } from 'react'

import {
  Box,
  Link,
  Stack,
  useTheme,
  keyframes,
  Container,
  IconButton,
  Typography,
} from '@mui/material'

import { Iconify } from '@e201/ui'

import ServiceDialog from '../layout/dialog/service_dialog'
import PrivacyDialog from '../layout/dialog/privacy_dialog'

interface Main7Props {
  scrollToNextSection: () => void // 추가: 프롭스 타입 정의
}

export default function Main7({ scrollToNextSection }: Main7Props) {
  const { t } = useTranslate('microsite')
  const theme = useTheme()

  const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

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

  const [serviceOpen, setServiceOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const handleServiceOpen = () => setServiceOpen(true)
  const handleServiceClose = () => setServiceOpen(false)

  const handlePrivacyOpen = () => setPrivacyOpen(true)
  const handlePrivacyClose = () => setPrivacyOpen(false)

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
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'auto',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${storebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: -1,
        },
      }}
    >
      <Stack
        spacing={2}
        sx={{
          height: '85vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: isVisible ? `${fadeIn} 1.7s ease-out` : 'none',
        }}
      >
        <Typography variant="h1" sx={{ fontFamily: 'suit-variable', fontSize: '4rem' }}>
          사내대장부와 함께,
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: '600' }}>
          새로운 일상을 시작해 보세요
        </Typography>
      </Stack>
      <Box
        component="footer"
        sx={{
          backgroundColor: theme.palette.background.default,
          py: 4,
          height: '15vh',
          width: '100%',
          opacity: 0.9,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} 사내대장부. All rights reserved.
            </Typography>

            <Stack direction="row" spacing={3}>
              <Link
                color="inherit"
                underline="hover"
                onClick={handleServiceOpen}
                sx={{ cursor: 'pointer' }}
              >
                이용약관
              </Link>
              <Link
                color="inherit"
                underline="hover"
                onClick={handlePrivacyOpen}
                sx={{ cursor: 'pointer' }}
              >
                개인정보처리방침
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <ServiceDialog open={serviceOpen} onClose={handleServiceClose} />
      <PrivacyDialog open={privacyOpen} onClose={handlePrivacyClose} />
    </Stack>
  )
}
