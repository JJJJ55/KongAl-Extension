import { useEffect, useRef } from 'react'
import { useStoragestore } from '@/store/useStorageStore'

export const useThemeCheck = () => {
  const mainRef = useRef<HTMLDivElement>(null)
  const { system } = useStoragestore()

  useEffect(() => {
    if (!mainRef.current) return

    const root = mainRef.current
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (system.theme === 'dark' || (system.theme === 'sys' && systemDark)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [system.theme])

  return { mainRef }
}
