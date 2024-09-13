import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, styled, Slider, Typography } from '@mui/material'

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main, // 트랙 색상
  height: 40, // 트랙 높이
  borderRadius: '8px', // 트랙 모서리를 둥글게
  padding: '10px 34px', // 트랙 양쪽에 패딩 주기 -> thumb 이 벗어나지 않도록 설정

  '& .MuiSlider-track': {
    border: 'none', // 트랙 테두리 없애기
    borderRadius: '8px', // 트랙 모서리를 둥글게
  },
  '& .MuiSlider-thumb': {
    height: 32, // 핸들 높이
    width: 60, // 핸들 너비
    backgroundColor: '#fff', // 핸들 배경색
    boder: '2px solid currentColor', // 핸들 테두리
    borderRadius: '8px', // 핸들 모서리를 둥글게
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(24, 118. 210, 0.16)', // 핸들 hover 효과
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor: 'unset',
      color: '#000',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.28, // 트랙이 없는 부분의 투명도
    backgroundColor: '#bdbdbd', // 트랙이 없는 부분의 색상
  },
}))

export function QrSlider() {
  const [value, setValue] = useState(0) // 슬라이더 값 상태
  const navigate = useNavigate() // 페이지 이동을 위한 훅

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number)
  }

  // 손을 뗐을 때 슬라이더 값을 조정 (85 이하 0, 85 이상 100) + 애니메이션 적용
  const handleSliderCommit = () => {
    if (value < 85) {
      setValue(0) // 슬라이더를 0으로 이동
      return
    }

    setValue(100)
    setTimeout(() => {
      navigate('/qr')
    }, 200) // 0.2초 뒤에 QR 페이지로 이동
  }

  return (
    <Box
      sx={{
        width: 300,
        textAlign: 'center',
        margin: '20px',
      }}
    >
      <Typography variant="h5">QR 코드 생성하기</Typography>
      <CustomSlider
        value={value}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderCommit}
        min={0}
        max={100}
        step={1}
        aria-labelledby="qr-slider"
      />
    </Box>
  )
}
