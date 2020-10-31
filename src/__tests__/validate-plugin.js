import '@testing-library/jest-dom'

import {render, fireEvent} from '@testing-library/vue'
import VeeValidate from './components/Validate'

test('can validate using plugin', async () => {
  const {findByText, getByRole, getByTestId} = render(VeeValidate)

  // Assert error messages are not in the DOM when rendering the component.
  expect(getByTestId('error-message')).toBeEmptyDOMElement()

  const emailInput = getByRole('textbox')

  await fireEvent.touch(emailInput)

  await findByText('This field is required')

  await fireEvent.update(emailInput, 'an invalid email')
  await fireEvent.blur(emailInput)

  await findByText('This field must be a valid email')
})
