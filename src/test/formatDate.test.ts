import { describe, expect, it } from 'vitest'
import { ChangeCreateAt, ChangeDutAt, CompareDueAt, CompareUpdateAt } from '@/utils/FormatDate'

describe('만든 날짜 양식에 맞게 변환', () => {
  it('null값이 들어간 경우', () => {
    expect(ChangeCreateAt(null)).toBe('-')
  })
  it('변환 테스트1', () => {
    expect(ChangeCreateAt('2025-08-20T14:59:00Z')).toBe('2025-08-20 오후 11:59')
  })
  it('변환 테스트2', () => {
    expect(ChangeCreateAt('2025-07-02T11:55:30Z')).toBe('2025-07-02 오후 8:55')
  })
  it('변환 테스트3', () => {
    expect(ChangeCreateAt('2025-09-01T02:51:15Z')).toBe('2025-09-01 오전 11:51')
  })
  it('변환 테스트4', () => {
    expect(ChangeCreateAt('2025-09-01T20:51:15Z')).toBe('2025-09-02 오전 5:51')
  })
})

describe('마감일 변환 테스트', () => {
  it('null값인 경우', () => {
    expect(ChangeDutAt(null)).toBe('-')
  })
  it('undefined인 경우', () => {
    expect(ChangeDutAt(undefined)).toBe('-')
  })
  it.skip('마감일이 여유 있는 경우', () => {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    expect(ChangeDutAt(date.toISOString())).toBe('마감 2일 전')
  })
  it('마감일이 오늘인 경우', () => {
    const today = new Date()
    today.setHours(23, 59, 59, 0)
    expect(ChangeDutAt(today.toISOString())).toBe('오늘 오후 11:59 마감')
  })
  it('마감일이 지난 경우', () => {
    expect(ChangeDutAt('2025-08-26T14:59:59Z')).toBe('마 감')
  })
})

describe('마감일과 업데이트 날짜 비교', () => {
  it('마감일이 null인 경우', () => {
    expect(CompareDueAt(null, '2025-05-02T06:49:20Z')).toBe('-')
  })
  it('업데이트 날짜가 null 인경우', () => {
    expect(CompareDueAt('2025-05-02T06:49:20Z', null)).toBe('-')
  })
  it('마감일과 업데이트 일이 오늘인 경우', () => {
    expect(CompareDueAt('2025-05-02T06:49:20Z', '2025-05-02T06:49:20Z')).toBe('오늘')
  })
  it('마감일이 3일 이내 남은 경우', () => {
    const date = new Date()
    date.setDate(date.getDate() + 2)
    expect(CompareDueAt(date.toISOString(), new Date().toISOString())).toBe('이내')
  })
  it('마감일이 3일 초과로 여유 있는 경우', () => {
    expect(CompareDueAt('2025-09-02T14:59:59Z', new Date().toISOString())).toBe('-')
  })
  it('마감일이 지난 경우', () => {
    expect(CompareDueAt('2025-08-20T14:59:59Z', new Date().toISOString())).toBe('-')
  })
})

describe('생성 날짜와 업데이트 날짜 비교', () => {
  it('생성 날짜가 null인 경우', () => {
    expect(CompareUpdateAt(null, '2025-05-02T06:49:20Z')).toBe(true)
  })
  it('업데이트 날짜가 null인 경우', () => {
    expect(CompareUpdateAt('2025-05-02T06:49:20Z', null)).toBe(true)
  })
  it('생성 날짜와 업데이트가 같은 경우', () => {
    expect(CompareUpdateAt('2025-05-02T06:49:20Z', '2025-05-02T06:49:20Z')).toBe(true)
  })
  it('생성 날짜가 업데이트 날 이후인 경우', () => {
    expect(CompareUpdateAt('2025-05-02T06:49:20Z', '2025-05-01T06:49:20Z')).toBe(true)
  })
  it('생성 날짜가 업데이트 이전인 경우', () => {
    expect(CompareUpdateAt('2025-05-02T06:49:20Z', new Date().toISOString())).toBe(false)
  })
})
