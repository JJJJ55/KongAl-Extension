import Logo from '@/assets/crx.svg'
import { BasicButton } from '@/components'
import { useState } from 'react'
// import './App.css'

function App() {
  const [show, setShow] = useState(false)
  const toggle = () => setShow(!show)

  return (
    // <div>
    //   {show && (
    //     <div className={`popup-content ${show ? 'opacity-100' : 'opacity-0'}`}>
    //       <h1>HELLO CRXJS</h1>
    //       <div className="w-50px h-50px bg-knuBlue text-2xl font-bold underline">테스트</div>
    //       <div className="bottom-25px right-25px h-56px w-56px fixed z-500">ggg</div>
    //     </div>
    //   )}
    //   <div
    //     className="fixed right-0 bottom-0 z-100 m-5 h-[24px] w-[24px] bg-cover bg-center bg-no-repeat"
    //     style={{ backgroundImage: `url(${chrome.runtime.getURL('/logo.png')})` }}
    //     onClick={toggle}
    //   >
    //     er
    //     {/* <img src={Logo} alt="CRXJS logo" className="button-icon bg-cover bg-center bg-no-repeat" /> */}
    //   </div>
    // </div>
    <div
      className="fixed right-0 bottom-0 z-100 m-5 h-[48px] w-[48px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${chrome.runtime.getURL('/logo.png')})` }}
      onClick={toggle}
    >
      {show && (
        <div className={`popup-content ${show ? 'opacity-100' : 'opacity-0'}`}>
          <BasicButton className="bg-knuBlue" content="dfdf" onClick={() => console.log('클릭')} />
          <h1>HELLO CRXJS</h1>
          <div className="w-50px h-50px bg-knuBlue text-2xl font-bold underline">테스트</div>
          <div className="bottom-25px right-25px h-56px w-56px fixed z-500">ggg</div>
        </div>
      )}
    </div>
  )
}

export default App
