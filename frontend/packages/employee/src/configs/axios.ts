import type { AxiosError } from 'axios'

import _axios from 'axios'
import { BASE_URL } from '@/configs/api'

const axios = _axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.reload()
    }
    if (error.code === 'ERR_NETWORK') {
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

export default axios
