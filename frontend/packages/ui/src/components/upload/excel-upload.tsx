import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, alpha, Stack, Typography } from '@mui/material'

import { Iconify } from '../iconify'

interface IProps {
  placeholder?: string
  onChange?: (files: File[]) => void
}

export function ExcelUpload({ placeholder, onChange }: IProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (onChange) {
        onChange(acceptedFiles)
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: {
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xls', '.xlsx'],
    },
    onDrop,
  })

  return (
    <Stack>
      <Box
        {...getRootProps()}
        sx={{
          width: 1,
          minHeight: 250,
          p: 5,
          outline: 'none',
          borderRadius: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: (theme) => theme.palette.text.disabled,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
          transition: (theme) =>
            theme.transitions.create(['opacity', 'padding', 'background', 'border', 'color']),
          '&:hover': {
            color: 'primary.main',
            borderColor: 'primary.main',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          },
          ...(isDragActive && {
            color: 'primary.main',
            borderColor: 'primary.main',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          }),
          ...(isDragReject && {
            color: 'error.main',
            borderColor: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
        }}
      >
        <input {...getInputProps()} />
        <Stack justifyContent="center" alignItems="center" spacing={1}>
          <Iconify icon="eva:cloud-upload-fill" width={50} />
          <Typography>{placeholder}</Typography>
        </Stack>
      </Box>
    </Stack>
  )
}
