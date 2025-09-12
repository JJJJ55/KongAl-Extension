type LineTextProps = {
  className?: string
  children: string
}

export const LineText = ({ className, children }: LineTextProps) => {
  return (
    <div className="flex w-[330px] items-center justify-center gap-1 text-center">
      <div className={`'font-pretendard' ${className ?? ''}`}>{children}</div>
      <hr className="text-gray2 w-full" />
    </div>
  )
}
