import { motion } from 'framer-motion'

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-[16px]">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="bg-gray1 dark:bg-dark12 flex h-[60px] w-[300px] flex-col justify-center gap-3 rounded-xl p-3 transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <motion.div
            className="bg-gray2 dark:bg-SkeletonDark h-[16px] w-[266px] rounded-xl"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: 'loop',
              delay: index * 0.3,
            }}
          />
          <motion.div
            className="bg-gray2 dark:bg-SkeletonDark h-[16px] w-[118px] rounded-xl"
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
