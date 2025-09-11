import { useEffect } from 'react'
import { Content } from '../components/Content'
import { CommonContainer } from '@/components'
import { useStoragestore } from '@/store/useStorageStore'

function App() {
  const { info, settings, isInit, updateData } = useStoragestore()

  const userAllowedSites = [import.meta.env.VITE_TOKEN_URL]

  const checkAllowedSites = (url: string) => {
    return userAllowedSites.some(site => site === url)
  }

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'GET_LMS') {
      const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('div.fs-exclude img')
      const altTexts = Array.from(images).map(img => img.alt)

      const domain = window.location.hostname
      if (checkAllowedSites(domain) && altTexts[0] === msg.userName) {
        const token = document.cookie.split(';').find(now => now.startsWith(' xn_api_token='))
        const xToken = token ? decodeURIComponent(token.split('=')[1]) : null
        sendResponse({ success: true, lmsUser: altTexts[0], xToken })
      } else {
        sendResponse({ success: false, lmsUser: altTexts[0], xToken: null })
      }
    }
  })

  useEffect(() => {
    if (!isInit) return
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('div.fs-exclude img')
    const altTexts = Array.from(images).map(img => img.alt)

    const domain = window.location.hostname
    if (checkAllowedSites(domain) && altTexts[0] === info.fullName) {
      const token = document.cookie.split(';').find(now => now.startsWith(' xn_api_token='))
      const xToken = token ? decodeURIComponent(token.split('=')[1]) : ''
      updateData('settings', prev => ({ ...prev, xToken: xToken }))
    }
  }, [isInit, info.fullName])

  return <CommonContainer>{settings.siteToken && settings.siteToken!.length === 64 && <Content />}</CommonContainer>
}

export default App
