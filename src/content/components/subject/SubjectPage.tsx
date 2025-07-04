import { LoadingSkeleton } from './LoadingSkeleton'
import { NotFound } from './NotFound'
import { SubjectCard } from './SubjectCard'
import { TopNavBar } from './TopNavbar'

export const SubjectPage = () => {
  return (
    <>
      <TopNavBar />
      <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-6 overflow-auto py-5">
        {/* <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard /> */}
        {/* <LoadingSkeleton /> */}
        <NotFound />
      </div>
    </>
  )
}
