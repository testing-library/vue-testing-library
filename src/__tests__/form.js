import {render, userEvent} from '@testing-library/vue'
import '@testing-library/jest-dom'
import Form from './components/Form'

// In this test we showcase several ways of targeting DOM elements.
// However, `getByLabelText` should be your top preference when handling
// form elements.
// Read 'What queries should I use?' for additional context:
// https://testing-library.com/docs/guide-which-query
test('Review form submits', async () => {
  const fakeReview = {
    title: 'An Awesome Movie',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: '3',
  }

  const {
    getByLabelText,
    getByText,
    getByRole,
    getByPlaceholderText,
    emitted,
  } = render(Form)

  const submitButton = getByText('Submit')

  // Initially the submit button should be disabled.
  expect(submitButton).toBeDisabled()

  const titleInput = getByLabelText(/title of the movie/i)
  await userEvent.type(titleInput, fakeReview.title)

  const reviewTextarea = getByPlaceholderText('Write an awesome review')
  await userEvent.type(reviewTextarea, fakeReview.review)

  // Rating Radio buttons.
  const initiallySelectedInput = getByLabelText('Awful')
  const ratingSelect = getByLabelText('Wonderful')

  expect(initiallySelectedInput.checked).toBe(true)
  expect(ratingSelect.checked).toBe(false)

  await userEvent.click(ratingSelect)

  expect(ratingSelect.checked).toBe(true)
  expect(initiallySelectedInput.checked).toBe(false)

  // Get the Input element by its implicit ARIA role.
  const recommendInput = getByRole('checkbox')

  expect(recommendInput.checked).toBe(false)
  await userEvent.click(recommendInput)
  expect(recommendInput.checked).toBe(true)

  // Make sure the submit button is enabled.
  expect(submitButton).toBeEnabled()
  expect(submitButton).toHaveAttribute('type', 'submit')

  await userEvent.click(submitButton)

  // Assert the right event has been emitted.
  expect(emitted()).toHaveProperty('submit')
  expect(emitted().submit[0][0]).toMatchObject(fakeReview)
})
