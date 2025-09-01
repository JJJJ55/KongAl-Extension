import { CommonContainer } from '@/components'
import { Content } from '../components/Content'
import { useStoragestore } from '@/store/useStorageStore'
import { useEffect } from 'react'

function App() {
  const { info, settings, isInit, updateData } = useStoragestore()

  const userAllowedSites = [import.meta.env.VITE_TOKEN_URL]

  const checkAllowedSites = (url: string) => {
    return userAllowedSites.some(site => site === url)
  }

  useEffect(() => {
    if (!isInit) return
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('div.fs-exclude img')
    const altTexts = Array.from(images).map(img => img.alt)
    console.log('test', altTexts)

    const domain = window.location.hostname
    if (checkAllowedSites(domain) && altTexts[0] === info.fullName) {
      const token = document.cookie.split(';').find(now => now.startsWith(' xn_api_token='))
      const xToken = token ? decodeURIComponent(token.split('=')[1]) : ''
      updateData('settings', prev => ({ ...prev, xToken: xToken }))
      console.log(document.cookie.split(';'))
      console.log('x토큰 값 : ', xToken)
    }
  }, [isInit, info.fullName])
  return <CommonContainer>{settings.siteToken && settings.siteToken!.length === 64 && <Content />}</CommonContainer>
}

export default App
