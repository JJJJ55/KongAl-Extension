import { LineText } from '@/components'
import { PlayCard } from './PlayCard'
import { useStoragestore } from '@/store/useStorageStore'
import { NotFound } from '../NotFound'
import type { PlayItem } from '@/types'

export const DetailPlay = ({ courseId }: { courseId: string | '' }) => {
  const { contents, updateData } = useStoragestore()

  const handleGetPlay = (id: string) => {
    chrome.runtime.sendMessage({ type: 'SUBJECT_LIST', id }, response => {
      if (response.success) {
        const newPlayList: Record<string, Record<string, PlayItem>> = {}
        const currentDetail = contents.courseDetail[id] || {
          PlayList: {},
          BoardList: {},
          ReportList: {},
        }
        for (const data of response.data) {
          const { position } = data
          for (const d of data.module_items) {
            const { module_item_id, title, content_type, completed } = d
            if (!newPlayList[position]) newPlayList[position] = {}
            newPlayList[position][module_item_id] = {
              title,
              isComplete: completed,
              isAttendance: null,
              dueAt: null,
            }
            if (content_type === 'attendance_item') {
              const { use_attendance, omit_progress } = d.content_data
              if (use_attendance === true && omit_progress === false) {
                newPlayList[position][module_item_id].isAttendance = d.attendance_status
              }
            }
            newPlayList[position][module_item_id].dueAt = d.content_data.due_at
          }
        }
        updateData('contents', prev => {
          const newCourseDetail = { ...prev.courseDetail }
          newCourseDetail[id] = {
            ...currentDetail,
            PlayList: {
              ...newPlayList,
            },
          }

          return { ...prev, courseDetail: newCourseDetail }
        })
      } else {
        alert('실패')
      }
    })
  }

  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      <button onClick={() => handleGetPlay(courseId)}>임시</button>
      {/* <LineText className="w-[60px] text-[12px] font-bold">1주차</LineText> */}
      {Object.keys(contents.courseDetail[courseId].PlayList).length ? (
        Object.entries(contents.courseDetail[courseId].PlayList).map(([week, p]) => <PlayCard key={week} data={p} />)
      ) : (
        <NotFound />
      )}
    </div>
  )
}
