import type { IContractResponse } from '@/types/contract'

type ContractMock =
  | IContractResponse
  | {
      contractDate: string
    }

export const contractNow: ContractMock[] = [
  {
    contractId: '71ca0179-bf2c-46fa-ab7d-61a7d370a958',
    storeId: '71ca0179-bf2c-46fa-ab7d-61a7d370a958123',
    storeName: '삼성전자',
    storeEmail: 'electronic@samsung.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-06-21T17:55:32Z',
    settlementDate: 25,
  },
  {
    contractId: '71ca0179-bf2c-1234-ab7d-61a7d370a958',
    storeId: '71ca0179-bf2c-1234-ab7d-61a7d370a958123',
    storeName: '멀티캠퍼스',
    storeEmail: 'multi@campus.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-07-15T17:55:32Z',
    settlementDate: 25,
  },
  {
    contractId: 'c9e32d88-3e4d-4381-9ce8-dc643c26010a',
    storeId: 'c9e32d88-3e4d-4381-9ce8-dc643c26010a123',
    storeName: 'LG전자',
    storeEmail: 'contact@lg.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-01-03T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: '54153db3-91f0-48b4-875f-5633895d9e4c',
    storeId: '54153db3-91f0-48b4-875f-5633895d9e4c123',
    storeName: '네이버',
    storeEmail: 'contact@naver.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-03-07T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: '5f59a356-e1f0-4899-a3a6-2521631b5640',
    storeId: '5f59a356-e1f0-4899-a3a6-2521631b5640123',
    storeName: '카카오',
    storeEmail: 'contact@kakao.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2023-11-29T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: 'c63eaaad-992d-4cb5-82fb-c114ac0d787f',
    storeId: 'c63eaaad-992d-4cb5-82fb-c114ac0d787f123',
    storeName: '현대자동차',
    storeEmail: 'contact@hyundai.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-08-12T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: 'ca4dfdcd-4184-4ada-a45f-74ff56b8b175',
    storeId: 'ca4dfdcd-4184-4ada-a45f-74ff56b8b175123',
    storeName: 'CJ제일제당',
    storeEmail: 'contact@cj.co.kr',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-08-12T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: 'd187314b-8944-4ffb-af0f-2c235af278c5',
    storeId: 'd187314b-8944-4ffb-af0f-2c235af278c5123',
    storeName: '포스코',
    storeEmail: 'contact@posco.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-07-27T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: 'cf2862b4-2fe9-48a9-922f-e71ab2f7cbf3',
    storeId: 'cf2862b4-2fe9-48a9-922f-e71ab2f7cbf3123',
    storeName: 'SK하이닉스',
    storeEmail: 'contact@sk.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2023-10-18T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: '1e95a244-7862-43db-9343-b219284239d5',
    storeId: '1e95a244-7862-43db-9343-b219284239d5123',
    storeName: '셀트리온',
    storeEmail: 'contact@celltrion.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-01-04T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: 'e1b299ad-04c2-4c80-bcc1-8441350e3bc1',
    storeId: 'e1b299ad-04c2-4c80-bcc1-8441350e3bc1123',
    storeName: '한화',
    storeEmail: 'contact@hanwha.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-02-22T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: '7ab0512b-065b-4424-9e8a-890e0ced9880',
    storeId: '7ab0512b-065b-4424-9e8a-890e0ced9880123',
    storeName: '롯데',
    storeEmail: 'contact@lotte.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-06-25T06:17:03Z',
    settlementDate: 25,
  },
]

