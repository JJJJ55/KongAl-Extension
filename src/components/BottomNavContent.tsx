type BottomNavContentProps = {
  children: React.ReactNode
}

export const BottomNavContent = ({ children }: BottomNavContentProps) => {
  return (
    <div
      className="dark:bg-dark12 flex justify-around rounded-2xl bg-white transition-colors duration-500"
      style={{ boxShadow: '0 -5px 5px -5px rgba(0,0,0,0.3)', height: '70px' }}
    >
      {children}
    </div>
  )
}
