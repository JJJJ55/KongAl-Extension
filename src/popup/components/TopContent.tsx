import { SmallButton, Text } from '@/components'
import { useStoragestore } from '@/store/useStorageStore'
import type { StorageData } from '@/types'
import { useState } from 'react'

type TopContentProps = {
  token: string | null
  updateFn: (token: string | null) => void
}

export const TopContent = ({ token, updateFn }: TopContentProps) => {
  const [value, setValue] = useState<string | null>(null)

  const getInfo = () => {
    chrome.runtime.sendMessage({ type: 'USER_INFO' }, response => {
      console.log(response)
    })
  }

  return (
    <main className="mt-4 flex flex-col items-center">
      <Text className="mb-2 text-[20px] font-bold">공주대 LMS 알리미 - 콩알</Text>
      <img src="/assets/popup_notToken.png" alt="캐릭터" onClick={getInfo} />
      <Text className="mt-4 text-[15px] font-bold">서비스 이용을 위해 토큰 생성을 해주세요!</Text>
      <Text className="text-center text-[12px] whitespace-pre">
        {`계졍 변경 등 토큰 삭제를 원할 경우 \n브라우저 오른쪽 하단에서 설정창을 확인해주세요.`}
      </Text>
      {!token && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            className="border-gray4 h-[40px] w-[250px] rounded-xl border px-2 text-[12px] font-bold"
            placeholder="토큰을 입력해주세요."
            value={value!}
            onChange={e => setValue(e.target.value)}
          />
          <SmallButton onClick={() => updateFn(value)} className="w-[80px]">
            등 록
          </SmallButton>
        </div>
      )}
    </main>
  )
}
