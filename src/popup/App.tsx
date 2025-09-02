import '@/styles/index.css'
import { PopupNav, TokenLoading, TopContent } from './components'
import { useEffect, useState } from 'react'
import { useStoragestore } from '@/store/useStorageStore'
import { UpdateIssue, UpdatePlay, UpdateSubject } from '@/utils/UpdateData'
import { toast } from 'react-toastify'
import { ToastComponent } from '@/content/components/ToastComponent'

export default function App() {
  const { system, contents, settings, info, updateData, resetStore } = useStoragestore()
  const [isLoading, setIsLoading] = useState(false)
  const [courseIds, setCourseIds] = useState<string[]>([])

  const handleAddToken = async (token: string | null) => {
    await getInfo(token)
  }

  type SendMessageProps = {
    success: boolean
    data: any
  }

  const sendMessageAsync = (message: any): Promise<SendMessageProps> => {
    return new Promise<SendMessageProps>(resolve => {
      chrome.runtime.sendMessage(message, resolve)
    })
  }

  const isCheckLmsUser = (): Promise<{ lmsUser: string }> => {
    return new Promise<{ lmsUser: string }>(resolve => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_NAME' }, resolve)
        }
      })
    })
  }

  const getInfo = async (token: string | null) => {
    const response = await sendMessageAsync({ type: 'USER_INFO', token })
    if (!response.success) {
      toast.error('올바른 토큰이 아닙니다. 다시 확인해주세요.', { icon: false })
      return
    }

    const regex = /^([^\(]+)\(([^)]+)\)$/
    const info = response.data.name.match(regex)

    await updateData('settings', prev => ({ ...prev, siteToken: token, updateAt: new Date().toISOString() }))
    await updateData('info', prev => ({
      ...prev,
      fullName: response.data.name,
      studentId: response.data.id,
      username: info[1],
      userId: info[2],
    }))

    const lmsRes = await isCheckLmsUser()
    if (lmsRes.lmsUser !== response.data.name) {
      await resetStore()
      toast.error('LMS 사이트의 유저 정보와 달라요.', { icon: false })
      return
    }

    const subjectRes = await sendMessageAsync({ type: 'USER_SUBJECT', token })
    if (!subjectRes.success) {
      toast.error('과목 업데이트에 실패했어요.', { icon: false })
      return
    }

    const ids = UpdateSubject({ contents, itemData: subjectRes.data, updateFn: updateData })
    setCourseIds(ids)
    console.log('목록 : ', ids)

    const issueRes = await sendMessageAsync({ type: 'USER_ISSUE', token, ids })
    if (issueRes.success) {
      UpdateIssue({
        isBeep: system.notiBeep,
        contents,
        ids,
        itemData: issueRes.data,
        updateAt: settings.updateAt,
        updateFn: updateData,
      })
      toast.success('정보가 업데이트 됐어요!', { icon: false })
    } else {
      toast.error('이슈 업데이트에 실패했어요.', { icon: false })
    }

    // 순차적으로 UpdatePlay 실행

    // for (const id of ids) {
    //   const res = await sendMessageAsync({ type: 'SUBJECT_LIST', id, token: import.meta.env.VITE_TEST_TOKEN })
    //   if (res.success) {
    //     UpdatePlay({
    //       itemData: res.data, // 이전 코드에서 response.data가 아닌 res.data
    //       isBeep: system.notiBeep,
    //       contents,
    //       id,
    //       updateAt: contents.courseList[id]?.updateAt,
    //       updateFn: updateData,
    //     })
    //   }
    // }

    // // info, settings 업데이트
    // await updateData('settings', prev => ({ ...prev, siteToken: token, updateAt: new Date().toISOString() }))
    // await updateData('info', prev => ({
    //   ...prev,
    //   fullName: response.data.name,
    //   studentId: response.data.id,
    //   username: info[1],
    //   userId: info[2],
    // }))
    // 아래는 옛날 코드

    // chrome.runtime.sendMessage({ type: 'USER_INFO', token: token }, response => {
    //   if (response.success) {
    //     const regex = /^([^\(]+)\(([^)]+)\)$/
    //     const info = response.data.name.match(regex)
    //     chrome.runtime.sendMessage({ type: 'USER_SUBJECT', token }, subjectRes => {
    //       if (subjectRes.success) {
    //         const ids = UpdateSubject({ contents, itemData: subjectRes.data, updateFn: updateData })
    //         console.log('목록 : ', ids)
    //         chrome.runtime.sendMessage({ type: 'USER_ISSUE', token, ids }, issueRes => {
    //           if (issueRes.success) {
    //             UpdateIssue({
    //               isBeep: system.notiBeep,
    //               contents,
    //               itemData: issueRes.data,
    //               updateAt: settings.updateAt,
    //               updateFn: updateData,
    //             })
    //             toast.success('정보가 업데이트 됐어요!', { icon: false })
    //           } else {
    //             toast.error('이슈 업데이트에 실패했어요.', { icon: false })
    //           }
    //         })
    //         for (const id of ids) {
    //           console.log('실행', id)
    //           chrome.runtime.sendMessage({ type: 'SUBJECT_LIST', id }, response => {
    //             if (response.success) {
    //               UpdatePlay({
    //                 itemData: response.data,
    //                 isBeep: system.notiBeep,
    //                 contents,
    //                 id,
    //                 updateAt: contents.courseList[id]?.updateAt,
    //                 updateFn: updateData,
    //               })
    //             }
    //           })
    //         }
    //       } else {
    //         toast.error('과목 업데이트에 실패했어요.', { icon: false })
    //       }
    //     })
    //     updateData('settings', prev => ({ ...prev, siteToken: token }))
    //     updateData('info', prev => ({
    //       ...prev,
    //       fullName: response.data.name,
    //       studentId: response.data.id,
    //       username: info[1],
    //       userId: info[2],
    //     }))
    //   } else {
    //     toast.error('올바른 토큰이 아닙니다. 다시 확인해주세요.', { icon: false })
    //   }
    // })
  }

  useEffect(() => {
    console.log('아이씨', settings.xToken)
    if (settings.xToken === null || courseIds.length === 0) return
    const getPlay = async () => {
      setIsLoading(true)
      for (const id of courseIds) {
        const delay = Math.floor(Math.random() * (2000 - 500 + 1)) + 500
        console.log('지연시간', delay)
        const res = await sendMessageAsync({ type: 'SUBJECT_LIST', id, token: settings.xToken })
        if (res.success) {
          UpdatePlay({
            itemData: res.data, // 이전 코드에서 response.data가 아닌 res.data
            isBeep: system.notiBeep,
            contents,
            id,
            updateAt: contents.courseList[id]?.updateAt,
            updateFn: updateData,
          })
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
      setIsLoading(false)
    }
    getPlay()
  }, [settings.xToken, courseIds])

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
