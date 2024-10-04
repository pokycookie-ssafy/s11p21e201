import { useTranslate } from '@/locales'
import { keyframes } from '@emotion/react'
import storebg from '@/assets/img/storebg.jpg'
import { useRef, useState, useEffect } from 'react'

import { Box, Stack, Button, Typography } from '@mui/material'

export default function Main2() {
  const { t } = useTranslate('microsite')
  const fadeIn = keyframes`
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
  const targetRef = useRef(null)

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
    <Box
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
          opacity: 0.4,
          zIndex: -1,
        },
      }}
    >
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction="row"
        sx={{ width: '100%' }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            width: '40%',
            animation: isVisible ? `${fadeIn} 1s ease-out` : 'none',
          }}
        >
          <Stack spacing={3} sx={{ textAlign: 'left' }}>
            <Stack>
              <Typography variant="h3" sx={{ fontFamily: 'suite-variable' }}>
                {t('detail1')}
              </Typography>
              <Typography variant="h1" sx={{ fontFamily: 'suite-variable', fontSize: '3.5rem' }}>
                {t('detail2')}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h5">{t('detail3')}</Typography>
              <Typography variant="h5">{t('detail4')}</Typography>
              <Typography variant="h5">{t('detail5')}</Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* 오른쪽 컨텐츠 영역 */}
        <Stack spacing={2} sx={{ width: '60%' }} p={2}>
          <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden', p: 4 }}>
            {/* 기업 서비스 */}
            <Stack
              spacing={2}
              sx={{
                position: 'absolute',
                top: '20%',
                left: '2%',
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                width: '45%',
                borderRadius: '10px',
                transition: 'background-color 0.3s, transform 0.3s',
                animation: isVisible ? `${fadeIn} 1s ease-out forwards` : 'none',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'scale(1.05)',
                },
                '&:hover .MuiButton-root': {
                  opacity: 1,
                },
              }}
            >
              <Typography variant="h3" sx={{ fontFamily: 'suite-variable' }}>
                {t('company_title')}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'suit-variable' }}>
                {t('company_detail')}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                component="a"
                href="https://company.sanedaejangbu.site/"
                sx={{
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  alignSelf: 'center',
                }}
              >
                {t('start')}
              </Button>
            </Stack>

            {/* 식당 서비스 */}
            <Stack
              spacing={2}
              sx={{
                position: 'absolute',
                top: '40%',
                right: '2%',
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                width: '45%',
                padding: '20px',
                borderRadius: '10px',
                transition: 'background-color 0.3s, transform 0.3s',
                animation: isVisible ? `${fadeIn} 1.25s ease-out forwards` : 'none',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'scale(1.05)',
                  '&:hover .MuiButton-root': {
                    opacity: 1,
                  },
                },
              }}
            >
              <Typography variant="h3" sx={{ fontFamily: 'suite-variable' }}>
                {t('store_title')}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'suit-variable' }}>
                {t('store_detail')}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                component="a"
                href="https://store.sanedaejangbu.site/"
                sx={{
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  alignSelf: 'center',
                }}
              >
                {t('start')}
              </Button>
            </Stack>

            {/* 직원 서비스 */}
            <Stack
              spacing={2}
              sx={{
                position: 'absolute',
                top: '60%',
                left: '2%',
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                width: '45%',
                padding: '20px',
                borderRadius: '10px',
                transition: 'background-color 0.3s, transform 0.3s',
                animation: isVisible ? `${fadeIn} 1.5s ease-out forwards` : 'none',

                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'scale(1.05)',
                  '&:hover .MuiButton-root': {
                    opacity: 1,
                  },
                },
              }}
            >
              <Typography variant="h3" sx={{ fontFamily: 'suite-variable' }}>
                {t('employee_title')}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'suit-variable' }}>
                {t('employee_detail')}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                component="a"
                href="https://employee.sanedaejangbu.site/"
                sx={{
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  alignSelf: 'center',
                }}
              >
                {t('start')}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
