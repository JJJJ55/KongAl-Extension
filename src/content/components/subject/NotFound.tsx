import { Text } from '@/components'

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div
        className="h-[160px] w-[100px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${chrome.runtime.getURL('/assets/notFound.png')})`,
        }}
      ></div>
      <Text className="text-[16px] font-bold dark:text-white">내역이 존재하지 않아요</Text>
    </div>
  )
}
