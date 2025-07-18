import { BasicButton, Text } from '@/components'
import { Camera, Undo2 } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { ImageCropModal } from './ImageCropModal'
import { AnimatePresence } from 'framer-motion'
import { useStoragestore } from '@/store/useStorageStore'

export const SettingPage = () => {
  const [isImgCropOpen, setIsImgCrppOpen] = useState<boolean>(false)
  const [img, setImg] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { settings, info, updateData, resetStore } = useStoragestore()

  const handleImgReset = useCallback(async () => {
    updateData('settings', prev => ({ ...prev, image: chrome.runtime.getURL('/kongal_Logo.png') }))
  }, [])

  const handleCropOk = useCallback(async (cropImg: string) => {
    updateData('settings', prev => ({ ...prev, image: cropImg }))
    setIsImgCrppOpen(false)
    setImg(null)
  }, [])

  const handleLogout = useCallback(async () => {
    resetStore()
  }, [])

  const handleHelp = () => {
    window.location.href = 'https://www.naver.com'
  }

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
        className="mb-3 flex h-[140px] w-[300px] items-center justify-center gap-1 rounded-xl bg-white"
        style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
      >
        <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full">
          <img src={settings.image} alt="프로필 사진" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex h-full w-full items-center justify-center gap-2 rounded-full bg-black/25">
            <div
              onClick={() => inputRef.current?.click()}
              className="bg-gray1 group relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full opacity-70 hover:opacity-100"
            >
              <Camera size={20} />
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
              <Undo2 size={20} />
              <div
                style={{ top: '-25px' }}
                className="absolute z-10 mt-[4px] bg-gray-800 px-[6px] py-[2px] text-[10px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
              >
                기본 이미지로
              </div>
            </div>
          </div>
        </div>
        <div className="w-[165px] text-center text-[15px] font-bold">
          <Text>{`${info.username} 님`}</Text>
          <Text>{`(${info.userId})`}</Text>
        </div>
      </div>

      <div className="text-[15px] font-bold">
        <Text>데이터 새로고침 간격</Text>
        <select name="1" id="" className="mt-1 h-[40px] w-[300px] cursor-pointer rounded-xl bg-white px-4">
          <option value="1">6시간</option>
          <option value="2">9시간</option>
          <option value="3">12시간</option>
        </select>
      </div>
      <div className="text-[15px] font-bold">
        <Text>토큰 정보</Text>
        <div className="bg-gray2 text-gray4 mt-1 h-[40px] w-[300px] truncate rounded-xl px-4 leading-[40px]">
          {settings.siteToken ? settings.siteToken : '토큰이 존재하지 않습니다.'}
        </div>
      </div>
      <BasicButton onClick={handleLogout}>서비스 로그아웃 (토큰 삭제)</BasicButton>
      <BasicButton onClick={handleHelp}>문의 & 버그 제보</BasicButton>
      <footer className="mt-4 text-center text-[12px]">
        <Text>공주대학교 LMS 알리미</Text>
        <Text>{`콩알 v${settings.version}`}</Text>
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
