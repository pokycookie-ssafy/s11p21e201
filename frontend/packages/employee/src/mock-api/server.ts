import api from '@/configs/api'
import { v4 as uuidv4 } from 'uuid' // UUID 생성 함수
import { Response, createServer } from 'miragejs'

export default function initServer() {
  createServer({
    routes() {
      this.namespace = 'api'

      this.get(api.todo, () => 'TEST', { timing: 2000 })

      this.get('/employees/:id/meals', (schema, request) => {
        const { id } = request.params
        console.log('Requested Employee ID:', id)

        // 여기에서 실제 데이터를 반환할 수 있습니다.
        return {
          monthlyAmount: 220000,
          currentUsage: 142000,
        }
      })

      // EmployeeStoreResponse 리스트 반환
      this.get('/employees/stores', (schema, request) =>
        // const id = request.params.id;
        // console.log("Requested Employee ID for stores:", id)

        [
          {
            storeName: '고봉1',
            storeAddress: '서울특별시 강남구 고봉로 123',
            storePhone: '051-987-2345',
          },
          {
            storeName: '고봉국밥2',
            storeAddress: '서울특별시 강남구 국밥로 456',
            storePhone: '051-678-0123',
          },
          {
            storeName: '고봉돈까스3',
            storeAddress: '서울특별시 강남구 돈까스로 789',
            storePhone: '051-347-8956',
          },
          {
            storeName: '고봉순두부4',
            storeAddress: '서울특별시 강남구 순두부로 101',
            storePhone: '051-125-4685',
          },
          {
            storeName: '고봉김밥5',
            storeAddress: '서울특별시 강남구 고봉로 123',
            storePhone: '051-987-2345',
          },
          {
            storeName: '고봉국밥6',
            storeAddress: '서울특별시 강남구 국밥로 456',
            storePhone: '051-678-0123',
          },
          {
            storeName: '고봉돈까스7',
            storeAddress: '서울특별시 강남구 돈까스로 789',
            storePhone: '051-347-8956',
          },
          {
            storeName: '고봉순두부8',
            storeAddress: '서울특별시 강남구 순두부로 101',
            storePhone: '051-125-4685',
          },
          {
            storeName: '고봉1',
            storeAddress: '서울특별시 강남구 고봉로 123',
            storePhone: '051-987-2345',
          },
          {
            storeName: '고봉국밥2',
            storeAddress: '서울특별시 강남구 국밥로 456',
            storePhone: '051-678-0123',
          },
          {
            storeName: '고봉돈까스3',
            storeAddress: '서울특별시 강남구 돈까스로 789',
            storePhone: '051-347-8956',
          },
          {
            storeName: '고봉순두부4',
            storeAddress: '서울특별시 강남구 순두부로 101',
            storePhone: '051-125-4685',
          },
          {
            storeName: '고봉김밥5',
            storeAddress: '서울특별시 강남구 고봉로 123',
            storePhone: '051-987-2345',
          },
          {
            storeName: '고봉국밥6',
            storeAddress: '서울특별시 강남구 국밥로 456',
            storePhone: '051-678-0123',
          },
          {
            storeName: '고봉돈까스7',
            storeAddress: '서울특별시 강남구 돈까스로 789',
            storePhone: '051-347-8956',
          },
          {
            storeName: '고봉순두부8',
            storeAddress: '서울특별시 강남구 순두부로 101',
            storePhone: '051-125-4685',
          },
        ]
      )

      this.post('/employees/auth', (schema, request) => {
        const { companyCode, employeeCode, password } = JSON.parse(request.requestBody)

        // 모든 요청을 성공 처리
        if (companyCode && employeeCode && password) {
          return new Response(
            201,
            { 'Content-Type': 'application/json' },
            JSON.stringify({
              employeeId: uuidv4(),
              employeeCode,
              employeeName: '박명수',
            })
          )
        }

        return new Response(
          401,
          { 'Content-Type': 'applicationson' },
          { error: '로그인 정보가 잘못되었습니다.' }
        )
      })

      // 비밀번호 변경 PUT 요청
      this.put('/employees/:id/password', (schema, request) => {
        const {
          password: { originPassword, newPassword, confirmPassword },
        } = JSON.parse(request.requestBody)

        // 비밀번호 변경 로직
        if (originPassword && newPassword && confirmPassword) {
          return new Response(
            200,
            { 'Content-Type': 'application/json' },
            { message: '비밀번호가 성공적으로 변경되었습니다.' }
          )
        }

        return new Response(
          400,
          { 'Content-Type': 'application/json' },
          { error: '비밃번호 정보가 잘못되었습니다.' }
        )
      })

      // Logout GET 요청
      this.get('/employees/auth', (schema, request) => {
        const success = true

        if (success) {
          return new Response(204, {}, '')
        }
        return new Response(500, {}, '')
      })

      this.get('/employees/:id', (schema, request) => {
        const { id } = request.params
        if (id) {
          return {
            employeeId: id,
            employeeName: '홍길동',
            companyName: 'Toss Corp',
            companyDepartName: '개발팀',
          }
        }
        return new Response(400, {}, { error: '직원 ID가 필요합니다.' })
      })

      this.get('/employees/:id/menus', (schema, request) => {
        const { id } = request.params
        const { start, end } = request.queryParams

        if (id && start && end) {
          // 필터링 로직을 추가하여 start와 end 사이의 데이터를 반환
          const records = [
            {
              createdAt: '2023-09-15T18:30:00',
              storeName: '씨유(CU)',
              storeMenu: '사시미',
              price: 4000,
            },
            {
              createdAt: '2023-09-12T12:45:00',
              storeName: '피자집',
              storeMenu: '마르게리타',
              price: 12000,
            },
            {
              createdAt: '2023-10-15T18:30:00',
              storeName: '씨유(CU)',
              storeMenu: '사시미',
              price: 4000,
            },
            {
              createdAt: '2023-10-12T12:45:00',
              storeName: '피자집',
              storeMenu: '마르게리타',
              price: 12000,
            },
            {
              createdAt: '2024-09-15T18:30:00',
              storeName: '씨유(CU)',
              storeMenu: '사시미',
              price: 4000,
            },
            {
              createdAt: '2024-09-12T12:45:00',
              storeName: '피자집',
              storeMenu: '마르게리타',
              price: 12000,
            },
          ]

          // `start`와 `end` 기간 내에 해당하는 기록만 필터링
          const filteredRecords = records.filter((record) => {
            const createdAt = new Date(record.createdAt)
            // return createdAt >= new Date(start) && createdAt <= new Date(end)
            return true
          })

          return filteredRecords
        }

        return new Response(400, {}, { error: '요청에 필요한 데이터가 부족합니다.' })
      })
    },
  })
}
