import { useDropzone } from 'react-dropzone'
import { useState, useEffect, useCallback } from 'react'
import { Box, alpha, Stack, Typography } from '@mui/material'

import { Preview } from './preview'
import { Iconify } from '../iconify'

interface IProps {
  placeholder?: string
  multiple?: boolean
  onChange?: (files: File[]) => void
}

export function Upload({ placeholder, multiple, onChange }: IProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (multiple) {
        acceptedFiles.forEach((file) => setFiles((prev) => [...prev, file]))
        return
      }
      if (acceptedFiles.length > 0) {
        setFiles([acceptedFiles[0]])
      }
    },
    [multiple]
  )

  const deleteHandler = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    onDrop,
    multiple,
  })

  useEffect(() => {
    if (onChange) {
      onChange(files)
    }
  }, [files, onChange])

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

      {files.length > 0 && (
        <Stack spacing={1} mt={1}>
          {files.map((file, i) => (
            <Preview key={file.name + i} file={file} onDelete={() => deleteHandler(i)} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}
