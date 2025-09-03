import { BasicButton, Text } from '@/components'
import { Camera, Undo2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ImageCropModal } from './ImageCropModal'
import { AnimatePresence } from 'framer-motion'
import { useStoragestore } from '@/store/useStorageStore'
import { toast } from 'react-toastify'
import clsx from 'clsx'

export const SettingPage = () => {
  const [isImgCropOpen, setIsImgCrppOpen] = useState<boolean>(false)
  const [img, setImg] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { system, settings, info, updateData, resetStore } = useStoragestore()

  const handleImgReset = useCallback(async () => {
    updateData('settings', prev => ({ ...prev, image: chrome.runtime.getURL('/kongal_Logo.png') }))
    toast.success('사진이 기본 이미지로 설정됐어요!', { icon: false })
  }, [])

  const handleCropOk = useCallback(async (cropImg: string) => {
    updateData('settings', prev => ({ ...prev, image: cropImg }))
    toast.success('사진이 변경됐어요!', { icon: false })
    setIsImgCrppOpen(false)
    setImg(null)
  }, [])

  const handleLogout = useCallback(async () => {
    resetStore()
  }, [])

  const handleHelp = () => {
    window.location.href = 'https://www.naver.com'
  }

  const handleTheme = (theme: 'sys' | 'light' | 'dark') => {
    updateData('system', prev => ({ ...prev, theme }))
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
    <div className="scrollbar-hidden relative flex flex-1 flex-col items-center gap-3 overflow-auto pt-6">
      <div
        className="dark:bg-dark12 mb-1 flex h-[140px] w-[300px] items-center justify-center gap-1 rounded-xl bg-white transition-colors duration-500"
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
          <Text className="dark:text-white">{`${info.username} 님`}</Text>
          <Text className="dark:text-white">{`(${info.userId})`}</Text>
        </div>
      </div>

      <div className="text-[15px] font-bold">
        <Text className="dark:text-white">화면 테마</Text>
        <div className="text-gray4 mt-1 mb-2 flex w-[300px] justify-center px-4 text-center text-[13px] font-medium">
          <span
            className={clsx(
              'w-[100px] cursor-pointer',
              system.theme === 'sys' ? 'text-positive font-bold' : 'text-gray4 font-medium',
            )}
            onClick={() => handleTheme('sys')}
          >
            시스템 설정
          </span>
          <span
            className={clsx(
              'w-[100px] cursor-pointer',
              system.theme === 'light' ? 'text-positive font-bold' : 'text-gray4 font-medium',
            )}
            onClick={() => handleTheme('light')}
          >
            라이트
          </span>
          <span
            className={clsx(
              'w-[100px] cursor-pointer',
              system.theme === 'dark' ? 'text-positive font-bold' : 'text-gray4 font-medium',
            )}
            onClick={() => handleTheme('dark')}
          >
            다크
          </span>
        </div>
        <Text className="dark:text-white">알림음 여부</Text>
        <div className="text-gray4 my-1 flex w-[300px] justify-center px-4 text-center text-[13px] font-medium">
          <span
            className={clsx(
              'w-[100px] cursor-pointer',
              !system.notiBeep ? 'text-positive font-bold' : 'text-gray4 font-medium',
            )}
            onClick={() => updateData('system', prev => ({ ...prev, notiBeep: false }))}
          >
            설 정
          </span>
          <span
            className={clsx(
              'w-[100px] cursor-pointer',
              system.notiBeep ? 'text-positive font-bold' : 'text-gray4 font-medium',
            )}
            onClick={() => updateData('system', prev => ({ ...prev, notiBeep: true }))}
          >
            해 제
          </span>
        </div>
      </div>
      <div className="text-[15px] font-bold">
        <Text className="dark:text-white">토큰 정보</Text>
        <div className="dark:bg-dark5 bg-gray2 text-gray4 mt-1 h-[40px] w-[300px] truncate rounded-xl px-4 leading-[40px] transition-colors duration-500">
          {settings.siteToken ? settings.siteToken : '토큰이 존재하지 않습니다.'}
        </div>
      </div>
      <BasicButton className="w-[300px]" onClick={handleLogout}>
        서비스 로그아웃 (토큰 삭제)
      </BasicButton>
      <BasicButton className="w-[300px]" onClick={handleHelp}>
        문의 & 버그 제보
      </BasicButton>
      <footer className="text-center text-[11px]">
        <Text className="font-medium dark:text-white">공주대학교 LMS 알리미</Text>
        <Text className="font-medium dark:text-white">{`콩알 v${settings.version}`}</Text>
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
