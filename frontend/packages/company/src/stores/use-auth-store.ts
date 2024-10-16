import { create } from 'zustand'

export interface IAuth {
  id: string
  departmentId?: string
  departmentName?: string
}

export interface ICompanyResponse {
  companyId: string
}

export interface IEmployeeResponse {
  managerId: string
  departmentId: string
  departmentName: string
}

interface AuthState {
  user: IAuth | null
  isLogin: boolean
  isCompany: boolean
  loginCompany: (user: ICompanyResponse) => void
  loginManager: (user: IEmployeeResponse) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLogin: false,
  isCompany: false,
  loginCompany: ({ companyId }: ICompanyResponse) =>
    set(() => ({ user: { id: companyId }, isLogin: true, isCompany: true })),
  loginManager: ({ managerId, ...others }: IEmployeeResponse) =>
    set(() => ({ user: { id: managerId, ...others }, isLogin: true, isCompany: false })),
  logout: () => set(() => ({ user: null, isLogin: false })),
}))
