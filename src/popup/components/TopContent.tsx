import { Text } from '@/components'

export const TopContent = () => {
  return (
    <main className="mt-4 flex flex-col items-center">
      <Text className="mb-2 text-[20px] font-bold">공주대 LMS 알리미 - 콩알</Text>
      <img src="/assets/popup_notToken.png" alt="캐릭터" />
      <Text className="mt-4 text-[15px] font-bold">서비스 이용을 위해 토큰 생성을 해주세요!</Text>
      <Text className="text-center text-[12px] whitespace-pre">
        {`계졍 변경 등 토큰 삭제를 원할 경우 \n브라우저 오른쪽 하단에서 설정창을 확인해주세요.`}
      </Text>
    </main>
  )
}
