import { Flip, ToastContainer } from 'react-toastify'

export const ToastComponent = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Flip}
      closeButton={false}
      className="w-[300px] font-bold text-black"
      style={{ marginBottom: '60px' }}
      toastClassName={context => {
        const base = 'w-[300px] text-[13px] font-bold h-[40px] flex justify-center items-center rounded-xl'
        const variants = {
          success: 'bg-green-100 text-green-800 border-green-200',
          error: 'bg-red-100 text-red-800 border-red-200',
          info: 'bg-blue-100 text-blue-800 border-blue-200',
          warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          default: 'bg-white text-black border-gray-200',
        }

        return `${base} ${variants[context?.type || 'default']}`
      }}
    />
  )
}
