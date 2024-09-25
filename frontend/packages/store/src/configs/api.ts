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
  },
}

export default api
