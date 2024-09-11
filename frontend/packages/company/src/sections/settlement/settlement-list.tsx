import type { SelectChangeEvent } from '@mui/material/Select'

import React from 'react'

import {
  Box,
  Grid,
  Stack,
  Select,
  Button,
  Dialog,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  DialogTitle,
  OutlinedInput,
  DialogContent,
  DialogActions,
} from '@mui/material'

const names = ['식당 1', '식당 2', '식당 3']

export default function SettlementList() {
  const [personName, setPersonName] = React.useState<string[]>([])
  const [openSettlementDialog, setOpenSettlementDialog] = React.useState(false)
  const [openInvoiceDialog, setOpenInvoiceDialog] = React.useState(false)

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)
  }

  const handleOpenSettlementDialog = () => {
    setOpenSettlementDialog(true)
  }

  const handleCloseSettlementDialog = () => {
    setOpenSettlementDialog(false)
  }

  const handleOpenInvoiceDialog = () => {
    setOpenInvoiceDialog(true)
  }

  const handleCloseInvoiceDialog = () => {
    setOpenInvoiceDialog(false)
  }

  return (
    <Stack sx={{ gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h5">고봉김밥</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">식당명</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={2}>
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Stack alignItems="center">
              <Typography>지불해야 할 금액</Typography>
              <Typography variant="h5">500,000원</Typography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              =
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Stack alignItems="center">
              <Typography>8월 청구액</Typography>
              <Typography variant="h5">500,000원</Typography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              +
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Stack alignItems="center">
              <Typography>미수금</Typography>
              <Typography variant="h5">0원</Typography>
            </Stack>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={2}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Stack sx={{ p: 2, gap: 2 }}>
              <Box>
                <Typography sx={{ textAlign: 'center' }}>상세 내역</Typography>
              </Box>
              <Box
                component="li"
                sx={{
                  p: 1,
                  borderBottom: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ justifyContent: 'flex-start' }}>
                  <Typography variant="body1">2024/08/01 ~ 2024/08/31</Typography>
                  <Typography variant="h6">480,000원</Typography>
                </Box>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}
                >
                  <Typography variant="body1">정산일 : 2024/09/10</Typography>
                  <Button variant="outlined" size="small" onClick={handleOpenSettlementDialog}>
                    정산하기
                  </Button>
                  <Dialog
                    open={openSettlementDialog}
                    onClose={handleCloseSettlementDialog}
                    maxWidth="sm"
                    fullWidth
                  >
                    <DialogTitle>정산하기</DialogTitle>
                    <DialogContent dividers>
                      <Stack sx={{ gap: 3, p: 2 }}>
                        <Typography variant="h6">송금할 계좌번호</Typography>
                        <Typography>1002-954-436365 우리은행 </Typography>
                        <Typography variant="h6">내 계좌번호</Typography>
                        <Typography>1001-943-382901 국민은행 </Typography>
                      </Stack>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                      <Button variant="contained" onClick={handleCloseSettlementDialog}>
                        송금하기
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Button variant="contained" size="small" onClick={handleOpenInvoiceDialog}>
                    세금계산서 조회
                  </Button>
                  <Dialog
                    open={openInvoiceDialog}
                    onClose={handleCloseInvoiceDialog}
                    maxWidth="sm"
                    fullWidth
                  >
                    <DialogTitle>세금계산서 조회하기</DialogTitle>
                    <DialogContent dividers>
                      <Typography>세금계산서 조회 정보</Typography>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                      <Button variant="contained" onClick={handleCloseInvoiceDialog}>
                        다운로드
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Box>
    </Stack>
  )
}
