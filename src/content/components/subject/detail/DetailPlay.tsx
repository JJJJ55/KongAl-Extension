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
    <div className="flex flex-col items-center flex-1 gap-3 py-3 overflow-auto scrollbar-hidden">
      {Object.keys(playList).length ? (
        weeks.map(week => {
          const weekData = playList[week]
          return (
            <>
              <LineText className="w-[60px] text-[13px] font-bold dark:text-white">{`${week}주차`}</LineText>
              {weekData ? (
                Object.entries(weekData).map(([pid, p], idx) => (
                  <PlayCard key={pid} index={idx} data={p} onLink={handleLink} />
                ))
              ) : (
                <Text className="text-[12px] dark:text-white">학습이 존재하지 않습니다.</Text>
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
