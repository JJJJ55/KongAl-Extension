import { AnimatePresence } from 'framer-motion'
import { Camera, Undo2 } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { ImageCropModal } from './ImageCropModal'
import { BuymecoffeeIcon, Text } from '@/components'
import type { StorageData } from '@/types'

type SettingTopNavProps = {
  image: string
  userName: string
  userId: string
  updateData: <K extends keyof StorageData>(key: K, update: (prev: StorageData[K]) => StorageData[K]) => Promise<void>
}
export const SettingTopNav = ({ image, userName, userId, updateData }: SettingTopNavProps) => {
  const [isImgCropOpen, setIsImgCrppOpen] = useState<boolean>(false)
  const [img, setImg] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImgReset = useCallback(async () => {
    updateData('settings', prev => ({ ...prev, image: chrome.runtime.getURL('kongal_Logo.png') }))
    toast.success('프로필 사진이 기본으로 설정됐어요!', { icon: false })
  }, [])

  const handleCropOk = useCallback(async (cropImg: string) => {
    updateData('settings', prev => ({ ...prev, image: cropImg }))
    toast.success('프로필 사진이 변경됐어요!', { icon: false })
    setIsImgCrppOpen(false)
    setImg(null)
  }, [])

  const handleChangeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      setIsImgCrppOpen(true)

      reader.onload = () => {
        setImg(reader.result as string)
      }
    }

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [])

  return (
    <>
      <div
        className="dark:bg-dark12 mb-1 flex h-[140px] w-[300px] items-center justify-center gap-1 rounded-xl bg-white transition-colors duration-500"
        style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
      >
        <input type="file" ref={inputRef} hidden onChange={handleChangeFile} />
        <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full">
          <img src={image} alt="프로필 사진" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex h-full w-full items-center justify-center gap-2 rounded-full bg-black/25">
            <div
              onClick={() => inputRef.current?.click()}
              className="bg-gray1 group relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full opacity-70 hover:opacity-100"
            >
              <Camera size={20} className="text-black" />
              <div
                style={{ top: '-25px' }}
                className="absolute mt-[4px] bg-gray-800 px-[6px] py-[2px] text-[10px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
              >
                프로필 교체
              </div>
            </div>
            <div
              onClick={handleImgReset}
              className="bg-gray1 group relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full opacity-70 hover:opacity-100"
            >
              <Undo2 size={20} className="text-black" />
              <div
                style={{ top: '-25px' }}
                className="absolute z-10 mt-[4px] bg-gray-800 px-[6px] py-[2px] text-[10px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
              >
                기본 이미지로
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7 flex flex-col items-center justify-around gap-3">
          <div className="w-[165px] text-center text-[15px] font-bold">
            <Text>{`${userName.length >= 10 ? [...userName].slice(0, 9).join('') + '...' : userName} 님`}</Text>
            <Text>{`(${userId})`}</Text>
          </div>
          <div
            className="bg-gray1 bg dark:bg-gray4 flex h-[30px] w-[110px] cursor-pointer items-center justify-center rounded-xl"
            onClick={() => window.open(`${import.meta.env.VITE_DONATION}`, '_blank')}
          >
            <BuymecoffeeIcon className="h-[15px] w-[15px]" />
            <Text className="text-[12px]">개발자 후원하기</Text>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isImgCropOpen && img && (
          <ImageCropModal
            croppedImage={img}
            onCrop={handleCropOk}
            onCancle={() => {
              setIsImgCrppOpen(false)
              setImg(null)
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
