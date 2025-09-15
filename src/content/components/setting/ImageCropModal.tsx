import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Text } from '@/components'
import { getCroppedImg } from '@/utils/ImgCrop'

import type { Point, Area } from 'react-easy-crop'

type ProfileImageProps = {
  croppedImage: string
  onCrop: (croppedImage: string) => void
  onCancle: () => void
}

export const ImageCropModal = ({ croppedImage, onCrop, onCancle }: ProfileImageProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleChangeImg = useCallback(async () => {
    if (croppedAreaPixels) {
      const cropImg = await getCroppedImg(croppedImage, croppedAreaPixels)
      onCrop(cropImg)
    }
  }, [croppedAreaPixels, croppedImage, onCrop])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/25"
    >
      <div className="dark:bg-dark12 flex h-[400px] w-[300px] flex-col gap-5 rounded-xl bg-white p-5">
        <div className="flex justify-between">
          <Text className="text-[14px] font-bold">프로필 사진 변경</Text>
          <X size={24} className="cursor-pointer dark:text-white" onClick={onCancle} />
        </div>
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-white" />
          <Cropper
            image={croppedImage}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="round"
            disableAutomaticStylesInjection
            style={{
              containerStyle: {
                backgroundColor: 'white',
              },
              mediaStyle: {
                backgroundColor: 'white',
              },
            }}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleChangeImg}
            className="hover:bg-knuBlue-pointer bg-knuBlue cursor-pointer rounded-xl px-5 py-2 text-white"
          >
            확 인
          </button>
        </div>
      </div>
    </motion.div>
  )
}
