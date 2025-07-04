import { SubjectCard } from './SubjectCard'
import { TopNavBar } from './TopNavbar'

export const SubjectPage = () => {
  return (
    <>
      <TopNavBar />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-scroll">
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
      </div>
    </>
  )
}
