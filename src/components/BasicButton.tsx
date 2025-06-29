import clsx from 'clsx'

type ButtonProps = {
  className: string
  content: string
  onClick: () => void
}

const BasicButton = ({ className, content, onClick }: ButtonProps) => {
  return (
    <button
      className={clsx('bg-knuBlue h-[40px] w-[300px] text-[15px] font-bold text-white', className)}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

export default BasicButton
