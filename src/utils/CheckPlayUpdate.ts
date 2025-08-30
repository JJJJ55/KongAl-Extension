export const CheckPlayUpdate = (update: string): boolean => {
  const lastUpdateTime = new Date(update).getTime()
  const currentTime = new Date().getTime()
  const refreshPlayTime = 1000 * 60 * 60 * 9 // 9시간

  if (currentTime - lastUpdateTime > refreshPlayTime) return true
  else return false
}
