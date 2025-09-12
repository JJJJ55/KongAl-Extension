import clsx from 'clsx'

type ButtonProps = {
  className?: string
  children: React.ReactNode
}

export const Text = ({ className, children }: ButtonProps) => {
  return <div className={clsx('font-pretendard text-black dark:text-white', className)}>{children}</div>
}
