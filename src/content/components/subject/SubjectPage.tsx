import { useState } from 'react'
import { LoadingSkeleton } from './LoadingSkeleton'
import { NotFound } from './NotFound'
import { SubjectCard } from './SubjectCard'
import { TopNavBar } from './TopNavbar'
import { useStoragestore } from '@/store/useStorageStore'

export const SubjectPage = ({ onClick }: { onClick: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { settings, contents, updateData } = useStoragestore()

  const handleGetSubject = () => {
    setIsLoading(true)
    chrome.runtime.sendMessage({ type: 'USER_SUBJECT', token: settings.siteToken }, response => {
      if (response.success) {
        const res = response.data.map(data => {
          const { id, name, teachers } = data
          if (teachers.length > 1) {
            return { courseId: id, title: name, teacher: `${teachers[0].display_name} 등 ${teachers.length}인` }
          } else {
            return { courseId: id, title: name, teacher: teachers[0].display_name }
          }
        })
        updateData('contents', prev => ({ ...prev, courseList: res }))
        console.log(res)
      } else {
        window.alert('올바른 토큰이 아닙니다. 다시 확인해주세요.')
        //토스트 메세지
      }
    })
    setIsLoading(false)
  }

  return (
    <>
      <TopNavBar onClick={handleGetSubject} />
      <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
        {isLoading ? (
          <LoadingSkeleton />
        ) : contents.courseList.length ? (
          contents.courseList.map(data => (
            <SubjectCard courseId={data.courseId} title={data.title} teacher={data.teacher} onClick={onClick} />
          ))
        ) : (
          <NotFound />
        )}
      </div>
    </>
  )
}
