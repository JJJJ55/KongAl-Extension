export type Noti = {
  isReport?: number
  isPlay?: number
  isBoard?: number
}

export type Course = {
  [courseId: string]: CourseItem
}

export type CourseItem = {
  title: string
  teacher: string
  updateAt: string | null
  isReport: number
  isPlay: number
  isBoard: number
}

export type PlayItem = {
  title: string
  isComplete: boolean
  isAttendance: string | null
  dueAt: string | null
}

export type IssueItem = {
  title: string
  createAt: string
  dueAt?: string | null
  isChange?: boolean
  html_url: string
  isOk: boolean
}

export type Play = {
  [week: string]: PlayItems
}

export type PlayItems = {
  [moduleId: string]: PlayItem
}

export type Issue = {
  [plannable_id: string]: IssueItem
}

export type Detail = {
  [course_id: string]: DetailItem
}

export type DetailItem = {
  PlayList: Play
  BoardList: Issue
  ReportList: Issue
}

export type Contents = {
  courseList: Course
  courseDetail: Detail
}
