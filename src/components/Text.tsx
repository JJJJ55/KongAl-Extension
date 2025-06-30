import clsx from 'clsx'

type ButtonProps = {
  className?: string
  content: string
}

const Text = ({ className, content }: ButtonProps) => {
  return <div className={clsx('font-pretendard', className)}>{content}</div>
}

export default Text
