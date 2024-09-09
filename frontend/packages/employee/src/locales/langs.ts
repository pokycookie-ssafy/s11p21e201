import type { Lang } from './types'

export const langs: Lang[] = [
  {
    value: 'ko',
    label: '한국어',
    countryCode: 'KR',
    numberFormat: { code: 'ko-KR', currency: 'KRW' },
  },
  {
    value: 'en',
    label: 'English',
    countryCode: 'GB',
    numberFormat: { code: 'en-US', currency: 'USD' },
  },
]
