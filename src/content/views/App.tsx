import { CommonContainer } from '@/components'
import { Content } from '../components/Content'
import { useStoragestore } from '@/store/useStorageStore'
import { useEffect } from 'react'

function App() {
  const { settings, isInit, updateData } = useStoragestore()

  const userAllowedSites = [import.meta.env.VITE_TOKEN_URL]

  const checkAllowedSites = (url: string) => {
    return userAllowedSites.some(site => site === url)
  }

  useEffect(() => {
    if (!isInit) return

    const domain = window.location.hostname
    if (checkAllowedSites(domain)) {
      const token = document.cookie.split(';').find(now => now.startsWith(' xn_api_token='))
      const xToken = token ? decodeURIComponent(token.split('=')[1]) : ''
      updateData('settings', prev => ({ ...prev, xToken: xToken }))
    }
    // const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('div.fs-exclude img')
    // const altTexts = Array.from(images).map(img => img.alt)
    // console.log('test', altTexts)
  }, [isInit])
  return <CommonContainer>{settings.siteToken && settings.siteToken!.length === 64 && <Content />}</CommonContainer>
}

export default App
