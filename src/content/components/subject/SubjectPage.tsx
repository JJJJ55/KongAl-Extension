import { useState } from 'react'
import { LoadingSkeleton } from './LoadingSkeleton'
import { NotFound } from './NotFound'
import { SubjectCard } from './SubjectCard'
import { TopNavBar } from './TopNavbar'
import { SubjectDetailPage } from './detail/SubjectDetailPage'

export const SubjectPage = ({ onClick }: { onClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <TopNavBar />
      <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-6 overflow-auto py-5">
        <SubjectCard onClick={onClick} />
        <SubjectCard onClick={onClick} />
        <SubjectCard onClick={onClick} />
        <SubjectCard onClick={onClick} />
        <SubjectCard onClick={onClick} />
        <SubjectCard onClick={onClick} />
        <SubjectCard onClick={onClick} />
        <SubjectCard onClick={onClick} />
        <SubjectCard onClick={onClick} />
        {/* <LoadingSkeleton /> */}
        {/* <NotFound /> */}
      </div>
    </>
  )
}
