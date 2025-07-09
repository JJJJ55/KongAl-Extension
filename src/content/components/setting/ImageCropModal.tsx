import { motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'

import type { Point, Area } from 'react-easy-crop'

type ProfileImageProps = {
  croppedImage: string
  onCancle: () => void
}

export const ImageCropModal = ({ croppedImage, onCancle }: ProfileImageProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/25"
    >
      <div className="flex h-[400px] w-[300px] flex-col gap-5 rounded-xl bg-white p-5">
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-white">
            <Cropper
              image={croppedImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={onCancle} className="bg-gray2 rounded-xl">
            닫기
          </button>
          <button onClick={onCancle} className="bg-gray2 rounded-xl">
            닫기
          </button>
        </div>
      </div>
    </motion.div>
  )
}
