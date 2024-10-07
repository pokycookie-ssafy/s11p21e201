// import Qr from '@/pages/qr-view'
// import { useBoolean } from '@e201/utils'
// import { useState, useEffect } from 'react'

// import { Box, Stack } from '@mui/material'

// export function SwipeableEdge() {
//   const open = useBoolean() // Drawer의 열림/닫힘 상태
//   const [startY, setStartY] = useState(0) // 터치 시작 Y 좌표
//   const [currentY, setCurrentY] = useState(0) // 터치 이동 Y 좌표
//   const [startTime, setStartTime] = useState(0)
//   const [drawerHeight, setDrawerHeight] = useState(40) // Drawer의 초기 높이
//   const qrGenerate = useBoolean()

//   // 화면 전체에서 터치 시작 감지
//   useEffect(() => {
//     const handleTouchStart = (e: TouchEvent) => {
//       setStartY(e.touches[0].clientY) // 터치 시작 위치 기록
//       setStartTime(Date.now())
//     }

//     const handleTouchMove = (e: TouchEvent) => {
//       setCurrentY(e.touches[0].clientY) // 터치 이동 위치 기록
//     }

//     const handleTouchEnd = () => {
//       const swipeDistance = startY - currentY // 스와이프 거리를 계산
//       const elapsedTime = Date.now() - startTime

//       if (swipeDistance > 100 && elapsedTime > 100) {
//         // 위로 스와이프 (거리 > 50px, 시간 < 500ms)
//         open.onTrue() // 위로 스와이프 시 Drawer 열기
//         setDrawerHeight(500) // 스와이프하면 Drawer의 높이 확장
//         qrGenerate.onTrue()
//       } else if (swipeDistance < -100 && elapsedTime > 100) {
//         open.onFalse() // 아래로 스와이프 시 Drawer 닫기
//         setDrawerHeight(40) // Drawer를 다시 작은 높이로 축소
//         qrGenerate.onFalse()
//       }
//     }

//     // 터치 이벤트를 window에 걸어서 화면 전체에서 감지
//     window.addEventListener('touchstart', handleTouchStart)
//     window.addEventListener('touchmove', handleTouchMove)
//     window.addEventListener('touchend', handleTouchEnd)

//     return () => {
//       window.removeEventListener('touchstart', handleTouchStart)
//       window.removeEventListener('touchmove', handleTouchMove)
//       window.removeEventListener('touchend', handleTouchEnd)
//     }
//   }, [startY, currentY])

//   return (
//     <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
//       <Box
//         sx={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: open.value ? 'rgba(0, 0, 0, 0.7)' : 'transparent', // Drawer 열릴 때 배경 어둡게
//           transition: 'background-color 0.3s ease',
//           zIndex: open.value ? 10 : -1, // Drawer가 열려 있을 때만 활성화
//         }}
//         onClick={() => {
//           open.onFalse()
//           setDrawerHeight(40)
//           qrGenerate.onFalse()
//         }} // 배경을 클릭하면 Drawer 닫힘
//       />
//       {/* 스와이프 가능한 Drawer 영역 */}
//       <Box
//         sx={{
//           position: 'absolute',
//           bottom: 10,
//           left: 0,
//           right: 0,
//           height: `${drawerHeight}px`, // Drawer의 높이 상태에 따라 동적으로 설정
//           backgroundColor: 'transparent',
//           transition: 'height 0.3s ease', // 부드러운 높이 변화 애니메이션
//           overflow: 'hidden', // 내용이 넘칠 때 숨김
//           zIndex: 20, // 배경 위에 올라가도록 설정
//         }}
//       >
//         <Stack
//           bgcolor="transparent"
//           width={1}
//           height={40}
//           position="relative"
//           alignItems="center"
//           justifyContent="center"
//           borderRadius="50"
//         >
//           <Box
//             sx={(theme) => ({
//               bgcolor: open.value ? 'white' : theme.palette.grey[700],
//             })}
//             width={0.6}
//             height={6}
//             borderRadius={10}
//           />
//         </Stack>
//         {qrGenerate.value && (
//           <Stack
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             paddingTop={10}
//             paddingBottom={10}
//             bgcolor="white"
//             borderRadius={8}
//           >
//             {/* Drawer 안에 표시될 내용 */}
//             <Qr />
//           </Stack>
//         )}
//       </Box>
//     </Box>
//   )
// }
