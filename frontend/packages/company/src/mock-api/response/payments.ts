import type { IPayment } from '@/types/payment'

type MockResponse =
  | IPayment
  | {
      paidAt: string
    }

export const paymentResponse: MockResponse[] = [
  {
    id: '1',
    employeeId: 'E001',
    employeeName: '김철수',
    price: 35000,
    paidAt: '2024-05-15T09:15:23.000Z',
    departmentId: 'D001',
    departmentName: '영업부',
    storeId: '3a0f412e-1d4f-4fbb-a85d-dac5c2f940e3',
    storeName: '서울식당',
  },
  {
    id: '2',
    employeeId: 'E002',
    employeeName: '이영희',
    price: 42000,
    paidAt: '2024-06-10T12:45:12.000Z',
    departmentId: 'D002',
    departmentName: '마케팅부',
    storeId: 'b4d79274-3dbd-4264-b6cf-53f71fbcc5d4',
    storeName: '부산횟집',
  },
  {
    id: '3',
    employeeId: 'E003',
    employeeName: '박민수',
    price: 27000,
    paidAt: '2024-07-19T14:32:55.000Z',
    departmentId: 'D003',
    departmentName: '개발부',
    storeId: 'f1c85b1a-d06c-46ea-b05e-97a2e36db819',
    storeName: '대구갈비',
  },
  {
    id: '4',
    employeeId: 'E004',
    employeeName: '최은지',
    price: 50000,
    paidAt: '2024-08-23T18:10:45.000Z',
    departmentId: 'D004',
    departmentName: '인사부',
    storeId: '0b294c48-c8b0-4683-9440-4d08f73a1482',
    storeName: '광주한식당',
  },
  {
    id: '5',
    employeeId: 'E005',
    employeeName: '강민준',
    price: 38000,
    paidAt: '2024-05-26T19:45:20.000Z',
    departmentId: 'D005',
    departmentName: '재무부',
    storeId: '5f8a0b82-2b76-42d4-8a93-896b2c5d9fa9',
    storeName: '대전비빔밥',
  },
  {
    id: '6',
    employeeId: 'E001',
    employeeName: '김철수',
    price: 31000,
    paidAt: '2024-06-15T11:30:15.000Z',
    departmentId: 'D001',
    departmentName: '영업부',
    storeId: 'b62ed8e8-13ab-44b2-9d5d-28724a58d9cc',
    storeName: '수원갈비',
  },
  {
    id: '7',
    employeeId: 'E006',
    employeeName: '정현우',
    price: 29000,
    paidAt: '2024-07-03T11:30:15.000Z',
    departmentId: 'D006',
    departmentName: '생산부',
    storeId: 'd6c6bca4-cd91-4b97-9b19-e6d2f4164f88',
    storeName: '인천찌개',
  },
  {
    id: '8',
    employeeId: 'E007',
    employeeName: '김하나',
    price: 32000,
    paidAt: '2024-09-01T14:15:10.000Z',
    departmentId: 'D007',
    departmentName: '품질관리부',
    storeId: '85c68f6f-17b9-42f6-a8b9-191de54a19d4',
    storeName: '울산불고기',
  },
  {
    id: '9',
    employeeId: 'E002',
    employeeName: '이영희',
    price: 40000,
    paidAt: '2024-05-10T12:00:20.000Z',
    departmentId: 'D002',
    departmentName: '마케팅부',
    storeId: 'bbf83567-5f3b-4700-9e88-4fe519587b7e',
    storeName: '제주흑돼지',
  },
  {
    id: '10',
    employeeId: 'E008',
    employeeName: '박지훈',
    price: 45000,
    paidAt: '2024-08-05T17:30:30.000Z',
    departmentId: 'D009',
    departmentName: '디자인부',
    storeId: '6db108a3-e8c0-4bb9-a6b3-681f1f7f2295',
    storeName: '전주비빔밥',
  },
  {
    id: '11',
    employeeId: 'E003',
    employeeName: '박민수',
    price: 31000,
    paidAt: '2024-07-25T13:50:40.000Z',
    departmentId: 'D003',
    departmentName: '개발부',
    storeId: '34a7f5e4-45c5-4c30-9885-282f55f51e4a',
    storeName: '청주된장찌개',
  },
  {
    id: '12',
    employeeId: 'E009',
    employeeName: '장미라',
    price: 46000,
    paidAt: '2024-05-20T18:40:50.000Z',
    departmentId: 'D010',
    departmentName: '법무부',
    storeId: 'd9e460af-2c58-4d88-b6e9-88b5e071774b',
    storeName: '고양짬뽕',
  },
  {
    id: '13',
    employeeId: 'E010',
    employeeName: '이현우',
    price: 33000,
    paidAt: '2024-06-30T15:20:05.000Z',
    departmentId: 'D011',
    departmentName: '공공관계부',
    storeId: 'faad698a-531d-47ef-aec6-3b1092f8d678',
    storeName: '용인냉면',
  },
  {
    id: '14',
    employeeId: 'E011',
    employeeName: '박성준',
    price: 28000,
    paidAt: '2024-07-10T11:30:20.000Z',
    departmentId: 'D012',
    departmentName: '오퍼레이션부',
    storeId: '6148c353-77c7-450b-a412-dcdf0ae16e09',
    storeName: '안양김치찌개',
  },
  {
    id: '15',
    employeeId: 'E012',
    employeeName: '정다희',
    price: 37000,
    paidAt: '2024-06-25T10:50:25.000Z',
    departmentId: 'D013',
    departmentName: '고객서비스부',
    storeId: '16736bb7-0868-4390-b148-c174b3f3a541',
    storeName: '성남불고기',
  },
  {
    id: '16',
    employeeId: 'E013',
    employeeName: '윤재현',
    price: 35000,
    paidAt: '2024-05-13T09:20:12.000Z',
    departmentId: 'D014',
    departmentName: '보안부',
    storeId: '3a0f412e-1d4f-4fbb-a85d-dac5c2f940e3',
    storeName: '서울식당',
  },
  {
    id: '17',
    employeeId: 'E014',
    employeeName: '김지수',
    price: 32000,
    paidAt: '2024-08-05T14:30:12.000Z',
    departmentId: 'D015',
    departmentName: '시설관리부',
    storeId: '5f8a0b82-2b76-42d4-8a93-896b2c5d9fa9',
    storeName: '대전비빔밥',
  },
  {
    id: '18',
    employeeId: 'E003',
    employeeName: '박민수',
    price: 42000,
    paidAt: '2024-06-08T16:15:22.000Z',
    departmentId: 'D003',
    departmentName: '개발부',
    storeId: 'b62ed8e8-13ab-44b2-9d5d-28724a58d9cc',
    storeName: '수원갈비',
  },
  {
    id: '19',
    employeeId: 'E004',
    employeeName: '최은지',
    price: 45000,
    paidAt: '2024-09-10T13:00:25.000Z',
    departmentId: 'D004',
    departmentName: '인사부',
    storeId: 'd6c6bca4-cd91-4b97-9b19-e6d2f4164f88',
    storeName: '인천찌개',
  },
  {
    id: '20',
    employeeId: 'E005',
    employeeName: '강민준',
    price: 33000,
    paidAt: '2024-07-18T11:15:17.000Z',
    departmentId: 'D005',
    departmentName: '재무부',
    storeId: 'bbf83567-5f3b-4700-9e88-4fe519587b7e',
    storeName: '제주흑돼지',
  },
  {
    id: '21',
    employeeId: 'E006',
    employeeName: '정현우',
    price: 25000,
    paidAt: '2024-05-25T10:10:14.000Z',
    departmentId: 'D006',
    departmentName: '생산부',
    storeId: 'faad698a-531d-47ef-aec6-3b1092f8d678',
    storeName: '용인냉면',
  },
  {
    id: '22',
    employeeId: 'E007',
    employeeName: '김하나',
    price: 37000,
    paidAt: '2024-06-09T12:30:22.000Z',
    departmentId: 'D007',
    departmentName: '품질관리부',
    storeId: 'b62ed8e8-13ab-44b2-9d5d-28724a58d9cc',
    storeName: '수원갈비',
  },
  {
    id: '23',
    employeeId: 'E008',
    employeeName: '박지훈',
    price: 38000,
    paidAt: '2024-09-20T14:30:17.000Z',
    departmentId: 'D008',
    departmentName: '연구개발부',
    storeId: '34a7f5e4-45c5-4c30-9885-282f55f51e4a',
    storeName: '청주된장찌개',
  },
  {
    id: '24',
    employeeId: 'E002',
    employeeName: '이영희',
    price: 28000,
    paidAt: '2024-08-03T17:10:12.000Z',
    departmentId: 'D002',
    departmentName: '마케팅부',
    storeId: '5f8a0b82-2b76-42d4-8a93-896b2c5d9fa9',
    storeName: '대전비빔밥',
  },
  {
    id: '25',
    employeeId: 'E009',
    employeeName: '장미라',
    price: 26000,
    paidAt: '2024-05-27T12:20:30.000Z',
    departmentId: 'D010',
    departmentName: '법무부',
    storeId: 'faad698a-531d-47ef-aec6-3b1092f8d678',
    storeName: '용인냉면',
  },
  {
    id: '26',
    employeeId: 'E010',
    employeeName: '이현우',
    price: 27000,
    paidAt: '2024-06-05T10:50:20.000Z',
    departmentId: 'D011',
    departmentName: '공공관계부',
    storeId: 'd9e460af-2c58-4d88-b6e9-88b5e071774b',
    storeName: '고양짬뽕',
  },
  {
    id: '27',
    employeeId: 'E011',
    employeeName: '박성준',
    price: 35000,
    paidAt: '2024-08-22T18:45:40.000Z',
    departmentId: 'D012',
    departmentName: '오퍼레이션부',
    storeId: 'f1c85b1a-d06c-46ea-b05e-97a2e36db819',
    storeName: '대구갈비',
  },
  {
    id: '28',
    employeeId: 'E001',
    employeeName: '김철수',
    price: 45000,
    paidAt: '2024-07-13T14:15:10.000Z',
    departmentId: 'D001',
    departmentName: '영업부',
    storeId: '6db108a3-e8c0-4bb9-a6b3-681f1f7f2295',
    storeName: '전주비빔밥',
  },
  {
    id: '29',
    employeeId: 'E013',
    employeeName: '윤재현',
    price: 48000,
    paidAt: '2024-09-05T13:40:55.000Z',
    departmentId: 'D014',
    departmentName: '보안부',
    storeId: 'bbf83567-5f3b-4700-9e88-4fe519587b7e',
    storeName: '제주흑돼지',
  },
  {
    id: '30',
    employeeId: 'E015',
    employeeName: '정유진',
    price: 29000,
    paidAt: '2024-06-17T10:25:30.000Z',
    departmentId: 'D015',
    departmentName: '시설관리부',
    storeId: 'faad698a-531d-47ef-aec6-3b1092f8d678',
    storeName: '용인냉면',
  },
]
