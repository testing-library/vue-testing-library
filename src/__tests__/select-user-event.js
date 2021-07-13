/* eslint-enable testing-library/prefer-user-event */
import '@testing-library/jest-dom'
import {render} from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Select from './components/Select'

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  console.warn.mockRestore()
})

test('selecting option with user events', () => {
  const {getByDisplayValue} = render(Select)
  const select = getByDisplayValue('Tyrannosaurus')
  expect(select.value).toBe('dino1')

  userEvent.selectOptions(select, 'dino2')
  expect(select.value).toBe('dino2')

  userEvent.selectOptions(select, 'dino3')
  expect(select.value).not.toBe('dino2')
  expect(select.value).toBe('dino3')
})
