'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Lang = 'en' | 'es'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextValue>({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-lang') as Lang | null
    if (stored === 'en' || stored === 'es') {
      setLangState(stored)
    } else {
      setLangState(navigator.language.startsWith('es') ? 'es' : 'en')
    }
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('portfolio-lang', l)
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLanguage() {
  return useContext(LangContext)
}

/** Returns a picker: t('Hello', 'Hola') → picks based on active language */
export function useLang() {
  const { lang } = useLanguage()
  return (en: string, es: string) => (lang === 'es' ? es : en)
}
