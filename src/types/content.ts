interface BaseCourse {
  courseId: string
  title: string
  teacher: string
}

export interface Course extends BaseCourse {
  isReport: boolean
  isPlay: boolean
  isBoard: boolean
}

export type Play = {
  title: string
  type: string
  isComplete: boolean
  dueAt: number
}

export type Board = {
  title: string
  teacher: string
  planAt: string
  isRead: boolean
}

export type Report = {
  title: string
  isSubmit: boolean
  dueAt: number
  isChange: boolean
}

export interface Detail extends BaseCourse {
  PlayList: Play[]
  BoardList: Board[]
  ReportList: Report[]
}

export type Contents = {
  courseList: Course[]
  courseDetail: Detail[]
}
