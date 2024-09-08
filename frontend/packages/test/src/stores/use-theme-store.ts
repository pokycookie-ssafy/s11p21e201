import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
  toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        mode: 'light',
        toggle: () => set((state) => ({ mode: toggleMode(state.mode) })),
      }),
      { name: 'theme-storage' }
    )
  )
)

function toggleMode(mode: ThemeMode): ThemeMode {
  if (mode === 'light') {
    return 'dark'
  }
  if (mode === 'dark') {
    return 'light'
  }
  return 'light'
}
