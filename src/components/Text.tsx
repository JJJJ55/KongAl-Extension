import clsx from 'clsx'

type ButtonProps = {
  className?: string
  children: string
}

export const Text = ({ className, children }: ButtonProps) => {
  return <div className={clsx('font-pretendard', className)}>{children}</div>
}
