import crxLogo from '@/assets/crx.svg'
import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import HelloWorld from '@/components/HelloWorld'
// import './App.css'
import BasicButton from '@/components/BasicButton'
import '@/styles/index.css'

export default function App() {
  return (
    <div className="h-[400px] w-[400px]">
      <BasicButton content="히히" onClick={() => alert('작동')} className="bg-knuBlue"></BasicButton>
    </div>
  )
}
