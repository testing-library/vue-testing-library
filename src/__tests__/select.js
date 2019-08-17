import {render, fireEvent} from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import Select from './components/Select'

// In this test file we showcase several ways to interact with a Select element
test('Select component', async () => {
  let optionElement
  const {getByDisplayValue, getByText} = render(Select)

  // Get the Select element by using the initially displayed value
  const select = getByDisplayValue('Tyrannosaurus')
  expect(select.value).toBe('dino1')

  // Update it by manually sending a valid option value
  await fireEvent.update(select, 'dino2')
  expect(select.value).toBe('dino2')

  // We can trigger an update event by directly getting the <option> element
  optionElement = getByText('Deinonychus')
  await fireEvent.update(optionElement)
  expect(select.value).toBe('dino3')

  // ...even if option is within an <optgroup>
  optionElement = getByText('Diplodocus')
  await fireEvent.update(optionElement)
  expect(select.value).toBe('dino4')
})
