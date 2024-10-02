export const BASE_URL = 'https://sanedaejangbu.site/api'

export type ContractUserCondition = 'all' | 'sender' | 'receiver'
export type ContractStatus = 'all' | 'in' | 'complete' | 'cancel' | 'reject'

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
    signUp: '/companies/managers',
    login: '/companies/managers/auth',
  },
  department: {
    list: '/companies/departments',
  },
  employee: {
    list: (departmentId?: string) => `/companies/employees?department=${departmentId}`,
  },
  payment: {
    list: (start: string, end: string, departmentId?: string) =>
      `/payments/companies?start=${start}&end=${end}&department=${departmentId}`,
    detail: (start: string, end: string, employeeId?: string) =>
      `/payments/companies/employees/${employeeId}?start=${start}&end=${end}`,
  },
  contract: {
    list: (userCond: ContractUserCondition, status: ContractStatus) =>
      `/contracts?userCond=${userCond}&status=${status}`,
    create: `/contracts`,
    response: (contractId: string) => `/contracts/${contractId}`,
    terminate: (contractId: string) => `/contracts/${contractId}`,
  },
  settlement: {
    list: (start: string, end: string) => `/settlements?start=${start}&end=${end}`,
  },
  common: {
    ocr: '/ocr/license',
  },
}

export default api
