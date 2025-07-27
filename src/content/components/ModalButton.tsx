import { useRefreshCheck } from '@/hooks/useRecycleHook'
import { useStoragestore } from '@/store/useStorageStore'
import type { CourseItem, IssueItem, Noti } from '@/types'
import { UpdateIssue, UpdateSubject } from '@/utils/UpdateData'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
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
  const { settings, updateData } = useStoragestore()
  const { shouldRefresh } = useRefreshCheck()

  useEffect(() => {
    console.log('업데이트 체크')
    console.log(shouldRefresh)
    if (shouldRefresh) {
      chrome.runtime.sendMessage({ type: 'USER_SUBJECT', token: settings.siteToken }, subjectRes => {
        if (subjectRes.success) {
          const ids = UpdateSubject({ itemData: subjectRes.data, updateFn: updateData })
          chrome.runtime.sendMessage({ type: 'USER_ISSUE', token: settings.siteToken, ids }, issueRes => {
            if (issueRes.success) {
              UpdateIssue({ itemData: issueRes.data, updateFn: updateData })
              toast.success('정보가 업데이트 됐어요!', { icon: false })
            } else {
              toast.error('이슈 업데이트에 실패했어요.', { icon: false })
            }
          })
        } else {
          toast.error('과목 업데이트에 실패했어요.', { icon: false })
        }
      })
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
  }, [shouldRefresh])
  return (
    <div
      onClick={onClick}
      className="fixed z-500 h-[45px] w-[45px] cursor-pointer rounded-full bg-cover bg-center bg-no-repeat"
      style={{
        bottom: '25px',
        right: '25px',
        boxShadow: '-3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, .288)',
        backgroundImage: `url(${settings.image})`,
      }}
    >
      <AnimatePresence> {isOpen && <CloseOverlay />}</AnimatePresence>
    </div>
  )
}
