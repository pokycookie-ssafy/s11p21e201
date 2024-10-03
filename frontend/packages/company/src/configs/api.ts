import type { ContractStatus, ContractUserCondition } from '@/types/contract'

export const BASE_URL = 'https://sanedaejangbu.site/api'

const api = {
  auth: {
    signUpInfo: '/companies/info',
    signUp: '/companies',
    login: '/companies/auth',
    logout: '/companies/auth',
    check: '/companies/auth/check',
    unregister: '/companies',
  },
  manager: {
    list: '/companies/managers',
    create: '/companies/managers',
    login: '/companies/managers/auth',
  },
  department: {
    list: '/companies/departments',
    create: '/companies/departments',
  },
  employee: {
    list: `/companies/employees`,
    create: `/companies/employees`,
    delete: `/companies/employees`,
    deleteWith: (id: string) => `/companies/employees/${id}`,
  },
  payment: {
    list: (start: string, end: string, departmentId?: string) =>
      `/payments/companies?start=${start}&end=${end}&department=${departmentId}`,
    detail: (start: string, end: string, employeeId?: string) =>
      `/payments/companies/employees/${employeeId}?start=${start}&end=${end}`,
  },
  contract: {
    list: `/contracts`,
    listWith: (userCond: ContractUserCondition, status: ContractStatus) =>
      `/contracts?userCond=${userCond}&status=${status}`,
    create: `/contracts`,
    response: `/contracts/respond`,
    terminate: `/contracts`,
    terminateWith: (contractId: string) => `/contracts/${contractId}`,
  },
  settlement: {
    list: (start: string, end: string) => `/settlements?start=${start}&end=${end}`,
  },
  common: {
    ocr: '/ocr/license',
  },
}

export default api
