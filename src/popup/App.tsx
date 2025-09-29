import '@/styles/index.css'
import { lazy, Suspense, useState } from 'react'
import { toast } from 'react-toastify'
import { PopupNav, TokenLoading, TopContent } from './components'
import { useThemeCheck } from '@/hooks/useThemeHook'
import { useStoragestore } from '@/store/useStorageStore'
import { getLmsWebInfo, sendMessageAsync } from '@/utils/RequestApi'
import { UpdateIssue, UpdatePlay, UpdateSubject } from '@/utils/UpdateData'

export default function App() {
  const { system, contents, settings, info, updateData } = useStoragestore()
  const [isLoading, setIsLoading] = useState(false)
  const { mainRef } = useThemeCheck()

  function escapeHtml(str: string | null) {
    return str !== null
      ? str
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#39;')
      : null
  }

  const handleAddToken = async (token: string | null) => {
    token = escapeHtml(token)
    setIsLoading(true)
    await getInfo(token)
    setIsLoading(false)
  }

  const getInfo = async (token: string | null) => {
    const response = await sendMessageAsync({ type: 'USER_INFO', token })
    if (!response.success) {
      toast.error('올바른 토큰이 아닙니다. 다시 확인해주세요.', { icon: false })
      return
    }

    const regex = new RegExp(/^([^(]+)\(([^)]+)\)$/)
    const info = response.data.name.match(regex)

    const lmsRes = await getLmsWebInfo(response.data.name)
    if (!lmsRes.success || lmsRes.xToken === null) {
      toast.error('LMS 로그인 정보와 토큰 사용자가 달라요.', { icon: false })
      return
    }

    const subjectRes = await sendMessageAsync({ type: 'USER_SUBJECT', token })
    if (!subjectRes.success) {
      toast.error('과목 업데이트에 실패했어요.', { icon: false })
      return
    }

    const ids = UpdateSubject({ contents, itemData: subjectRes.data, updateFn: updateData })
    if (ids.length !== 0) {
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

      for (const id of ids) {
        const res = await sendMessageAsync({ type: 'SUBJECT_LIST', id, token: lmsRes.xToken })
        const delay = Math.floor(Math.random() * (2000 - 500 + 1)) + 500
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
    } else {
      toast.success('정보가 업데이트 됐어요!', { icon: false })
    }

    await updateData('settings', prev => ({
      ...prev,
      siteToken: token,
      updateAt: new Date().toISOString(),
      xToken: lmsRes.xToken,
    }))
    await updateData('info', prev => ({
      ...prev,
      fullName: response.data.name,
      studentId: response.data.id,
      username: info[1],
      userId: info[2],
    }))
  }

  const ToastComponent = lazy(() => import('@/components/ToastComponent'))
  return (
    <div ref={mainRef} className="dark:bg-dark flex h-[350px] w-[350px] flex-col items-center justify-around">
      {isLoading ? (
        <TokenLoading />
      ) : (
        <>
          <TopContent noti={info.noti} token={settings.siteToken} updateFn={handleAddToken} />
          <Suspense fallback={null}>
            <ToastComponent />
          </Suspense>
        </>
      )}
      <PopupNav />
    </div>
  )
}
