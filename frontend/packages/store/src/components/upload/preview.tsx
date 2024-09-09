import type { FilePreviewProps } from '@/components/upload/types'

import { fData } from '@/utils/number-format'
import { useBoolean } from '@/hooks/use-boolean'

import { Box, Stack, alpha, Dialog, Typography, IconButton } from '@mui/material'

import { Iconify } from '@e201/ui'

export function Preview({ file, onDelete }: FilePreviewProps) {
  const fileName = typeof file === 'string' ? file : file.name
  const previewUrl = typeof file === 'string' ? file : URL.createObjectURL(file)

  const previewModal = useBoolean()

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          width: 1,
          height: 70,
          p: 0.5,
          color: (theme) => theme.palette.text.primary,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
          borderRadius: 1,
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.1),
          },
        }}
      >
        <Stack direction="row" spacing={1}>
          <Box
            component="img"
            alt={fileName}
            src={previewUrl}
            sx={{
              height: 1,
              aspectRatio: 1,
              borderRadius: 1,
              objectFit: 'cover',
              border: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
              cursor: 'pointer',
            }}
            onClick={previewModal.onTrue}
          />

          <Stack justifyContent="center">
            <Typography variant="subtitle1">{file.name}</Typography>
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.text.secondary }}>
              {fData(file.size)}
            </Typography>
          </Stack>
        </Stack>

        <Stack justifyContent="center">
          <IconButton onClick={onDelete}>
            <Iconify icon="solar:minus-circle-linear" />
          </IconButton>
        </Stack>
      </Stack>

      <Dialog open={previewModal.value} onClose={previewModal.onFalse} maxWidth="md" fullWidth>
        <Stack justifyContent="center" alignItems="center" sx={{ p: 1 }}>
          <Box
            component="img"
            alt={fileName}
            src={previewUrl}
            sx={{
              width: 1,
              borderRadius: 1,
              aspectRatio: 4 / 3,
              objectFit: 'contain',
            }}
          />
        </Stack>
      </Dialog>
    </>
  )
}
