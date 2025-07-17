import { Text } from '@/components'
import Lottie from 'lottie-react'
import loading from '@/assets/Loading.json'

export const TokenLoading = () => {
  return (
    <main className="mt-4 flex flex-col items-center">
      <Text className="mb-2 text-[20px] font-bold">공주대 LMS 알리미 - 콩알</Text>
      <Text className="mt-4 text-[15px] font-bold">토큰을 활성화하고 있습니다.</Text>
      <Text className="text-center text-[12px] whitespace-pre">잠시만 기다려 주세요.</Text>
      <Lottie animationData={loading} loop={true} />
    </main>
  )
}
