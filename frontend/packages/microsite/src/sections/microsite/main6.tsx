import { useTranslate } from '@/locales'
import { useRef, useState, useEffect } from 'react'
import payment from '@/assets/img/payment_mockup.png'

import { Box, Stack, useTheme, keyframes, Typography } from '@mui/material'

interface Main6Props {
  scrollToNextSection: () => void
}

export default function Main6({ scrollToNextSection }: Main6Props) {
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
      direction="row"
      sx={{
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.grey[800]})`
            : `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.grey[300]})`,
        minHeight: '100vh',
        animation: isVisible ? `${fadeInUp} 1s ease-out forwards` : 'none',
      }}
    >
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '50%',
          paddingTop: '5vh',
          paddingLeft: '15vw',
        }}
      >
        <Stack spacing={2}>
          <Stack>
            <Typography variant="h3" sx={{ color: theme.palette.primary.light }}>
              {t('ledger.title')}
            </Typography>
            <Typography variant="h1">{t('ledger.subtitle1')}</Typography>
            <Typography variant="h1">{t('ledger.subtitle2')}</Typography>
          </Stack>
          <Stack>
            <Typography variant="h3">{t('ledger.description1')}</Typography>
            <Typography variant="h3">{t('ledger.description2')}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ width: '50%', paddingTop: '15vh' }}>
        <Box
          component="img"
          src={payment}
          sx={{
            width: '40vw',
            height: 'auto',
            maxHeight: '50vh',
            objectFit: 'contain',
          }}
        />
      </Stack>
    </Stack>
  )
}
