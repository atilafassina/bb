import { dictionary } from '@translations/dictionary'

type Dictionary = typeof dictionary

export type Locale = keyof Dictionary
export type TranslationsTerm = keyof typeof dictionary[Locale]

export const useI18n = (locale: Locale, useFallback = false) => ({
  translate: (key: TranslationsTerm) => {
    const hasKey = Boolean(dictionary[locale][key])

    if (!hasKey && !useFallback) {
      throw new Error(`missing translation ${key} on ${locale}`)
    }

    return hasKey ? dictionary[locale][key] : key
  },
})
