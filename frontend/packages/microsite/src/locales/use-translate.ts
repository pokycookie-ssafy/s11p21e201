import type { LocaleLang } from '@/locales/types'

import { toast } from 'sonner'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { changeLangMessages } from '@/locales/config'

import { langs } from './langs'

export function useTranslate(ns?: string) {
  const { t, i18n } = useTranslation(ns)

  const fallback = langs[0]
  const currentLang = langs.find((lang) => lang.value === i18n.resolvedLanguage) ?? fallback

  const changeLang = useCallback(
    async (lang: LocaleLang) => {
      try {
        const langChangePromise = i18n.changeLanguage(lang)
        const currentMessage = changeLangMessages[lang]

        toast.promise(langChangePromise, {
          success: currentMessage.success,
          error: currentMessage.error,
        })
      } catch (err) {
        console.error(err)
      }
    },
    [i18n]
  )

  return { t, i18n, changeLang, currentLang }
}
