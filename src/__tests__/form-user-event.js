/* eslint-enable testing-library/prefer-user-event */
import '@testing-library/jest-dom'
import {render, waitFor} from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Form from './components/Form'

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  console.warn.mockRestore()
})

test('User events in a form', async () => {
  const fakeReview = {
    title: 'An Awesome Movie',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: '3',
  }
  const {getByText, getByLabelText, emitted} = render(Form)

  const submitButton = getByText('Submit')
  expect(submitButton).toBeDisabled()

  const titleInput = getByLabelText(/title of the movie/i)
  userEvent.type(titleInput, fakeReview.title)
  expect(titleInput.value).toEqual(fakeReview.title)

  const textArea = getByLabelText(/Your review/i)
  userEvent.type(textArea, 'The t-rex went insane!')
  expect(textArea.value).toEqual('The t-rex went insane!')

  userEvent.clear(textArea)
  expect(textArea.value).toEqual('')
  userEvent.type(textArea, fakeReview.review)
  expect(textArea.value).toEqual(fakeReview.review)

  const initialSelectedRating = getByLabelText(/Awful/i)
  const wonderfulRadioInput = getByLabelText(/Wonderful/i)
  expect(initialSelectedRating).toBeChecked()
  expect(wonderfulRadioInput).not.toBeChecked()

  userEvent.click(wonderfulRadioInput)
  expect(wonderfulRadioInput).toBeChecked()
  await waitFor(() => expect(initialSelectedRating).not.toBeChecked())

  const recommendInput = getByLabelText(/Would you recommend this movie?/i)
  userEvent.click(recommendInput)
  expect(recommendInput).toBeChecked()

  userEvent.tab()
  expect(submitButton).toHaveFocus()
  expect(submitButton).toBeEnabled()
  userEvent.type(submitButton, '{enter}')
  expect(emitted().submit[0][0]).toMatchObject(fakeReview)

  expect(console.warn).not.toHaveBeenCalled()
})
