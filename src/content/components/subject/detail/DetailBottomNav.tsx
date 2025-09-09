import { BoardIcon, BottomNavContent, PlayIcon, ReportIcon } from '@/components'
import { useStoragestore } from '@/store/useStorageStore'
import { DetailBottomItem } from './DetailBottomItem'

type DetailBottomNavProps = {
  dId: string
  activeType: 'play' | 'board' | 'report'
  setActiveType: (type: 'play' | 'board' | 'report') => void
}

const IssueOn = () => (
  <div className="bg-negative absolute h-[6px] w-[6px] rounded-full" style={{ top: '8px', right: '40px' }}></div>
)

export const DetailBottomNav = ({ dId, activeType, setActiveType }: DetailBottomNavProps) => {
  const { contents } = useStoragestore()
  return (
    <BottomNavContent>
      <DetailBottomItem activeType={activeType} setActiveType={setActiveType} item="play" itemName="학 습">
        {contents.courseList[dId].isPlay > 0 && <IssueOn />}
        <PlayIcon />
      </DetailBottomItem>
      <DetailBottomItem activeType={activeType} setActiveType={setActiveType} item="board" itemName="공 지">
        {contents.courseList[dId].isBoard > 0 && <IssueOn />}
        <BoardIcon />
      </DetailBottomItem>
      <DetailBottomItem activeType={activeType} setActiveType={setActiveType} item="report" itemName="과 제">
        {contents.courseList[dId].isReport > 0 && <IssueOn />}
        <ReportIcon />
      </DetailBottomItem>
    </BottomNavContent>
  )
}
