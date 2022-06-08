import '@testing-library/jest-dom'

import {render, fireEvent} from '..'
import VeeValidate from './components/Validate'

test('can validate using plugin', async () => {
  const {findByText, getByRole, queryByTestId} = render(VeeValidate)

  // Assert error messages are not in the DOM when rendering the component.
  expect(queryByTestId('error-message')).not.toBeInTheDocument()

  const emailInput = getByRole('textbox')

  await fireEvent.touch(emailInput)

  expect(await findByText('This field is required')).toBeInTheDocument()

  await fireEvent.update(emailInput, 'an invalid email')
  await fireEvent.blur(emailInput)

  expect(
    await findByText('This field must be a valid email'),
  ).toBeInTheDocument()
})
