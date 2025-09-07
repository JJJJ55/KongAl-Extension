import { Text } from '@/components'
import KongalLogo from '@/assets/KongalLogo.svg?react'

export const TopNavBar = ({ onClick, onIssueTest }: { onClick: () => void; onIssueTest: () => void }) => {
  return (
    <div
      className="dark:bg-dark12 flex flex-row items-center justify-start rounded-2xl bg-white p-5 transition-colors duration-500"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)', height: '60px' }}
    >
      <KongalLogo className="ml-1 h-[36px] w-[36px]" />
      <div className="ml-3" onClick={onClick}>
        <Text className="text-[16px] font-bold dark:text-white">콩알</Text>
        <Text className="text-[11px] font-medium dark:text-white">공주대 LMS 알림을 한번에!</Text>
      </div>
      {/* 임시용 이슈 불러오기 삭제예정 */}
      <button onClick={onIssueTest}>이슈</button>
    </div>
  )
}
