import { useRefreshCheck } from '@/hooks/useRecycleHook'
import { useStoragestore } from '@/store/useStorageStore'
import { CheckPlayUpdate } from '@/utils/CheckPlayUpdate'
import { UpdateIssue, UpdatePlay, UpdateSubject } from '@/utils/UpdateData'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

const CloseOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="bg-opacity-10 absolute inset-0 rounded-2xl bg-black/20 backdrop-blur-xs"
  >
    <div className="absolute inset-0 flex items-center justify-center text-white">
      <X size={24} />
    </div>
  </motion.div>
)

export const ModalButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  const { system, contents, settings, info, updateData } = useStoragestore()
  const { shouldRefresh } = useRefreshCheck()

  type SendMessageProps = {
    success: boolean
    data: any
  }

  const sendMessageAsync = (message: any): Promise<SendMessageProps> => {
    return new Promise<SendMessageProps>(resolve => {
      chrome.runtime.sendMessage(message, resolve)
    })
  }

  const handleModalOpen = () => {
    if (info.noti) toast.success('학습, 공지, 과제 알림이 있어요!', { icon: false })
    if (!isOpen && info.noti) {
      chrome.runtime.sendMessage({ type: 'CLEAN_BADGE' })
      updateData('info', prev => ({ ...prev, noti: false }))
    }
    onClick()
  }

  const UpdateSubjectData = async () => {
    const subjectRes = await sendMessageAsync({ type: 'USER_SUBJECT', token: settings.siteToken })
    if (!subjectRes.success) {
      toast.error('과목 업데이트에 실패했어요.', { icon: false })
      return
    }

    const ids = UpdateSubject({ contents, itemData: subjectRes.data, updateFn: updateData })
    console.log('목록 : ', ids)

    const issueRes = await sendMessageAsync({ type: 'USER_ISSUE', token: settings.siteToken, ids })
    if (issueRes.success) {
      UpdateIssue({
        isBeep: system.notiBeep,
        contents,
        ids,
        itemData: issueRes.data,
        updateAt: settings.updateAt,
        updateFn: updateData,
      })
      updateData('settings', prev => ({ ...prev, updateAt: new Date().toISOString() }))
      // 바뀐 날짜 업데이트
      toast.success('정보가 업데이트 됐어요!', { icon: false })
    } else {
      toast.error('이슈 업데이트에 실패했어요.', { icon: false })
    }

    // 순차적으로 UpdatePlay 실행
    for (const id of ids) {
      if (
        contents.courseList[id] === undefined ||
        contents.courseList[id].updateAt === null ||
        CheckPlayUpdate(contents.courseList[id].updateAt)
      ) {
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
      // const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500
      // console.log('지연시간', delay)
      // const res = await sendMessageAsync({ type: 'SUBJECT_LIST', id, token: settings.xToken })
      // if (res.success) {
      //   UpdatePlay({
      //     itemData: res.data, // 이전 코드에서 response.data가 아닌 res.data
      //     isBeep: system.notiBeep,
      //     contents,
      //     id,
      //     updateAt: contents.courseList[id]?.updateAt,
      //     updateFn: updateData,
      //   })
      //   await new Promise(resolve => setTimeout(resolve, delay))
      // }
    }
  }

  const didRun = useRef(false)
  useEffect(() => {
    console.log('업데이트 체크')
    console.log(shouldRefresh)

    if (shouldRefresh && !didRun.current) {
      didRun.current = true
      console.log('정보가져온당')

      UpdateSubjectData()
    }
  }, [shouldRefresh, info.noti])
  return (
    <div
      data-testid="modal-button"
      onClick={handleModalOpen}
      className="fixed z-500 h-[45px] w-[45px] cursor-pointer rounded-full bg-cover bg-center bg-no-repeat"
      style={{
        bottom: '25px',
        right: '25px',
        boxShadow: '-3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, .288)',
        backgroundImage: `url(${settings.image})`,
      }}
    >
      <AnimatePresence> {isOpen && <CloseOverlay />}</AnimatePresence>
      {info.noti && (
        <div
          className="bg-negative absolute flex h-[20px] w-[20px] items-center justify-center rounded-full font-bold text-white"
          style={{ bottom: '32px', left: '32px' }}
        >
          !
        </div>
      )}
    </div>
  )
}
