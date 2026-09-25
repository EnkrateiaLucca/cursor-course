// Example: Playwright E2E test for quiz flow
// File: e2e/quiz-flow.spec.ts

import { test, expect } from '@playwright/test'

test.describe('Quiz Flow', () => {
  test('should complete a full quiz flow', async ({ page }) => {
    // Navigate to quiz creation
    await page.goto('/quiz/new')
    await expect(page.getByRole('heading', { name: /create.*quiz/i })).toBeVisible()

    // Paste study material
    await page.getByRole('textbox').fill(
      'React is a JavaScript library for building user interfaces. ' +
      'Components are the building blocks. ' +
      'Hooks manage state and side effects.'
    )

    // Generate quiz
    await page.getByRole('button', { name: /generate/i }).click()

    // Wait for quiz to be generated (AI call may take a few seconds)
    await expect(page.getByText(/question 1/i)).toBeVisible({ timeout: 30000 })

    // Answer first question (click any option)
    await page.getByRole('button').filter({ hasText: /^[A-D]\./ }).first().click()

    // Click Next
    await page.getByRole('button', { name: /next/i }).click()

    // Verify we're on question 2
    await expect(page.getByText(/question 2/i)).toBeVisible()
  })

  test('should show results after completing all questions', async ({ page }) => {
    // Navigate to an existing quiz (seeded in test setup)
    await page.goto('/quiz/test-quiz-id')

    // Answer all questions
    for (let i = 0; i < 5; i++) {
      await page.getByRole('button').filter({ hasText: /^[A-D]\./ }).first().click()

      const nextButton = page.getByRole('button', { name: /next|finish/i })
      await nextButton.click()
    }

    // Verify results page
    await expect(page.getByText(/your score/i)).toBeVisible()
    await expect(page.getByText(/%/)).toBeVisible()
  })

  test('should handle empty input gracefully', async ({ page }) => {
    await page.goto('/quiz/new')

    // Try to generate without input
    await page.getByRole('button', { name: /generate/i }).click()

    // Should show validation error
    await expect(page.getByText(/please enter.*material/i)).toBeVisible()
  })
})
