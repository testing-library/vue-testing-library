import {render, userEvent} from '@testing-library/vue'
import '@testing-library/jest-dom'
import Select from './components/Select'

// In this test file we showcase several ways to interact with a Select element.
test('Select component', async () => {
  const {getByDisplayValue, getByText} = render(Select)

  // Get the Select element by using the initially displayed value.
  // One could also write `getByLabelText('Choose a dinosaur:')`
  const select = getByDisplayValue('Tyrannosaurus')
  expect(select.value).toBe('dino1')

  // Update it by manually sending a valid option value.
  // await userEvent.click(getByText(), 'dino2')
  await userEvent.selectOptions(select, ['dino2'])
  expect(select.value).toBe('dino2')

  // We can trigger an update event by directly getting the <option> element.
  await userEvent.selectOptions(select, getByText('Deinonychus'))
  expect(select.value).toBe('dino3')

  // ...even if option is within an <optgroup>.
  await userEvent.selectOptions(select, getByText('Diplodocus'))
  expect(select.value).toBe('dino4')
})
