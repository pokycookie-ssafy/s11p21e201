import * as React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { Iconify } from '@e201/ui'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

export function TablePaginationActions({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) {
  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Stack
      sx={{
        flexShrink: 0,
        flexDirection: 'row',
        alignItems: 'center',
        // width: 1,
        justifyContent: 'center',
      }}
    >
      <Box
        component="button"
        onClick={handleFirstPageButtonClick}
        sx={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Iconify icon="ic:round-keyboard-double-arrow-left" width="25" height="25" />
      </Box>

      <Box
        component="button"
        onClick={handleBackButtonClick}
        sx={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Iconify icon="ic:round-keyboard-arrow-left" width="25" height="25" />
      </Box>

      <Typography sx={{ mx: 1 }}>
        {page + 1} / {Math.ceil(count / rowsPerPage)}
      </Typography>

      <Box
        component="button"
        onClick={handleNextButtonClick}
        sx={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Iconify icon="ic:round-keyboard-arrow-right" width="25" height="25" />
      </Box>

      <Box
        component="button"
        onClick={handleLastPageButtonClick}
        sx={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
        }}
      >
        <Iconify icon="ic:round-keyboard-double-arrow-right" width="25" height="25" />
      </Box>
    </Stack>
  )
}
