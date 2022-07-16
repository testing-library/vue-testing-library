import {render, fireEvent} from '..'
import '@testing-library/jest-dom'
import Form from './components/Form'

// In this test we showcase several ways of targetting DOM elements.
// However, `getByLabelText` should be your top preference when handling
// form elements.
// Read 'What queries should I use?' for additional context:
// https://testing-library.com/docs/guide-which-query
test('Review form submits', async () => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})

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
  await fireEvent.update(titleInput, fakeReview.title)

  const reviewTextarea = getByPlaceholderText('Write an awesome review')
  await fireEvent.update(reviewTextarea, fakeReview.review)

  // Rating Radio buttons.
  const initiallySelectedInput = getByLabelText('Awful')
  const ratingSelect = getByLabelText('Wonderful')

  expect(initiallySelectedInput).toBeChecked()
  expect(ratingSelect).not.toBeChecked()

  await fireEvent.update(ratingSelect)

  expect(ratingSelect).toBeChecked()
  expect(initiallySelectedInput).not.toBeChecked()

  // Get the Input element by its implicit ARIA role.
  const recommendInput = getByRole('checkbox')

  expect(recommendInput).not.toBeChecked()
  await fireEvent.update(recommendInput)
  expect(recommendInput).toBeChecked()

  // Make sure the submit button is enabled.
  expect(submitButton).toBeEnabled()
  expect(submitButton).toHaveAttribute('type', 'submit')

  await fireEvent.click(submitButton)

  // Assert the right event has been emitted.
  expect(emitted()).toHaveProperty('submit')
  expect(emitted('submit')[0][0]).toMatchObject(fakeReview)
  expect(console.warn).not.toHaveBeenCalled()
})
