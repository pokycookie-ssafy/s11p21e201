import type { InitOptions } from 'i18next'
import type { LocaleLang } from '@/locales/types'

import { localStorageGetItem } from '@e201/utils'

export const fallbackLng: LocaleLang = 'ko'
export const supportedLngs: LocaleLang[] = ['en', 'ko']
export const defaultNS = 'common'

const lng = localStorageGetItem('i18nextLng', fallbackLng)

export const i18nOptions: InitOptions = {
  lng,
  fallbackLng,
  ns: defaultNS,
  defaultNS,
  supportedLngs,
}

export const changeLangMessages: Record<LocaleLang, { success: string; error: string }> = {
  en: {
    success: 'Language has been changed',
    error: 'Error changing language',
  },
  ko: {
    success: '언어가 변경되었습니다',
    error: '언어 변경에 오류가 발생했습니다',
  },
}
