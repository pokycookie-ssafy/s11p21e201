import type { ReactNode, TouchEvent } from 'react'

import { useState, useEffect } from 'react'

import { Box, Stack, CircularProgress } from '@mui/material'

const NAV_HEIGHT = 66
const SWIPE_HEIGHT = 50
const DEFAULT_HEIGHT = window.innerWidth + NAV_HEIGHT + SWIPE_HEIGHT

interface IProps {
  maxHeight?: number
  children?: ReactNode
  disableKeepMounted?: boolean
}

export function SwipeableEdge({
  maxHeight = DEFAULT_HEIGHT,
  children,
  disableKeepMounted,
}: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [posY, setPosY] = useState(window.innerHeight - NAV_HEIGHT - SWIPE_HEIGHT)

  const MIN_POS = window.innerHeight - NAV_HEIGHT - SWIPE_HEIGHT
  const MAX_POS = window.innerHeight - maxHeight

  const getPos = (pos: number) =>
    Math.min(
      Math.max(pos, window.innerHeight - maxHeight),
      window.innerHeight - NAV_HEIGHT - SWIPE_HEIGHT
    )

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const pos = e.changedTouches[0].clientY - SWIPE_HEIGHT / 2
    setPosY(getPos(pos))
    setIsOpen(true)
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)
  }

  const onTouchMove = (e: globalThis.TouchEvent) => {
    const pos = e.changedTouches[0].clientY - SWIPE_HEIGHT / 2
    setPosY(getPos(pos))
  }

  const onTouchEnd = (e: globalThis.TouchEvent) => {
    const pos = getPos(e.changedTouches[0].clientY - SWIPE_HEIGHT / 2)
    if (pos > window.innerHeight - (maxHeight + NAV_HEIGHT) / 2) {
      setPosY(MIN_POS)
      setIsOpen(false)
    } else {
      setPosY(MAX_POS)
      setIsOpen(true)
    }
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchend', onTouchEnd)
  }

  const onResize = (e: UIEvent) => {
    const pos = window.innerHeight + NAV_HEIGHT + SWIPE_HEIGHT / 2
    setPosY(
      Math.min(Math.max(pos, window.innerHeight - maxHeight), window.innerHeight - NAV_HEIGHT)
    )
  }

  const onClose = () => {
    setPosY(MIN_POS)
    setIsOpen(false)
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => document.removeEventListener('touchend', onTouchEnd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        position="fixed"
        top={0}
        bgcolor={`rgba(0, 0, 0, ${MAX_POS / posY - 0.35})`}
        sx={{ transition: 'all 0.3s', pointerEvents: isOpen ? 'all' : 'none' }}
        onClick={onClose}
      />
      <Stack alignItems="center">
        <Box
          position="fixed"
          width={1}
          top={posY}
          borderRadius={2}
          bgcolor={isOpen ? `common.white` : `transparent`}
          sx={{ transition: 'top 0.1s' }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            height={SWIPE_HEIGHT}
            onTouchStart={onTouchStart}
          >
            <Box width={150} height={6} bgcolor="divider" borderRadius={10} />
          </Stack>
          {disableKeepMounted ? (
            <Box height={maxHeight}>{children}</Box>
          ) : (
            <Box height={maxHeight}>
              {isOpen ? (
                children
              ) : (
                <Stack
                  width={1}
                  sx={{ aspectRatio: 1 }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress size={60} />
                </Stack>
              )}
            </Box>
          )}
        </Box>
      </Stack>
    </>
  )
}
