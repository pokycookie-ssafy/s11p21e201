import { create } from 'zustand'

interface SwipeState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useSwipeStore = create<SwipeState>()((set) => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
}))
