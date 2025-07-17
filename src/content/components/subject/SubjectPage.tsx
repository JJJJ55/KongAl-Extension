import { useState } from 'react'
import { LoadingSkeleton } from './LoadingSkeleton'
import { NotFound } from './NotFound'
import { SubjectCard } from './SubjectCard'
import { TopNavBar } from './TopNavbar'
import { SubjectDetailPage } from './detail/SubjectDetailPage'
import { useStoragestore } from '@/store/useStorageStore'

export const SubjectPage = ({ onClick }: { onClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { settings, contents, updateData } = useStoragestore()

  const handleGetSubject = () => {
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
      }
    })
  }

  return (
    <>
      <TopNavBar onClick={handleGetSubject} />
      <div className="flex flex-col items-center flex-1 gap-3 py-3 overflow-auto scrollbar-hidden">
        {contents.courseList.map(data => (
          <SubjectCard courseId={data.courseId} title={data.title} teacher={data.teacher} onClick={onClick} />
        ))}
        {/* <LoadingSkeleton /> */}
        {/* <NotFound /> */}
      </div>
    </>
  )
}
