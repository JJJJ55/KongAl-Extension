import { BoardIcon, PlayIcon, ReportIcon, Text } from '@/components'
import { useStoragestore } from '@/store/useStorageStore'
import clsx from 'clsx'

type BottomNavProps = {
  dId: string
  activeType: 'play' | 'board' | 'report'
  setActiveType: (type: 'play' | 'board' | 'report') => void
}

const IssueOn = () => (
  <div className="bg-negative absolute h-[6px] w-[6px] rounded-full" style={{ top: '8px', right: '40px' }}></div>
)

export const DetailBottomNav = ({ dId, activeType, setActiveType }: BottomNavProps) => {
  const { contents } = useStoragestore()
  return (
    <div
      className="flex justify-around transition-colors duration-500 bg-white dark:bg-dark12 rounded-2xl"
      style={{ boxShadow: '0 -5px 5px -5px rgba(0,0,0,0.3)', height: '70px' }}
    >
      <button
        className={clsx(
          'relative flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px] text-[12px]',
          activeType === 'play' ? 'text-knuBlue dark:text-positive' : 'text-gray4',
        )}
        onClick={() => setActiveType('play')}
      >
        {contents.courseList[dId].isPlay > 0 && <IssueOn />}
        <PlayIcon />
        <Text>학 습</Text>
      </button>

      <button
        className={clsx(
          'relative flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px] text-[12px]',
          activeType === 'board' ? 'text-knuBlue dark:text-positive' : 'text-gray4',
        )}
        onClick={() => setActiveType('board')}
      >
        {contents.courseList[dId].isBoard > 0 && <IssueOn />}
        <BoardIcon />
        <Text>공 지</Text>
      </button>

      <button
        className={clsx(
          'relative flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px] text-[12px]',
          activeType === 'report' ? 'text-knuBlue dark:text-positive' : 'text-gray4',
        )}
        onClick={() => setActiveType('report')}
      >
        {contents.courseList[dId].isReport > 0 && <IssueOn />}
        <ReportIcon />
        <Text>과 제</Text>
      </button>
    </div>
  )
}
