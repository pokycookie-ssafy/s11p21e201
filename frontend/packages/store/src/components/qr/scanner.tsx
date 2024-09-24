import QrScanner from 'qr-scanner'
import { useBoolean } from '@e201/utils'
import { useRef, useEffect } from 'react'

import { Box } from '@mui/material'

interface IProps {
  onSuccess?: (data: string) => void
}

export function Scanner({ onSuccess }: IProps) {
  const scanner = useRef<QrScanner>()
  const videoEl = useRef<HTMLVideoElement>(null)

  const scanning = useBoolean(true)

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    if (onSuccess) {
      onSuccess(result.data)
    }
    scanner.current?.stop()
  }

  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        onDecodeError: (err) => console.log(err),
        maxScansPerSecond: 2,
      })
      scanner.current.start().then(scanning.onTrue).catch(scanning.onFalse)
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (!videoEl.current) {
        scanner.current?.stop()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Box component="video" ref={videoEl} width={1} height={1} sx={{ objectFit: 'cover' }} />
}
