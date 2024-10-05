import type { ContractStatus, ContractUserCondition } from '@/types/contract'

export const BASE_URL = 'https://sanedaejangbu.site/api'

const api = {
  auth: {
    signUp: '/stores',
    login: '/stores/auth',
    logout: '/stores/auth',
    check: '/stores/auth/check',
    unregister: '/stores',
  },
  menu: {
    list: '/stores/menus',
    create: '/stores/menus',
    editWithId: (menuId: string) => `/stores/menus/${menuId}`,
    deleteWithId: (menuId: string) => `/stores/menus/${menuId}`,
    delete: '/stores/menus',
    edit: '/stores/menus',
  },
  payment: {
    list: (start: string, end: string, companyId?: string) =>
      `/payments/stores?start=${start}&end=${end}&company=${companyId}`,
    create: '/payments/stores',
    delete: (paymentId: string) => `/payments/stores/${paymentId}`,
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
    invoice: (settlementId: string) => `/settlements/${settlementId}/invoice`,
  },
  qr: {
    submit: '/stores/sales',
  },
  common: {
    ocr: '/ocr/license',
  },
}

export default api
