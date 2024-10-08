import type { ContractStatus, ContractUserCondition } from '@/types/contract'

export const BASE_URL = 'https://sanedaejangbu.site/api'

const api = {
  auth: {
    signUpInfo: '/companies/info',
    signUp: '/companies',
    login: '/companies/auth',
    logout: '/stores/auth',
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
    department: '/payments/companies/employees',
    departmentWith: (start: string, end: string, departmentId?: string) =>
      `/payments/companies/employees?startDate=${start}&endDate=${end}&departmentId=${departmentId ?? ''}`,
    employee: '/payments/companies/employees',
    employeeWith: (start: string, end: string, employeeId?: string) =>
      `/payments/companies/employees/${employeeId}?startDate=${start}&endDate=${end}`,
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
    list: '/settlements',
    listWith: (start: string, end: string) => `/settlements?startTime=${start}&endTime=${end}`,
    settle: '/settlements',
    invoice: '/settlements/{settlementId}/invoice',
    invoiceWith: (settlementId: string) => `/settlements/${settlementId}/invoice`,
  },
  common: {
    ocr: '/ocr/license',
  },
}

export default api
