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
}

export default api
