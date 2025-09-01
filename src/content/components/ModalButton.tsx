import { useRefreshCheck } from '@/hooks/useRecycleHook'
import { useStoragestore } from '@/store/useStorageStore'
import { CheckPlayUpdate } from '@/utils/CheckPlayUpdate'
import { newUpdateList, UpdateIssue, UpdatePlay, UpdateSubject } from '@/utils/UpdateData'
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
    className="absolute inset-0 bg-opacity-10 rounded-2xl bg-black/20 backdrop-blur-xs"
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
        const res = await sendMessageAsync({ type: 'SUBJECT_LIST', id })
        if (res.success) {
          UpdatePlay({
            itemData: res.data, // 이전 코드에서 response.data가 아닌 res.data
            isBeep: system.notiBeep,
            contents,
            id,
            updateAt: contents.courseList[id]?.updateAt,
            updateFn: updateData,
          })
        }
      }
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

      // chrome.runtime.sendMessage({ type: 'USER_SUBJECT', token: settings.siteToken }, subjectRes => {
      //   if (subjectRes.success) {
      //     const ids = UpdateSubject({ contents, itemData: subjectRes.data, updateFn: updateData })
      //     chrome.runtime.sendMessage({ type: 'USER_ISSUE', token: settings.siteToken, ids }, issueRes => {
      //       if (issueRes.success) {
      //         UpdateIssue({
      //           isBeep: system.notiBeep,
      //           contents,
      //           itemData: issueRes.data,
      //           updateAt: settings.updateAt,
      //           updateFn: updateData,
      //         })
      //         toast.success('정보가 업데이트 됐어요!', { icon: false })
      //       } else {
      //         toast.error('이슈 업데이트에 실패했어요.', { icon: false })
      //       }
      //     })
      //     for (const id of ids) {
      //       if (
      //         contents.courseList[id] === undefined ||
      //         contents.courseList[id].updateAt === null ||
      //         CheckPlayUpdate(contents.courseList[id].updateAt)
      //       ) {
      //         chrome.runtime.sendMessage({ type: 'SUBJECT_LIST', id }, response => {
      //           if (response.success) {
      //             UpdatePlay({
      //               itemData: response.data,
      //               isBeep: system.notiBeep,
      //               contents,
      //               id,
      //               updateAt: contents.courseList[id]?.updateAt,
      //               updateFn: updateData,
      //             })
      //           }
      //         })
      //       }
      //     }
      //     // newUpdateList({ ids, updateFn: updateData })
      //   } else {
      //     toast.error('과목 업데이트에 실패했어요.', { icon: false })
      //   }
      // })

      // console.log('업데이트 시작')
      // chrome.runtime.sendMessage({ type: 'USER_SUBJECT', token: settings.siteToken }, subjectRes => {
      //   if (subjectRes.success) {
      //     console.log(subjectRes.data)
      //     const newCourseList: Record<string, CourseItem> = {}
      //     for (const data of subjectRes.data) {
      //       const { id, name, teachers } = data
      //       newCourseList[id] = {
      //         title: name,
      //         teacher:
      //           teachers.length > 1 ? `${teachers[0].display_name} 등 ${teachers.length}인` : teachers[0].display_name,
      //         isReport: 0,
      //         isPlay: 0,
      //         isBoard: 0,
      //       }
      //     }
      //     updateData('contents', prev => ({ ...prev, courseList: { ...newCourseList } }))
      //     const ids = Object.keys(newCourseList)
      //     chrome.runtime.sendMessage({ type: 'USER_ISSUE', token: settings.siteToken, ids }, issueRes => {
      //       if (issueRes.success) {
      //         console.log(issueRes.data)
      //         const newBoardList: Record<string, Record<string, IssueItem>> = {}
      //         const newReportList: Record<string, Record<string, IssueItem>> = {}
      //         const newNoti: Record<string, Noti> = {}
      //         for (const data of issueRes.data) {
      //           const { course_id, plannable, plannable_id, html_url, plannable_type, plannable_date, submissions } =
      //             data
      //           if (!newNoti[course_id]) newNoti[course_id] = { isBoard: 0, isReport: 0 }
      //           if (plannable_type === 'announcement') {
      //             if (!newBoardList[course_id]) newBoardList[course_id] = {}
      //             newBoardList[course_id][plannable_id] = {
      //               title: plannable.title,
      //               createAt: plannable.created_at,
      //               html_url,
      //               isOk: plannable.read_state === 'read' ? true : false,
      //             }
      //             if (plannable.read_state !== 'read') {
      //               newNoti[course_id].isBoard = newNoti[course_id].isBoard! + 1
      //             }
      //           } else {
      //             if (!newReportList[course_id]) newReportList[course_id] = {}
      //             newReportList[course_id][plannable_id] = {
      //               title: plannable.title,
      //               createAt: plannable.created_at,
      //               dueAt: plannable_date,
      //               html_url,
      //               isOk: submissions.submitted ?? false,
      //             }
      //             if (!newReportList[course_id][plannable_id].isOk) {
      //               newNoti[course_id].isReport = newNoti[course_id].isReport! + 1
      //             }
      //           }
      //         }
      //         updateData('contents', prev => {
      //           const newCourseDetail = { ...prev.courseDetail }
      //           for (const courseId in newBoardList) {
      //             const currentDetail = newCourseDetail[courseId] || {
      //               PlayList: {},
      //               BoardList: {},
      //               ReportList: {},
      //             }
      //             newCourseDetail[courseId] = {
      //               ...currentDetail,
      //               BoardList: {
      //                 ...currentDetail.BoardList,
      //                 ...newBoardList[courseId],
      //               },
      //             }
      //           }
      //           for (const courseId in newReportList) {
      //             const currentDetail = newCourseDetail[courseId] || {
      //               PlayList: {},
      //               BoardList: {},
      //               ReportList: {},
      //             }
      //             newCourseDetail[courseId] = {
      //               ...currentDetail,
      //               ReportList: {
      //                 ...currentDetail.ReportList,
      //                 ...newReportList[courseId],
      //               },
      //             }
      //           }
      //           const mergedCourseList = { ...prev.courseList }
      //           for (const courseId in newNoti) {
      //             if (!mergedCourseList[courseId]) continue
      //             mergedCourseList[courseId] = {
      //               ...mergedCourseList[courseId],
      //               ...newNoti[courseId],
      //             }
      //           }
      //           return {
      //             ...prev,
      //             courseDetail: newCourseDetail,
      //             courseList: mergedCourseList,
      //           }
      //         })
      //         updateData('settings', prev => ({ ...prev, updateAt: new Date().toISOString() }))
      //       } else {
      //         console.log('이슈 업데이트 실패')
      //       }
      //     })
      //   } else {
      //     console.log('과목 업데이트 실패')
      //   }
      // })
    }
  }, [shouldRefresh, info.noti])
  return (
    <div
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
