import '@/styles/index.css'
import { PopupNav, TokenLoading, TopContent } from './components'
import { useState } from 'react'
import { useStoragestore } from '@/store/useStorageStore'

export default function App() {
  const { settings, info, updateData } = useStoragestore()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToken = async (token: string | null) => {
    setIsLoading(true)
    await getInfo(token)
    setIsLoading(false)
  }

  const getInfo = async (token: string | null) => {
    chrome.runtime.sendMessage({ type: 'USER_INFO', token: token }, response => {
      if (response.success) {
        const regex = /^([^\(]+)\(([^)]+)\)$/
        const info = response.data.name.match(regex)
        updateData('settings', prev => ({ ...prev, siteToken: token }))
        updateData('info', prev => ({ ...prev, studentId: response.data.id, username: info[1], userId: info[2] }))
      } else {
        window.alert('올바른 토큰이 아닙니다. 다시 확인해주세요.')
      }
    })
  }
  return (
    <div className="flex h-[350px] w-[350px] flex-col items-center justify-around">
      {isLoading ? (
        <TokenLoading />
      ) : (
        <TopContent noti={info.noti} token={settings.siteToken} updateFn={handleAddToken} />
      )}
      <PopupNav />
    </div>
  )
}
