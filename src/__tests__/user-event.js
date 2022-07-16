import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {render, waitFor} from '..'
import Form from './components/Form'
import Select from './components/Select'

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
  expect(titleInput).toHaveValue(fakeReview.title)

  const textArea = getByLabelText(/Your review/i)
  userEvent.type(textArea, 'The t-rex went insane!')
  expect(textArea).toHaveValue('The t-rex went insane!')

  userEvent.clear(textArea)
  expect(textArea).toHaveValue('')
  userEvent.type(textArea, fakeReview.review)
  expect(textArea).toHaveValue(fakeReview.review)

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
  expect(emitted('submit')[0][0]).toMatchObject(fakeReview)

  expect(console.warn).not.toHaveBeenCalled()
})

test('selecting option with user events', () => {
  const {getByDisplayValue} = render(Select)
  const select = getByDisplayValue('Tyrannosaurus')
  expect(select).toHaveValue('dino1')

  userEvent.selectOptions(select, 'dino2')
  expect(select).toHaveValue('dino2')

  userEvent.selectOptions(select, 'dino3')
  expect(select).not.toHaveValue('dino2')
  expect(select).toHaveValue('dino3')
})
