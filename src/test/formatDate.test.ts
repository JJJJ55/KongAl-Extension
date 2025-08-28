import { describe, expect, it } from 'vitest'
import { ChangeCreateAt, ChangeDutAt, CompareDueAt, CompareUpdateAt } from '@/utils/FormatDate'

describe('ChangeCreateAt()', () => {
  // 날짜 변환 테스트
  it('nullTest', () => {
    expect(ChangeCreateAt(null)).toBe('-')
  })
  it.only('test1', () => {
    expect(ChangeCreateAt('2025-08-20T14:59:00Z')).toBe('2025-08-20')
  })
  it.only('test2', () => {
    expect(ChangeCreateAt('2025-07-02T08:55:30Z')).toBe('2025-07-02')
  })
})

describe('ChangeDutAt()', () => {
  // 마감일 테스트
  it('nullTest', () => {
    expect(ChangeDutAt(null)).toBe('-')
  })
  it('undefinedTest', () => {
    expect(ChangeDutAt(undefined)).toBe('-')
  })
  it('diffDays > 0', () => {
    expect(ChangeDutAt('2025-08-30T14:59:59Z')).toBe('마감 2일 전')
  })
  it('diffDays === 0', () => {
    expect(ChangeDutAt('2025-08-28T14:59:59Z')).toBe('오늘 오후 11:59 마감')
  })
  it('diffDays < 0', () => {
    expect(ChangeDutAt('2025-08-26T14:59:59Z')).toBe('마 감')
  })
})

describe('CompareDueAt()', () => {
  // 마감일과 업데이트날짜 비교
  it('arg1Null', () => {
    expect(CompareDueAt(null, '2025-05-02T06:49:20Z')).toBe('-')
  })
  it('arg2Null', () => {
    expect(CompareDueAt('2025-05-02T06:49:20Z', null)).toBe('-')
  })
  it('arg1 === arg2, diffDays === 0', () => {
    expect(CompareDueAt('2025-05-02T06:49:20Z', '2025-05-02T06:49:20Z')).toBe('오늘')
  })
  it('arg1 > arg2, diffDays > 0 && diffDays <= 3', () => {
    expect(CompareDueAt('2025-08-30T14:59:59Z', new Date().toISOString())).toBe('이내')
  })
  it('arg1 < arg2, diffDays > 3', () => {
    expect(CompareDueAt('2025-09-02T14:59:59Z', new Date().toISOString())).toBe('-')
  })
  it('arg1 < arg2, diffDays < 0', () => {
    expect(CompareDueAt('2025-08-20T14:59:59Z', new Date().toISOString())).toBe('-')
  })
})

describe('CompareUpdateAt()', () => {
  // 생성날짜와 업데이트날짜 비교
  it('arg1Null', () => {
    expect(CompareUpdateAt(null, '2025-05-02T06:49:20Z')).toBe(true)
  })
  it('arg2Null', () => {
    expect(CompareUpdateAt('2025-05-02T06:49:20Z', null)).toBe(true)
  })
  it('arg1 === arg2', () => {
    expect(CompareUpdateAt('2025-05-02T06:49:20Z', '2025-05-02T06:49:20Z')).toBe(true)
  })
  it('arg1 > arg2', () => {
    expect(CompareUpdateAt('2025-05-02T06:49:20Z', '2025-05-01T06:49:20Z')).toBe(true)
  })
  it('arg1 < arg2', () => {
    expect(CompareUpdateAt('2025-05-02T06:49:20Z', new Date().toISOString())).toBe(false)
  })
})
