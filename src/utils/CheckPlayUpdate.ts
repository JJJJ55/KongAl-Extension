export const CheckPlayUpdate = (update: string | null): boolean => {
  if (update === null) return true
  const lastUpdateTime = new Date(update).getTime()
  const currentTime = new Date().getTime()
  const refreshPlayTime = 1000 * 60 * 60 * 9 // 9시간

  console.log('주차 마지막 업뎃', lastUpdateTime)
  console.log('주차 현재', currentTime)
  console.log('주차 업데이트 텀', refreshPlayTime)
  console.log('주차 결과', currentTime - lastUpdateTime)

  if (currentTime - lastUpdateTime > refreshPlayTime) return true
  else return false
}
