type LocaleLang = 'ko' | 'en'

interface Lang {
  value: LocaleLang
  label: string
  countryCode: string
  numberFormat: {
    code: string
    currency: string
  }
}

export type { Lang, LocaleLang }
