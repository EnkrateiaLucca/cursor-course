// Example: Component test for QuizCard
// File: components/quiz-card.test.tsx

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizCard } from './quiz-card'

const mockQuestion = {
  question_text: 'What is React?',
  options: [
    'A database',
    'A JavaScript library for building UIs',
    'A CSS framework',
    'A testing tool',
  ],
  correct_answer: 1,
}

describe('QuizCard', () => {
  it('renders the question text', () => {
    render(<QuizCard question={mockQuestion} onAnswer={vi.fn()} />)
    expect(screen.getByText('What is React?')).toBeInTheDocument()
  })

  it('renders all four options', () => {
    render(<QuizCard question={mockQuestion} onAnswer={vi.fn()} />)
    mockQuestion.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })

  it('calls onAnswer with selected index when an option is clicked', () => {
    const onAnswer = vi.fn()
    render(<QuizCard question={mockQuestion} onAnswer={onAnswer} />)

    fireEvent.click(screen.getByText('A JavaScript library for building UIs'))
    expect(onAnswer).toHaveBeenCalledWith(1)
  })

  it('highlights the selected option', () => {
    render(
      <QuizCard question={mockQuestion} onAnswer={vi.fn()} selectedAnswer={1} />
    )

    const selected = screen.getByText('A JavaScript library for building UIs')
    expect(selected.closest('button')).toHaveClass('border-primary')
  })

  it('disables options after an answer is selected', () => {
    render(
      <QuizCard question={mockQuestion} onAnswer={vi.fn()} selectedAnswer={1} />
    )

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button).toBeDisabled()
    })
  })
})
