import api from '@/configs/api'
import axios from '@/configs/axios'
import { useQuery, useMutation } from '@tanstack/react-query'

// employeeMeal 데이터를 가져오는 API 요청 함수
export const getEmployeeMeal = async (id: string) => {
  const url = api.employeeMeal(id) // URL에 id를 직접 추가
  const response = await axios.get(url)
  return response.data
}

// React Query의 useQuery를 사용하여 employeeMeal 데이터를 불러오는 훅
export const useEmployeeMeal = (id: string) =>
  useQuery({
    queryKey: ['employeeMeal', id],
    queryFn: () => getEmployeeMeal(id),
  })

// storesList 데이터를 가져오는 API 요청 함수
export const getStoresList = async () => {
  const url = api.storesList
  const response = await axios.get(url)
  return response.data
}

// React Query의 useQuery를 사용하여 storesList 데이터를 불러오는 훅
export const useStoresList = () =>
  useQuery({
    queryKey: ['storesList'],
    queryFn: () => getStoresList(),
  })

// validationId를 서버로 보내는 API 함수
export const postValidationId = async (data: { generatedId: string }) => {
  const url = api.validationId
  const response = await axios.post(url, data) // 이 부분에서 data를 body로 보냄
  return response.data
}

// React Query의 useMutation을 사용하여 validationId 데이터를 보내는 훅
export const useValidationId = () =>
  useMutation({
    mutationFn: postValidationId,
  })
