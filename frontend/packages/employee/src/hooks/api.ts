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

// login API 함수
export const postLogin = async (data: {
  companyCode: string
  employeeCode: string
  password: string
}) => {
  const url = api.login
  const response = await axios.post(url, data)
  return response.data
}

// React Query의 useMutation을 사용하여 login 데이터를 보내는 훅
export const useLogin = () =>
  useMutation({
    mutationFn: postLogin,
  })

// 비밀번호 변경을 위한 API 요청 함수
export const putChangePw = async (
  id: string,
  passwords: {
    originPassword: string
    newPassword: string
    confirmPassword: string
  }
) => {
  const url = api.changePw(id) // URL에 id를 직접 추가
  const response = await axios.put(url, { password: passwords })
  return response.data
}

// React Query의 useMutation을 사용하여 비밀번호 변경 요청을 보내는 훅
export const useChangePw = () =>
  useMutation({
    mutationFn: ({
      id,
      originPassword,
      newPassword,
      confirmPassword,
    }: {
      id: string
      originPassword: string
      newPassword: string
      confirmPassword: string
    }) => putChangePw(id, { originPassword, newPassword, confirmPassword }),
  })

// logout
export const getLogout = async () => {
  const url = api.login
  const response = await axios.get(url)
  return response.status
}

export const useLogout = () =>
  useMutation({
    mutationFn: getLogout, // GET 요청이지만 단발성 작업이므로 useMutation 사용
  })

// login 한 유저 정보 조회를 위한 API 요청 함수
export const getUser = async (id: string) => {
  const url = api.user(id) // URL에 employeeId를 동적으로 추가
  const response = await axios.get(url)
  return response.data
}

// React Query의 useQuery를 사용하여 유저 정보를 불러오는 훅
export const useUser = (id: string) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  })

// 식사 기록 조회 API 함수
export const getMealRecords = async (id: string, start: string, end: string) => {
  const url = api.payments(id, start, end)
  const response = await axios.get(url)
  return response.data
}

// React Query의 useQuery를 사용하여 식사 기록 조회 데이터를 불러오는 훅
export const useMealRecords = (id: string, start: string, end: string) =>
  useQuery({
    queryKey: ['mealRecords', id, start, end],
    queryFn: () => getMealRecords(id, start, end),
  })
