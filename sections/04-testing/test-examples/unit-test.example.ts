// Example: Unit test for quiz utility functions
// File: lib/quiz-utils.test.ts

import { describe, it, expect } from 'vitest'
import { calculateScore, formatTime, shuffleOptions } from './quiz-utils'

describe('calculateScore', () => {
  it('calculates percentage correctly', () => {
    expect(calculateScore([0, 1, 2], [0, 1, 2])).toBe(100)
    expect(calculateScore([0, 0, 0], [0, 1, 2])).toBe(33)
    expect(calculateScore([], [])).toBe(0)
  })
})

describe('formatTime', () => {
  it('formats seconds into MM:SS', () => {
    expect(formatTime(0)).toBe('0:00')
    expect(formatTime(65)).toBe('1:05')
    expect(formatTime(3600)).toBe('60:00')
  })
})

describe('shuffleOptions', () => {
  it('returns all original options', () => {
    const options = ['A', 'B', 'C', 'D']
    const shuffled = shuffleOptions(options)
    expect(shuffled).toHaveLength(4)
    expect(shuffled.sort()).toEqual(options.sort())
  })

  it('maintains the correct answer mapping', () => {
    const options = ['Wrong', 'Wrong', 'Correct', 'Wrong']
    const { shuffled, newCorrectIndex } = shuffleOptions(options, 2)
    expect(shuffled[newCorrectIndex]).toBe('Correct')
  })
})
