import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { ModalBtnDrag } from './ModalBtnDrag'
import { useDragBtn } from '@/hooks/useDragBtnHook'
import { useFullScreen } from '@/hooks/useFullScreenHook'
import { useRefreshCheck } from '@/hooks/useRecycleHook'
import { useStoragestore } from '@/store/useStorageStore'
import { CheckPlayUpdate } from '@/utils/CheckPlayUpdate'

import { sendMessageAsync } from '@/utils/RequestApi'
import { UpdateIssue, UpdatePlay, UpdateSubject } from '@/utils/UpdateData'

type ModalButtonProps = {
  isOpen: boolean
  onClick: () => void
  onLoading: (isFlag: boolean) => void
}

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

export const ModalButton = ({ isOpen, onClick, onLoading }: ModalButtonProps) => {
  const { system, contents, settings, info, updateData } = useStoragestore()
  const { handleOnDrag, isDragging, setIsDragging, activeCorner } = useDragBtn()
  const { shouldRefresh } = useRefreshCheck()
  const { isFull } = useFullScreen()

  const handleModalOpen = () => {
    if (info.noti) toast.success('학습, 공지, 과제 알림이 있어요!', { icon: false })
    if (!isOpen && info.noti) {
      chrome.runtime.sendMessage({ type: 'CLEAN_BADGE' })
      updateData('info', prev => ({ ...prev, noti: false }))
    }
    onClick()
  }

  const UpdateSubjectData = useCallback(async () => {
    let isIssue = false
    let isPlay = false
    onLoading(true)
    const subjectRes = await sendMessageAsync({ type: 'USER_SUBJECT', siteToken: settings.siteToken })
    if (!subjectRes.success) {
      toast.error('과목 업데이트에 실패했어요.', { icon: false })
      onLoading(false)
      return
    }

    const ids = UpdateSubject({ contents, itemData: subjectRes.data, updateFn: updateData })
    if (ids.length === 0) {
      toast.success('업데이트 완료!', { icon: false })
      updateData('settings', prev => ({ ...prev, updateAt: new Date().toISOString() }))
      onLoading(false)
      return
    }
    const issueRes = await sendMessageAsync({ type: 'USER_ISSUE', siteToken: settings.siteToken, ids })
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
      isIssue = true
    }

    for (const id of ids) {
      if (
        contents.courseList[id] === undefined ||
        contents.courseList[id].updateAt === null ||
        CheckPlayUpdate(contents.courseList[id].updateAt)
      ) {
        const res = await sendMessageAsync({ type: 'SUBJECT_LIST', id, xToken: settings.xToken })
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
        } else {
          isPlay = true
        }
      }
    }
    onLoading(false)
    if (isIssue) {
      toast.success('이슈가 업데이트 됐어요!', { icon: false })
    } else {
      toast.error('이슈 업데이트에 실패했어요.', { icon: false })
    }
    if (isPlay) toast.error('학습 업데이트에 일부 문제가 있어요', { icon: false })
  }, [])

  const didRun = useRef(false)
  useEffect(() => {
    if (shouldRefresh && !didRun.current) {
      didRun.current = true
      UpdateSubjectData()
    }
  }, [shouldRefresh, info.noti])

  return (
    <>
      {isDragging && (
        <div className="fixed top-0 left-0 z-[2147483647] flex h-[100vh] w-[100vw] items-center justify-center bg-black/50">
          <div className="font-pretendard text-[20px] font-bold text-white">원하는 모서리에 가져다 놓아주세요!</div>
          <ModalBtnDrag activeCorner={activeCorner} positionName="tl" img={settings.image} />
          <ModalBtnDrag activeCorner={activeCorner} positionName="tr" img={settings.image} />
          <ModalBtnDrag activeCorner={activeCorner} positionName="bl" img={settings.image} />
          <ModalBtnDrag activeCorner={activeCorner} positionName="br" img={settings.image} />
        </div>
      )}
      <motion.div
        data-testid="modal-button"
        onClick={() => {
          if (!isDragging) handleModalOpen()
        }}
        onDragStart={() => setIsDragging(true)}
        className={clsx(
          'fixed z-[2147483647] h-[45px] w-[45px] cursor-pointer rounded-full bg-cover bg-center bg-no-repeat',
          isFull && 'hidden',
        )}
        drag
        dragSnapToOrigin
        dragMomentum={false}
        dragElastic={0}
        onDrag={(_, info) => handleOnDrag(info.offset.x, info.offset.y)}
        onDragEnd={() => {
          setIsDragging(false)
          updateData('system', prev => ({ ...prev, pos: activeCorner }))
        }}
        style={{
          ...(system.pos === 'tl' && { top: '25px', left: '25px' }),
          ...(system.pos === 'tr' && { top: '25px', right: '25px' }),
          ...(system.pos === 'bl' && { bottom: '25px', left: '25px' }),
          ...(system.pos === 'br' && { bottom: '25px', right: '25px' }),
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
      </motion.div>
    </>
  )
}
