import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Text } from '@/components'

export const TokenLoading = React.memo(() => {
  const Lottie = lazy(() => import('lottie-react'))
  const [loadingJson, setLoadingJson] = useState<any>(null)

  useEffect(() => {
    import('../Loading.json').then(module => setLoadingJson(module.default))
  }, [])

  return (
    <main className="mt-4 flex flex-col items-center">
      <Text className="mb-2 text-[20px] font-bold">공주대 LMS 알리미 - 콩알</Text>
      <Text className="mt-4 text-[15px] font-bold">토큰으로 데이터를 불러오고 있습니다.</Text>
      <Text className="text-center text-[12px] whitespace-pre">잠시만 기다려 주세요.</Text>
      <Suspense>
        <Lottie animationData={loadingJson} loop={true} />
      </Suspense>
      <Text className="text-negative dark:text-negative text-center text-[13px] font-bold whitespace-pre">
        작업이 완료되기 전, 팝업 창이 닫히지 않게 해주세요.
      </Text>
    </main>
  )
})
