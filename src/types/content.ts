// export interface BaseCourse {
//   courseId?: string
//   title: string
//   teacher: string
// }

// export interface Course extends BaseCourse {
//   isReport?: number
//   isPlay?: number
//   isBoard?: number
// }

// export type Play = {
//   title: string
//   type: string
//   isComplete: boolean
//   dueAt: number
// }

// export type Board = {
//   id: number
//   title: string
//   teacher: string
//   planAt: string
//   html_url: string
//   isRead: boolean
// }

// export type Report = {
//   id: number
//   title: string
//   isSubmit: boolean
//   dueAt: number
//   isChange: boolean
//   html_url: string
// }

// export interface Detail extends BaseCourse {
//   PlayList: Play[]
//   BoardList: Board[]
//   ReportList: Report[]
// }

// export type Contents = {
//   courseList: Course[]
//   courseDetail: Detail[]
// }

export type Course = {
  [courseId: string]: CourseItem
}

export type CourseItem = {
  title: string
  teacher: string
  isReport?: number
  isPlay?: number
  isBoard?: number
}

export type Play = {
  weeks: number
  title: string
  type: string
  isComplete: boolean
  dueAt: number
}

export type Board = {
  id: number
  title: string
  planAt: string
  html_url: string
  isRead: boolean
}

export type Report = {
  id: number
  title: string
  isSubmit: boolean
  dueAt: number
  isChange: boolean
  html_url: string
}

export type Detail = {
  [courseId: string]: DetailItem
}

export type DetailItem = {
  PlayList: Play[]
  BoardList: Board[]
  ReportList: Report[]
}

export type Contents = {
  courseList: Course
  courseDetail: Detail
}
