import api from '@/configs/api'
import { createServer } from 'miragejs'

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
            storeName: '고봉김밥1',
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
    },
  })
}