export const contractRequestReceived = [
  {
    contractId: '71ca0179-bf2c-46fa-ab7d-61a7d370a958',
    storeId: '71ca0179-bf2c-46fa-ab7d-61a7d370a958123',
    storeName: '삼성전자',
    storeEmail: 'electronic@samsung.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-06-21T17:55:32Z',
    settlementDate: 25,
  },
  {
    contractId: '71ca0179-bf2c-1234-ab7d-61a7d370a958',
    storeId: '71ca0179-bf2c-1234-ab7d-61a7d370a958123',
    storeName: '멀티캠퍼스',
    storeEmail: 'multi@campus.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-07-15T17:55:32Z',
    settlementDate: 25,
  },
  {
    contractId: 'c9e32d88-3e4d-4381-9ce8-dc643c26010a',
    storeId: 'c9e32d88-3e4d-4381-9ce8-dc643c26010a123',
    storeName: 'LG전자',
    storeEmail: 'contact@lg.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-01-03T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: '54153db3-91f0-48b4-875f-5633895d9e4c',
    storeId: '54153db3-91f0-48b4-875f-5633895d9e4c123',
    storeName: '네이버',
    storeEmail: 'contact@naver.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-03-07T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: '5f59a356-e1f0-4899-a3a6-2521631b5640',
    storeId: '5f59a356-e1f0-4899-a3a6-2521631b5640123',
    storeName: '카카오',
    storeEmail: 'contact@kakao.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2023-11-29T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: 'c63eaaad-992d-4cb5-82fb-c114ac0d787f',
    storeId: 'c63eaaad-992d-4cb5-82fb-c114ac0d787f123',
    storeName: '현대자동차',
    storeEmail: 'contact@hyundai.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-08-12T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: 'ca4dfdcd-4184-4ada-a45f-74ff56b8b175',
    storeId: 'ca4dfdcd-4184-4ada-a45f-74ff56b8b175123',
    storeName: 'CJ제일제당',
    storeEmail: 'contact@cj.co.kr',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-08-12T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: 'd187314b-8944-4ffb-af0f-2c235af278c5',
    storeId: 'd187314b-8944-4ffb-af0f-2c235af278c5123',
    storeName: '포스코',
    storeEmail: 'contact@posco.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-07-27T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: 'cf2862b4-2fe9-48a9-922f-e71ab2f7cbf3',
    storeId: 'cf2862b4-2fe9-48a9-922f-e71ab2f7cbf3123',
    storeName: 'SK하이닉스',
    storeEmail: 'contact@sk.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2023-10-18T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: '1e95a244-7862-43db-9343-b219284239d5',
    storeId: '1e95a244-7862-43db-9343-b219284239d5123',
    storeName: '셀트리온',
    storeEmail: 'contact@celltrion.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-01-04T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: 'e1b299ad-04c2-4c80-bcc1-8441350e3bc1',
    storeId: 'e1b299ad-04c2-4c80-bcc1-8441350e3bc1123',
    storeName: '한화',
    storeEmail: 'contact@hanwha.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-02-22T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: '7ab0512b-065b-4424-9e8a-890e0ced9880',
    storeId: '7ab0512b-065b-4424-9e8a-890e0ced9880123',
    storeName: '롯데',
    storeEmail: 'contact@lotte.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-06-25T06:17:03Z',
    settlementDate: 25,
  },
]

export const contractRequestSend = [
  {
    contractId: '71ca0179-bf2c-46fa-ab7d-61a7d370a958',
    storeId: '71ca0179-bf2c-46fa-ab7d-61a7d370a958123',
    storeName: '삼성전자',
    storeEmail: 'electronic@samsung.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-06-21T17:55:32Z',
    settlementDate: 25,
  },
  {
    contractId: '71ca0179-bf2c-1234-ab7d-61a7d370a958',
    storeId: '71ca0179-bf2c-1234-ab7d-61a7d370a958123',
    storeName: '멀티캠퍼스',
    storeEmail: 'multi@campus.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-07-15T17:55:32Z',
    settlementDate: 25,
  },
  {
    contractId: 'c9e32d88-3e4d-4381-9ce8-dc643c26010a',
    storeId: 'c9e32d88-3e4d-4381-9ce8-dc643c26010a123',
    storeName: 'LG전자',
    storeEmail: 'contact@lg.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-01-03T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: '54153db3-91f0-48b4-875f-5633895d9e4c',
    storeId: '54153db3-91f0-48b4-875f-5633895d9e4c123',
    storeName: '네이버',
    storeEmail: 'contact@naver.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-03-07T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: '5f59a356-e1f0-4899-a3a6-2521631b5640',
    storeId: '5f59a356-e1f0-4899-a3a6-2521631b5640123',
    storeName: '카카오',
    storeEmail: 'contact@kakao.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2023-11-29T06:17:03Z',
    settlementDate: 25,
  },
  {
    contractId: 'c63eaaad-992d-4cb5-82fb-c114ac0d787f',
    storeId: 'c63eaaad-992d-4cb5-82fb-c114ac0d787f123',
    storeName: '현대자동차',
    storeEmail: 'contact@hyundai.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-08-12T06:17:03Z',
    settlementDate: 25,
  },
]

