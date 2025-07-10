import type { Area } from 'react-easy-crop'

export async function getCroppedImg(imageSrc: string, crop: Area): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('No 2D context')

  canvas.width = crop.width
  canvas.height = crop.height

  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height)

  return canvas.toDataURL('image/png')
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', err => reject(err))
    img.src = url
  })
}
