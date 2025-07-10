import { motion } from 'framer-motion'

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-[16px]">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="bg-gray1 flex h-[60px] w-[282px] flex-col justify-center gap-3 rounded-xl p-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <motion.div
            className="bg-gray2 h-[16px] w-[248px] rounded-xl"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: 'loop',
              delay: index * 0.3,
            }}
          />
          <motion.div
            className="bg-gray2 h-[16px] w-[100px] rounded-xl"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: 'loop',
              delay: index * 0.3,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
