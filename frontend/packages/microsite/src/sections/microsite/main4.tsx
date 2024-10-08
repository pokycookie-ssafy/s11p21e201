import { useTranslate } from '@/locales'
import { useRef, useState, useEffect } from 'react'
import contract from '@/assets/img/contract_mockup.png'

import { Box, Stack, useTheme, keyframes, Typography } from '@mui/material'

interface Main4Props {
  scrollToNextSection: () => void
}

export default function Main4({ scrollToNextSection }: Main4Props) {
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
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '50%',
          paddingLeft: '15vw',
          paddingTop: '10vh',
        }}
      >
        <Stack>
          <Typography variant="h3" sx={{ color: theme.palette.primary.light }}>
            {t('contract.title')}
          </Typography>
          <Typography variant="h1">{t('contract.subtitle1')}</Typography>
          <Typography variant="h1">{t('contract.subtitle2')}</Typography>
        </Stack>
        <Stack>
          <Typography variant="h3">{t('contract.description1')}</Typography>
          <Typography variant="h3">{t('contract.description2')}</Typography>
        </Stack>
      </Stack>
      <Stack
        sx={{ width: '50%', justifyContent: 'center', alignItems: 'center', paddingTop: '15vh' }}
      >
        <Box
          component="img"
          src={contract}
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
