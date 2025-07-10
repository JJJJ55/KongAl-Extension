import { BasicButton, Text } from '@/components'
import { Camera } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { ImageCropModal } from './ImageCropModal'
import { AnimatePresence } from 'framer-motion'

import pkg from '../../../../package.json'

export const SettingPage = () => {
  const [isImgCropOpen, setIsImgCrppOpen] = useState<boolean>(false)
  const [img, setImg] = useState<string | null>('null')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDeletePreviewFile = (e: React.MouseEvent) => {
    //기본 이미지로
    e.preventDefault()
    if (inputRef.current) {
      inputRef.current.value = ''
      setImg(`${import.meta.env.VITE_PUBLIC_URL}/img/default_image3.png`)
    }
  }

  const handleCropOk = useCallback(async (cropImg: string) => {
    setIsImgCrppOpen(false)
    setImg(cropImg)
  }, [])

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      setIsImgCrppOpen(true)

      reader.onload = () => {
        setImg(reader.result as string)
      }
    }
  }

  return (
    <div className="scrollbar-hidden relative flex flex-1 flex-col items-center gap-3 overflow-auto pt-8">
      <div
        className="mb-3 flex h-[125px] w-[300px] items-center justify-around rounded-xl bg-white"
        style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
      >
        <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full">
          <img
            src={img === null ? chrome.runtime.getURL('kongal_Logo.png') : img}
            alt="프로필 사진"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-black/25">
            <div
              onClick={() => inputRef.current?.click()}
              // onClick={() => setIsImgCrppOpen(true)}
              className="bg-gray1 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full opacity-70 hover:opacity-100"
            >
              <Camera size={20} />
            </div>
          </div>
        </div>
        <div className="w-[165px] text-left text-[15px] font-bold">
          <Text>오진영님 반가워요!</Text>
          <Text>(201801###)</Text>
        </div>
      </div>

      <div className="text-[15px] font-bold">
        <Text>데이터 새로고침 간격</Text>
        <select name="1" id="" className="mt-1 h-[40px] w-[300px] cursor-pointer rounded-xl bg-white px-4">
          <option value="1">3시간</option>
          <option value="2">6시간</option>
          <option value="3">12시간</option>
        </select>
      </div>
      <div className="text-[15px] font-bold">
        <Text>토큰 정보</Text>
        <div className="bg-gray2 text-gray4 mt-1 h-[40px] w-[300px] truncate rounded-xl px-4 leading-[40px]">
          Ty23PwerkPnrgaZoa9m5YOVYf5erre5YOVYf5erre
        </div>
      </div>
      <BasicButton onClick={() => {}}>토큰 삭제하기</BasicButton>
      <BasicButton onClick={() => {}}>문의 & 버그 제보</BasicButton>
      <footer className="mt-4 text-center text-[12px]">
        <Text>공주대학교 LMS 알리미</Text>
        <Text>{`콩알 v${pkg.version}`}</Text>
      </footer>

      <input type="file" ref={inputRef} hidden onChange={handleChangeFile} />
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
    </div>
  )
}
