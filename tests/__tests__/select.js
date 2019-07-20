import { render, fireEvent } from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import Select from './components/Select'

// There are several ways to interact with a Select component.
test('Select component', async () => {
  const { getByDisplayValue, getByText } = render(Select)

  // Get the Select element by using the initially displayed value.
  const select = getByDisplayValue('Tyrannosaurus')

  // Assert initial value
  expect(select.value).toBe('dino1')

  // Update it by manually sending an option value
  await fireEvent.update(select, 'dino2')
  expect(select.value).toBe('dino2')

  // We can also get the option value from the element itself
  await fireEvent.update(select, getByText('Tyrannosaurus').value)
  expect(select.value).toBe('dino1')

  // We can trigger an update event by directly getting the <option> element
  await fireEvent.update(getByText('Deinonychus'))
  expect(select.value).toBe('dino3')

  // ...even if option is within an <optgroup>
  await fireEvent.update(getByText('Diplodocus'))
  expect(select.value).toBe('dino4')
})
