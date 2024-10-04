import { useTranslate } from '@/locales'
import { keyframes } from '@emotion/react'
import background1 from '@/assets/img/background1.jpg'

import { Box, Stack, Button, Typography } from '@mui/material'

export default function Main1({ scrollToNextSection }: { scrollToNextSection: () => void }) {
  const { t } = useTranslate('microsite')

  const fadeIn = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${background1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
          zIndex: -1,
        },
      }}
    >
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          height: '100%',
          animation: `${fadeIn} 1.7s ease-out`,
        }}
      >
        <Stack>
          <Typography variant="h1" sx={{ fontFamily: 'suite-variable', fontSize: '4rem' }}>
            {t('title1')}
          </Typography>
          <Typography variant="h1" sx={{ fontFamily: 'suite-variable', fontSize: '4rem' }}>
            {t('title2')}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h3" sx={{ fontFamily: 'suit-variable' }}>
            {t('subtitle1')}
          </Typography>
          <Typography variant="h3" sx={{ fontFamily: 'suit-variable' }}>
            {t('subtitle2')}
          </Typography>
        </Stack>

        <Stack justifyContent="center" alignItems="center" pt={4} spacing={2}>
          <Button variant="contained" onClick={scrollToNextSection}>
            <Typography variant="h6" sx={{ fontFamily: 'suit-variable' }}>
              {t('start')}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
