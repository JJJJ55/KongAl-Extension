import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { SubjectPage } from './subject/SubjectPage'
import { BottomNavBar } from './subject/BottomNavbar'
import { SettingPage } from './setting/SettingPage'
import { useState } from 'react'
import { SubjectDetailPage } from './subject/detail/SubjectDetailPage'

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 12, mass: 0.5 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { type: 'spring', stiffness: 150, damping: 18, mass: 0.5 },
  },
}

// export const MainModal = () => {
//   const [isOpen, setIsOpen] = useState(false)

//   const toggleDetail = () => {
//     setIsOpen(prev => !prev)
//     console.log('클릭')
//   }

//   return (
//     <motion.div
//       variants={modalVariants}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//       transition={{ duration: 0.3 }}
//       className="bg-bgColor fixed z-500 h-[600px] w-[350px] origin-bottom-right overflow-hidden rounded-3xl shadow-[0_0_100px_0_rgba(0,0,0,0.2)]"
//       style={{ boxShadow: ' 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', bottom: '96px', right: '25px' }}
//     >
//       <AnimatePresence mode="wait">
//         {isOpen ? (
//           <SubjectDetailPage onClick={toggleDetail} />
//         ) : (
//           <div className="flex h-full flex-col">
//             <SubjectPage onClick={toggleDetail} />
//             {/* <SettingPage /> */}
//             <BottomNavBar />
//           </div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   )
// }
export const MainModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDetail = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="bg-bgColor fixed z-500 h-[600px] w-[350px] origin-bottom-right overflow-hidden rounded-3xl shadow-[0_0_100px_0_rgba(0,0,0,0.2)]"
      style={{ boxShadow: ' 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', bottom: '96px', right: '25px' }}
    >
      <AnimatePresence>
        {isOpen ? (
          <SubjectDetailPage key="detail" onClick={toggleDetail} />
        ) : (
          <div className="flex h-full flex-col">
            <SubjectPage onClick={toggleDetail} />
            {/* <SettingPage /> */}
            <BottomNavBar />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
