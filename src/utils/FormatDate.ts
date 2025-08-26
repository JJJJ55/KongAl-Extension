export const CompareUpdateAt = (createAt: string | null | undefined, updateAt: string | null | undefined) => {
  if (createAt === null || createAt === undefined) return true
  if (updateAt === null || updateAt === undefined) return true
  const createDate = new Date(createAt)
  const updateDate = new Date(updateAt)

  const diffTime = createDate.getTime() - updateDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return false
  } else {
    return true
  }
}

export const CompareDueAt = (dueAt: string | null | undefined, updateAt: string | null | undefined) => {
  if (dueAt === null || dueAt === undefined) return '-'
  if (updateAt === null || updateAt === undefined) return '-'
  const dueDate = new Date(dueAt)
  const today = new Date(updateAt)

  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return '오늘'
  } else if (diffDays > 0 && diffDays <= 3) {
    return '이내'
  } else if (diffDays > 3) {
    return '-'
  }
}

export const ChangeDutAt = (dutAt: string | null | undefined) => {
  if (dutAt === null || dutAt === undefined) return '-'
  const dueDate = new Date(dutAt)
  const today = new Date()

  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  let hours = dueDate.getHours()
  const minutes = dueDate.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? '오후' : '오전'
  hours = hours % 12 || 12

  const timeStr = `${ampm} ${hours}:${minutes}`

  if (diffDays > 0) {
    return `마감 ${diffDays}일 전`
  } else if (diffDays === 0) {
    return `오늘 ${timeStr} 마감`
  } else {
    return '마 감'
  }
}

export const ChangeCreateAt = (dutAt: string | null | undefined) => {
  if (dutAt === null || dutAt === undefined) return '-'
  const utcDate = new Date(dutAt)
  const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000)

  const year = kstDate.getFullYear()
  const month = (kstDate.getMonth() + 1).toString().padStart(2, '0')
  const day = kstDate.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}
