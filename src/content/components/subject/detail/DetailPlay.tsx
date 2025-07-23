import { LineText, Text } from '@/components'
import { PlayCard } from './PlayCard'
import { useStoragestore } from '@/store/useStorageStore'
import { NotFound } from '../NotFound'

export const DetailPlay = ({ courseId }: { courseId: string | '' }) => {
  const { contents } = useStoragestore()

  const weeks = Array.from({ length: 15 }, (_, i) => String(i + 1))
  const playList = contents.courseDetail[courseId]?.PlayList || {}

  const handleLink = () => {
    window.location.href = `https://knulms.kongju.ac.kr/courses/${courseId}/external_tools/62`
  }

  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      {Object.keys(playList).length ? (
        weeks.map(week => {
          const weekData = playList[week]
          return (
            <>
              <LineText className="w-[60px] text-[13px] font-bold">{`${week}주차`}</LineText>
              {weekData ? (
                Object.entries(weekData).map(([pid, p]) => <PlayCard key={pid} data={p} onLink={handleLink} />)
              ) : (
                <Text className="text-[12px]">학습이 존재하지 않습니다.</Text>
              )}
            </>
          )
        })
      ) : (
        <NotFound />
      )}
    </div>
  )
}
