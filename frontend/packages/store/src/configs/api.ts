export const BASE_URL = 'https://sanedaejangbu.site/api'

export type ContractUserCondition = 'all' | 'sender' | 'receiver'
export type ContractStatus = 'all' | 'in' | 'complete' | 'cancel' | 'reject'

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
    list: (userCond: ContractUserCondition, status: ContractStatus) =>
      `/contracts?userCond=${userCond}&status=${status}`,
    create: `/contracts`,
    response: (contractId: string) => `/contracts/${contractId}`,
    terminate: (contractId: string) => `/contracts/${contractId}`,
  },
  settlement: {
    list: (start: string, end: string) => `/settlements?start=${start}&end=${end}`,
    invoice: (settlementId: string) => `/settlements/${settlementId}/invoice`,
  },
  common: {
    ocr: '/ocr/license',
  },
}

export default api
