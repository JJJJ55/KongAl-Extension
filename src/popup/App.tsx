import '@/styles/index.css'
import { PopupNav, TokenLoading, TopContent } from './components'
import { BasicButton } from '@/components'

export default function App() {
  return (
    <div className="flex h-[350px] w-[350px] flex-col items-center justify-around">
      {/* <TopContent /> */}
      {/* 아래버튼은 토큰 생성시 invisible 처리할 예정 */}
      {/* <BasicButton onClick={() => alert('작동')} className="">
        토큰 생성하기
      </BasicButton> */}
      <TokenLoading />
      <PopupNav />
    </div>
  )
}
