export const BASE_URL = '/api'

const api = {
  signUp: {
    ocr: '/licenses/signup',
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
}

export default api
