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
}

export default api
