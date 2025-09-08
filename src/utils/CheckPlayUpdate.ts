export const CheckPlayUpdate = (update: string | null): boolean => {
  if (update === null) return true
  const lastUpdateTime = new Date(update).getTime()
  const currentTime = new Date().getTime()
  const refreshPlayTime = 1000 * 60 * 60 * 5 // 5시간

  if (currentTime - lastUpdateTime > refreshPlayTime) return true
  else return false
}
