export const BASE_URL = '/api'

const api = {
  auth: {
    signUp: '/stores',
    login: '/stores/auth',
    logout: '/stores/auth',
    check: '/stores/auth/check',
    unregister: '/stores',
  },
  signUp: {
    bank: '/bank',
  },
  management: {
    payment: '/stores/menus/sales',
  },
  menu: {
    list: '/stores/menus',
  },
  contract: {
    list: '/stores/contracts',
    request: '/stores/contracts/request',
    response: '/stores/contracts/response',
    history: '/stores/contracts/history',
  },
  settlement: {
    list: '/stores/settlements',
  },
  common: {
    ocr: '/licenses/signup',
  },
}

export default api