export const contractHistory = [
  {
    contractId: '71ca0179-bf2c-46fa-ab7d-61a7d370a958',
    storeId: '71ca0179-bf2c-46fa-ab7d-61a7d370a958123',
    storeName: '삼성전자',
    storeEmail: 'electronic@samsung.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-06-21T17:55:32Z',
    settlementDate: 25,
    status: 'complete',
  },
  {
    contractId: '71ca0179-bf2c-1234-ab7d-61a7d370a958',
    storeId: '71ca0179-bf2c-1234-ab7d-61a7d370a958123',
    storeName: '멀티캠퍼스',
    storeEmail: 'multi@campus.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-07-15T17:55:32Z',
    settlementDate: 25,
    status: 'complete',
  },
  {
    contractId: 'c9e32d88-3e4d-4381-9ce8-dc643c26010a',
    storeId: 'c9e32d88-3e4d-4381-9ce8-dc643c26010a123',
    storeName: 'LG전자',
    storeEmail: 'contact@lg.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-01-03T06:17:03Z',
    settlementDate: 25,
    status: 'in',
  },
  {
    contractId: '54153db3-91f0-48b4-875f-5633895d9e4c',
    storeId: '54153db3-91f0-48b4-875f-5633895d9e4c123',
    storeName: '네이버',
    storeEmail: 'contact@naver.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-03-07T06:17:03Z',
    settlementDate: 25,
    status: 'complete',
  },
  {
    contractId: '5f59a356-e1f0-4899-a3a6-2521631b5640',
    storeId: '5f59a356-e1f0-4899-a3a6-2521631b5640123',
    storeName: '카카오',
    storeEmail: 'contact@kakao.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2023-11-29T06:17:03Z',
    settlementDate: 25,
    status: 'in',
  },
  {
    contractId: 'c63eaaad-992d-4cb5-82fb-c114ac0d787f',
    storeId: 'c63eaaad-992d-4cb5-82fb-c114ac0d787f123',
    storeName: '현대자동차',
    storeEmail: 'contact@hyundai.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-08-12T06:17:03Z',
    settlementDate: 25,
    status: 'complete',
  },
  {
    contractId: 'ca4dfdcd-4184-4ada-a45f-74ff56b8b175',
    storeId: 'ca4dfdcd-4184-4ada-a45f-74ff56b8b175123',
    storeName: 'CJ제일제당',
    storeEmail: 'contact@cj.co.kr',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-08-12T06:17:03Z',
    settlementDate: 25,
    status: 'reject',
  },
  {
    contractId: 'd187314b-8944-4ffb-af0f-2c235af278c5',
    storeId: 'd187314b-8944-4ffb-af0f-2c235af278c5123',
    storeName: '포스코',
    storeEmail: 'contact@posco.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-07-27T06:17:03Z',
    settlementDate: 25,
    status: 'canceled',
  },
  {
    contractId: 'cf2862b4-2fe9-48a9-922f-e71ab2f7cbf3',
    storeId: 'cf2862b4-2fe9-48a9-922f-e71ab2f7cbf3123',
    storeName: 'SK하이닉스',
    storeEmail: 'contact@sk.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2023-10-18T06:17:03Z',
    settlementDate: 25,
    status: 'reject',
  },
  {
    contractId: '1e95a244-7862-43db-9343-b219284239d5',
    storeId: '1e95a244-7862-43db-9343-b219284239d5123',
    storeName: '셀트리온',
    storeEmail: 'contact@celltrion.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-01-04T06:17:03Z',
    settlementDate: 25,
    status: 'canceled',
  },
  {
    contractId: 'e1b299ad-04c2-4c80-bcc1-8441350e3bc1',
    storeId: 'e1b299ad-04c2-4c80-bcc1-8441350e3bc1123',
    storeName: '한화',
    storeEmail: 'contact@hanwha.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-02-22T06:17:03Z',
    settlementDate: 25,
    status: 'reject',
  },
  {
    contractId: '7ab0512b-065b-4424-9e8a-890e0ced9880',
    storeId: '7ab0512b-065b-4424-9e8a-890e0ced9880123',
    storeName: '롯데',
    storeEmail: 'contact@lotte.com',
    storePhone: '000-0000-0000',
    storeAddress: '부산광역시 강서구 신호동',
    companyId: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    contractDate: '2024-06-25T06:17:03Z',
    settlementDate: 25,
    status: 'reject',
  },
]
