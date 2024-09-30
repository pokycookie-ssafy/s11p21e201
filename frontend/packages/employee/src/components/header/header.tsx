import { useUser } from '@/hooks/api'
import { useTranslate } from '@/locales'
import miniLogo from '@/assets/img/toss-logo-cut.png'

import { Card, Stack, CardMedia, Typography } from '@mui/material'

export function Header() {
  const { t } = useTranslate('common')

  // 로그인한 유저의 ID
  const employeeId = 'e7ce2fe0-bf18-408e-b3ea-cb45fa46a469' // 실제 로그인한 유저의 ID로 교체

  // useEmployeeInfo 훅으로 유저 정보 불러오기
  const { data: employeeData, isLoading, error } = useUser(employeeId)

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        maxWidth: 'xs',
        width: 1,
        justifyContent: 'start',
        alignItems: 'center',
        height: 100,
        gap: 2,
        paddingLeft: 2,
        paddingBottom: 1.5,
        background: (theme) =>
          `linear-gradient(to bottom, ${theme.palette.primary.main} 85%, transparent 100%)`,
      }}
    >
      <Card
        sx={{
          bgcolor: 'transparent',
          boxShadow: 'none',
          border: 'none',
          elevation: 0,
          height: '0.6',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CardMedia component="img" image={miniLogo} alt="logo" sx={{ height: '1' }} />
      </Card>{' '}
      <Stack>
        {isLoading ? (
          <Typography variant="h6" sx={{ color: 'white' }}>
            로딩 중...
          </Typography>
        ) : error ? (
          <Typography variant="h6" sx={{ color: 'white' }}>
            오류 발생
          </Typography>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
              {employeeData?.employeeName}님,
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500, color: 'white' }}>
              오늘도 맛있는 식사 하세요 :)
            </Typography>
          </>
        )}
      </Stack>
    </Stack>
  )
}
