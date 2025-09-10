type ModalBtnDragProps = {
  activeCorner: 'tl' | 'tr' | 'bl' | 'br' | null
  positionName: 'tl' | 'tr' | 'bl' | 'br'
  img: string
}

export const ModalBtnDrag = ({ activeCorner, positionName, img }: ModalBtnDragProps) => {
  return (
    <div
      className="fixed h-[45px] w-[45px] rounded-full bg-cover bg-no-repeat"
      style={{
        ...(positionName === 'tl' && { top: '25px', left: '25px' }),
        ...(positionName === 'tr' && { top: '25px', right: '25px' }),
        ...(positionName === 'bl' && { bottom: '25px', left: '25px' }),
        ...(positionName === 'br' && { bottom: '25px', right: '25px' }),
        border: '2px dashed white',
        pointerEvents: 'none',
        zIndex: 50,
        backgroundImage: activeCorner === positionName ? `url(${img})` : '',
      }}
    />
  )
}
