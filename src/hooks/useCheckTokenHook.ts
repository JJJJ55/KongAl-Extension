import { useStoragestore } from '@/store/useStorageStore'
import { resolve } from 'path'
import { useEffect, useState } from 'react'

export const useIsToken = () => {
  const { info, settings, isInit, updateData } = useStoragestore()
  const [isSame, setIsSame] = useState(false)
  const userAllowedSites = [import.meta.env.VITE_TOKEN_URL]

  const checkAllowedSites = (url: string) => {
    return userAllowedSites.some(site => site === url)
  }

  useEffect(() => {
    if (!isInit) return

    const domain = window.location.hostname
    if (checkAllowedSites(domain)) {
      const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('div.fs-exclude img')
      const altTexts = Array.from(images).map(img => img.alt)
      console.log('test', altTexts)

      if (altTexts[0] === info.fullName) {
        const token = document.cookie.split(';').find(now => now.startsWith(' xn_api_token='))
        const xToken = token ? decodeURIComponent(token.split('=')[1]) : ''
        updateData('settings', prev => ({ ...prev, xToken: xToken }))
        console.log(document.cookie.split(';'))
        console.log('x토큰 값 : ', xToken)
        setIsSame(true)
      } else {
        console.log('사용자 정보 다름')
      }
    } else {
      console.log('LMS 아님')
    }
  }, [isInit, info.fullName])

  return { isSame }
}
