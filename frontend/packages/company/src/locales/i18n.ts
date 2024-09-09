import i18next from 'i18next'
import { i18nOptions } from '@/locales/config'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import Languagedetector from 'i18next-browser-languagedetector'

i18next
  .use(Languagedetector)
  .use(initReactI18next)
  .use(resourcesToBackend((lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)))
  .init({ ...i18nOptions, detection: { caches: ['localStorage'] }, react: { useSuspense: false } })
