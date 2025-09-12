type TopNavContentProps = {
  children: React.ReactNode
}

export const TopNavContent = ({ children }: TopNavContentProps) => {
  return (
    <header
      className="dark:bg-dark12 flex flex-row items-center rounded-2xl bg-white p-5 transition-colors duration-500"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)', height: '60px' }}
    >
      {children}
    </header>
  )
}
