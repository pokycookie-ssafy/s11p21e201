import api from '@/configs/api'
import { createServer } from 'miragejs'

export default function initServer() {
  createServer({
    routes() {
      this.namespace = 'api'

      this.get(api.todo, () => 'TEST', { timing: 2000 })

      this.get('/companies/stores', () => [
        { id: '1', name: '고봉김밥', phone: '010-1234-5678', address: '서울시 강남구' },
        { id: '2', name: '고봉식당', phone: '010-2345-6789', address: '서울시 서초구' },
        { id: '3', name: '고봉순두부', phone: '010-3456-7890', address: '서울시 송파구' },
      ])

      this.get('/companies/employees', () => [
        {
          id: 'emp001',
          name: '김철수',
          departmentId: 'dept01',
          departmentName: 'CM마케팅본부',
          supportAmount: 500000,
          spentAmount: 200000,
        },
        {
          id: 'emp002',
          name: '이영희',
          departmentId: 'dept02',
          departmentName: 'CM프로젝트지원본부',
          supportAmount: 400000,
          spentAmount: 150000,
        },
        {
          id: 'emp003',
          name: '박지훈',
          departmentId: 'dept03',
          departmentName: 'CM기획본부',
          supportAmount: 450000,
          spentAmount: 250000,
        },
        {
          id: 'emp004',
          name: '최민수',
          departmentId: 'dept04',
          departmentName: '기술안전지원단',
          supportAmount: 500000,
          spentAmount: 300000,
        },
        {
          id: 'emp005',
          name: '정하늘',
          departmentId: 'dept05',
          departmentName: '설계1본부',
          supportAmount: 350000,
          spentAmount: 100000,
        },
        {
          id: 'emp006',
          name: '오세훈',
          departmentId: 'dept06',
          departmentName: '설계2본부',
          supportAmount: 600000,
          spentAmount: 500000,
        },
        {
          id: 'emp007',
          name: '김민지',
          departmentId: 'dept07',
          departmentName: '설계3본부',
          supportAmount: 300000,
          spentAmount: 120000,
        },
        {
          id: 'emp008',
          name: '홍길동',
          departmentId: 'dept08',
          departmentName: '설계기획본부',
          supportAmount: 550000,
          spentAmount: 350000,
        },
        {
          id: 'emp009',
          name: '박수현',
          departmentId: 'dept01',
          departmentName: 'CM마케팅본부',
          supportAmount: 500000,
          spentAmount: 400000,
        },
      ])

      this.get('/companies/managers', () => [
        {
          id: '1',
          departmentId: 'D001',
          departmentName: '영업부',
          supportAmount: 5000,
          spentAmount: 3000,
        },
        {
          id: '2',
          departmentId: 'D002',
          departmentName: '마케팅부',
          supportAmount: 7000,
          spentAmount: 4500,
        },
        {
          id: '3',
          departmentId: 'D003',
          departmentName: '개발부',
          supportAmount: 10000,
          spentAmount: 8500,
        },
        {
          id: '4',
          departmentId: 'D004',
          departmentName: '인사부',
          supportAmount: 4000,
          spentAmount: 2500,
        },
        {
          id: '5',
          departmentId: 'D005',
          departmentName: '회계부',
          supportAmount: 6000,
          spentAmount: 5000,
        },
      ])

      this.get('/companies/stores', () => [
        {
          id: '1',
          name: '김밥천국 강남점',
          phone: '010-1234-5678',
          address: '서울특별시 강남구 테헤란로 123',
        },
        {
          id: '2',
          name: '봉구스 밥버거 마포점',
          phone: '010-9876-5432',
          address: '서울특별시 마포구 독막로 45',
        },
        {
          id: '3',
          name: '이삭토스트 서초점',
          phone: '010-5555-6666',
          address: '서울특별시 서초구 서초대로 90',
        },
        {
          id: '4',
          name: '맘스터치 해운대점',
          phone: '010-7777-8888',
          address: '부산광역시 해운대구 해운대로 250',
        },
        {
          id: '5',
          name: '백종원의 국밥 동성로점',
          phone: '010-2222-3333',
          address: '대구광역시 중구 동성로 100',
        },
      ])

      this.get('/stores', () => [
        {
          storeId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          name: '김밥천국 강남점',
          licenseNo: '123-45-67890',
          address: '서울특별시 강남구 테헤란로 123',
          category: '한식',
          ownerName: '홍길동',
          phone: '010-1234-5678',
        },
        {
          storeId: '9a470fa2-dedf-4d10-b42b-2b9e0c5dbb26',
          name: '봉구스 밥버거 마포점',
          licenseNo: '234-56-78901',
          address: '서울특별시 마포구 독막로 45',
          category: '패스트푸드',
          ownerName: '이몽룡',
          phone: '010-9876-5432',
        },
        {
          storeId: 'a3c5b7d2-8fda-4c34-9415-0d09d37a57e2',
          name: '이삭토스트 서초점',
          licenseNo: '345-67-89012',
          address: '서울특별시 서초구 서초대로 90',
          category: '카페',
          ownerName: '성춘향',
          phone: '010-5555-6666',
        },
        {
          storeId: 'bb56f1b3-4a89-4e72-8a1e-5f6d67f3b675',
          name: '맘스터치 해운대점',
          licenseNo: '456-78-90123',
          address: '부산광역시 해운대구 해운대로 250',
          category: '패스트푸드',
          ownerName: '장보고',
          phone: '010-7777-8888',
        },
        {
          storeId: 'c2d62c9f-7280-48fa-b9d7-6a213f3d6a97',
          name: '백종원의 국밥 동성로점',
          licenseNo: '567-89-01234',
          address: '대구광역시 중구 동성로 100',
          category: '한식',
          ownerName: '백종원',
          phone: '010-2222-3333',
        },
        {
          storeId: 'f105d36c-8421-4676-85f7-10e5ff0d9957',
          name: '스타벅스 종로점',
          licenseNo: '678-90-12345',
          address: '서울특별시 종로구 종로 1',
          category: '카페',
          ownerName: '제임스 김',
          phone: '010-4444-5555',
        },
        {
          storeId: 'd294667c-5b45-4518-87ae-7b957dc76e25',
          name: '빕스 송파점',
          licenseNo: '789-01-23456',
          address: '서울특별시 송파구 올림픽로 300',
          category: '양식',
          ownerName: '최영희',
          phone: '010-6666-7777',
        },
        {
          storeId: 'a76e3095-dcd6-4d13-a412-45e2edb0df59',
          name: '하남돼지집 하남점',
          licenseNo: '890-12-34567',
          address: '경기도 하남시 하남대로 58',
          category: '한식',
          ownerName: '정수빈',
          phone: '010-8888-9999',
        },
      ])
    },
  })
}
