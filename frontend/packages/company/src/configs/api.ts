export const BASE_URL = '/api'

const api = {
  auth: {
    signUp: '/company',
    login: '/company/auth',
    logout: '/company/auth',
    check: '/company/auth/check',
    unregister: '/company',
  },
  signUp: {
    bank: '/bank',
  },
  common: {
    ocr: '/licenses/signup',
  },
  contract: {
    list: '/stores/contracts',
    received: '/stores/contracts/received',
    send: '/stores/contracts/send',
    history: '/stores/contracts/history',
  },
  payments: {
    list: (start: string, end: string, departmentId?: string) =>
      `/payments/companies?start=${start}&end=${end}&department=${departmentId}`,
    detail: (start: string, end: string, employeeId?: string) =>
      `/payments/companies/employees/${employeeId}?start=${start}&end=${end}`,
  },
  departments: {
    list: '/companies/departments',
  },
  employees: {
    list: (departmentId?: string) => `/companies/employees?department=${departmentId}`,
  },
}

export default api
