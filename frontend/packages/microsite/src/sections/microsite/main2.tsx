import { keyframes } from '@emotion/react'
import storebg from '@/assets/img/storebg.jpg'
// import companybg from '@/assets/img/companybg.jpg'
import { useRef, useState, useEffect } from 'react'
// import employeebg from '@/assets/img/employeebg.jpg'
// import background2 from '@/assets/img/background2.jpg'

import { Box, Stack, Button, Typography } from '@mui/material'

export default function Main2() {
  // 위에서 아래로 내려오는 애니메이션 정의
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
        {/* 왼쪽 텍스트 영역 */}
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
                기업 제휴 식당 장부 관리 서비스
              </Typography>
              <Typography variant="h1" sx={{ fontFamily: 'suite-variable', fontSize: '3.5rem' }}>
                사내대장부
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h5">사내대장부는 기업, 식당, 직원 간의</Typography>
              <Typography variant="h5">식당 제휴 서비스를 디지털화하고</Typography>
              <Typography variant="h5">장부 관리와 정산 과정을 간소화합니다.</Typography>
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
                기업 서비스
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'suit-variable' }}>
                식당 제휴 계약 및 관리, 정산 서비스를 제공합니다. 대시보드와 부서별/월별 장부 조회
                기능을 통해 빠른 정산 업무를 도와드립니다.
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
                시작하기
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
                식당 서비스
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'suit-variable' }}>
                QR 결제와 디지털 장부를 통해 실시간 정산 내역을 확인할 수 있습니다. 대시보드를 통해
                메뉴별 매출, 기간별 매출을 확인할 수 있습니다.
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
                시작하기
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
                직원 서비스
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'suit-variable' }}>
                식사 후 빠르게 장부를 작성할 수 있도록 QR코드 결제 기능을 제공합니다. 실시간으로
                식대 사용 내역을 확인하고, 제휴 식당 정보도 얻을 수 있습니다.
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
                시작하기
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
