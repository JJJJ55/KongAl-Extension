import { BasicButton, Text } from '@/components'
import { Camera } from 'lucide-react'

export const SettingPage = () => {
  return (
    <>
      <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-5 overflow-auto pt-10">
        <div className="bg-kongju flex h-[100px] w-[100px] items-center justify-center rounded-full">
          <div className="bg-gray1 flex h-[30px] w-[30px] items-center justify-center rounded-full opacity-70">
            <Camera size={20} />
          </div>
        </div>
        <div className="text-center text-[15px] font-bold">
          <Text>오 진 영</Text>
          <Text>(201801###)</Text>
        </div>
        <div className="text-[15px] font-bold">
          <Text>데이터 새로고침 간격</Text>
          <select name="1" id="" className="h-[40px] w-[300px] rounded-xl bg-white px-4">
            <option value="1">3시간</option>
            <option value="2">6시간</option>
            <option value="3">12시간</option>
          </select>
        </div>
        <div className="text-[15px] font-bold">
          <Text>토큰 정보</Text>
          <div className="bg-gray2 text-gray4 h-[40px] w-[300px] truncate rounded-xl px-4 leading-[40px]">
            Ty23PwerkPnrgaZoa9m5YOVYf5erre5YOVYf5erre
          </div>
        </div>
        <BasicButton onClick={() => {}}>토큰 삭제하기</BasicButton>
        <BasicButton onClick={() => {}}>문의 & 버그 제보</BasicButton>
        <footer className="mt-5 text-center text-[12px]">
          <Text>공주대학교 LMS 알리미</Text>
          <Text>콩알 v.0.0.1</Text>
        </footer>
      </div>
    </>
  )
}
