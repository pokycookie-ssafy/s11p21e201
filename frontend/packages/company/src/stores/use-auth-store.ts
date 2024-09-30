import { create } from 'zustand'

export interface IAuth {
  id: string
  name: string
  email: string
  phone: string
}

interface AuthState {
  user: IAuth | null
  isLogin: boolean
  login: (user: IAuth) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLogin: false,
  login: (user: IAuth) => set(() => ({ user, isLogin: true })),
  logout: () => set(() => ({ user: null, isLogin: false })),
}))
