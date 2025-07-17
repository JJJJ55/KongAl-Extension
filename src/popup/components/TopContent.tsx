import { SmallButton, Text } from '@/components'
import { Guide } from '@/constants'
import { useState } from 'react'

type TopContentProps = {
  noti: boolean
  token: string | null
  updateFn: (token: string | null) => void
}

export const TopContent = ({ noti, token, updateFn }: TopContentProps) => {
  const [value, setValue] = useState<string | null>(null)

  const PopUpMain = () => {
    return (
      <>
        {noti ? (
          <>
            <img src={Guide.notification.img} alt="캐릭터" />
            <Text className="mt-4 text-[15px] font-bold">{Guide.notification.bigText}</Text>
            <Text className="text-center text-[12px] whitespace-pre">{Guide.notification.smallText}</Text>
          </>
        ) : (
          <>
            <img src={token ? Guide.getToken.img : Guide.noToken.img} alt="캐릭터" />
            <Text className="mt-4 text-[15px] font-bold">{token ? Guide.getToken.bigText : Guide.noToken.bigText}</Text>
            <Text className="text-center text-[12px] whitespace-pre">
              {token ? Guide.getToken.smallText : Guide.noToken.smallText}
            </Text>
          </>
        )}
      </>
    )
  }

  return (
    <main className="mt-4 flex flex-col items-center">
      <Text className="mb-2 text-[20px] font-bold">공주대 LMS 알리미 - 콩알</Text>
      <PopUpMain />
      {!token && (
        <>
          <a
            className="text-14px text-knuBlue cursor-pointer font-bold"
            href="https://knulms.kongju.ac.kr/profile/settings"
            target="_blank"
          >
            LMS 토큰 생성 바로가기
          </a>
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
        </>
      )}
    </main>
  )
}
