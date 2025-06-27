import Logo from '@/assets/crx.svg'
import { useState } from 'react'
// import './App.css'

function App() {
  const [show, setShow] = useState(false)
  const toggle = () => setShow(!show)

  return (
    <div className="popup-container">
      {show && (
        <div className={`popup-content ${show ? 'opacity-100' : 'opacity-0'}`}>
          <h1>HELLO CRXJS</h1>
          <div className="w-50px h-50px bg-knuBlue text-2xl font-bold underline">테스트</div>
          <div className="bottom-25px right-25px h-56px w-56px fixed z-500">ggg</div>
        </div>
      )}
      <div className="gt-content">
        <button className="toggle-button" onClick={toggle}>
          <img src={''} alt="CRXJS logo" className="button-icon" />
        </button>
      </div>
    </div>
    // <div className="bottom-25px right-25px h-56px w-56px fixed z-500">
    //   <div>
    //     <button>
    //       <img src={Logo} alt="CRXJS logo" />
    //     </button>
    //   </div>
    // </div>
  )
}

export default App
