import crxLogo from '@/assets/crx.svg'
import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import HelloWorld from '@/components/HelloWorld'
// import './App.css'
import BasicButton from '@/components/BasicButton'
import '@/styles/index.css'
import Text from '@/components/Text'
import { CallIcon, GithubIcon, KongjuIcon, LogoIcon, Test } from '@/components/Icons'

export default function App() {
  return (
    <div className="flex h-[350px] w-[350px] items-center justify-center">
      {/* <img src="/assets/popup_notToken.png" alt="캐릭터 사진" /> */}
      <Text content="테스트" className="text-16px" />
      <GithubIcon className="h-[36px] w-[36px]" />
      <CallIcon className="h-[36px] w-[36px]" />
      <KongjuIcon className="h-[36px] w-[36px]" />
      <LogoIcon className="h-[40px] w-[40px]" />
      <BasicButton content="토큰 생성하기" onClick={() => alert('작동')} className=""></BasicButton>
    </div>
  )
}
