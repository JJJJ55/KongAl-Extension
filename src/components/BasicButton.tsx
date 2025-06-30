import clsx from 'clsx'

type ButtonProps = {
  className: string
  content: string
  onClick: () => void
}

const BasicButton = ({ className, content, onClick }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'bg-knuBlue hover:bg-knuBlue-pointer font-pretendard h-[40px] w-[300px] cursor-pointer rounded-xl text-[15px] text-white',
        className,
      )}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

export default BasicButton
