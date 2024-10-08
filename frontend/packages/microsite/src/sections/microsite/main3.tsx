import { useTranslate } from '@/locales'
import { useRef, useState, useEffect } from 'react'
import dashboard from '@/assets/img/dashboard_mockup.png'

import { Box, Stack, useTheme, keyframes, Typography } from '@mui/material'

interface Main3Props {
  scrollToNextSection: () => void // 추가: 프롭스 타입 정의
}

export default function Main3({ scrollToNextSection }: Main3Props) {
  const { t } = useTranslate('microsite')
  const theme = useTheme()

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
          paddingTop: '10vh',
          background:
            theme.palette.mode === 'dark'
              ? `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.grey[800]})`
              : `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.grey[300]})`,
          minHeight: '100vh',
          animation: isVisible ? `${fadeInUp} 1s ease-out forwards` : 'none',
        }}
      >
        <Stack sx={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            src={dashboard}
            sx={{
              width: '35vw',
              height: 'auto',
              maxHeight: '50vh',
              objectFit: 'contain',
            }}
          />
        </Stack>

        <Stack
          sx={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: '5vw',
          }}
        >
          <Stack spacing={3}>
            <Stack>
              <Typography variant="h3" sx={{ color: theme.palette.primary.light }}>
                {t('dashboard.title')}
              </Typography>
              <Typography variant="h1">{t('dashboard.subtitle1')}</Typography>
              <Typography variant="h1">{t('dashboard.subtitle2')}</Typography>
            </Stack>
            <Stack>
              <Typography variant="h3">{t('dashboard.description1')}</Typography>
              <Typography variant="h3">{t('dashboard.description2')}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
