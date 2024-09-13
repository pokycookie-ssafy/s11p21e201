export const BASE_URL = '/api'

const api = {
  todo: '/todo',
  employeeMeal: (id: string) => `/employees/${id}/meals`, // 식대 사용 현황 및 월 식대 조회 API
  storesList: '/employees/stores', // 제휴 식당 리스트 조회 API
  validationId: '/employees/qr', // QR 코드 uuid POST API
}

export default api
