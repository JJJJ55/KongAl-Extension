import '@/styles/index.css'
import { PopupNav, TokenLoading, TopContent } from './components'
import { useState } from 'react'
import { useStoragestore } from '@/store/useStorageStore'
import { UpdateIssue, UpdatePlay, UpdateSubject } from '@/utils/UpdateData'
import { toast } from 'react-toastify'
import { ToastComponent } from '@/content/components/ToastComponent'

export default function App() {
  const { system, contents, settings, info, updateData } = useStoragestore()
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
        chrome.runtime.sendMessage({ type: 'USER_SUBJECT', token }, subjectRes => {
          if (subjectRes.success) {
            const ids = UpdateSubject({ contents, itemData: subjectRes.data, updateFn: updateData })
            console.log('목록 : ', ids)
            chrome.runtime.sendMessage({ type: 'USER_ISSUE', token, ids }, issueRes => {
              if (issueRes.success) {
                UpdateIssue({
                  isBeep: system.notiBeep,
                  contents,
                  itemData: issueRes.data,
                  updateAt: settings.updateAt,
                  updateFn: updateData,
                })
                toast.success('정보가 업데이트 됐어요!', { icon: false })
              } else {
                toast.error('이슈 업데이트에 실패했어요.', { icon: false })
              }
            })
            for (const id of ids) {
              chrome.runtime.sendMessage({ type: 'SUBJECT_LIST', id }, response => {
                if (response.success) {
                  UpdatePlay({
                    itemData: response.data,
                    isBeep: system.notiBeep,
                    contents,
                    id,
                    updateAt: contents.courseList[id].updateAt,
                    updateFn: updateData,
                  })
                }
              })
            }
          } else {
            toast.error('과목 업데이트에 실패했어요.', { icon: false })
          }
        })
        updateData('settings', prev => ({ ...prev, siteToken: token }))
        updateData('info', prev => ({
          ...prev,
          fullName: response.data.name,
          studentId: response.data.id,
          username: info[1],
          userId: info[2],
        }))
      } else {
        toast.error('올바른 토큰이 아닙니다. 다시 확인해주세요.', { icon: false })
      }
    })
  }
  return (
    <div className="flex h-[350px] w-[350px] flex-col items-center justify-around">
      {isLoading ? (
        <TokenLoading />
      ) : (
        <>
          <TopContent noti={info.noti} token={settings.siteToken} updateFn={handleAddToken} />
          <ToastComponent />
        </>
      )}
      <PopupNav />
    </div>
  )
}
