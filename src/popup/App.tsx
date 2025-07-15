import '@/styles/index.css'
import { PopupNav, TokenLoading, TopContent } from './components'
import { BasicButton } from '@/components'
import { useState } from 'react'
import { useStoragestore } from '@/store/useStorageStore'
import { P } from 'node_modules/framer-motion/dist/types.d-D0HXPxHm'

export default function App() {
  const { settings, updateData } = useStoragestore()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToken = async (token: string | null) => {
    setIsLoading(true)
    await updateData('settings', prev => ({ ...prev, siteToken: token }))
    try {
      const res = await getInfo()
      console.log('aaa', res)
    } catch (error) {
      console.error('getInfo error', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getInfo = () => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'USER_INFO' }, response => {
        if (chrome.runtime.lastError) {
          console.error('messageError', chrome.runtime.lastError.message)
          reject(chrome.runtime.lastError.message)
        } else {
          console.log('bbb', response)
          resolve(response)
        }
      })
    })
  }
  return (
    <div className="flex h-[350px] w-[350px] flex-col items-center justify-around">
      {isLoading ? <TokenLoading /> : <TopContent token={settings.siteToken} updateFn={handleAddToken} />}
      <PopupNav />
    </div>
  )
}
