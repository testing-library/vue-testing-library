import VeeValidate from 'vee-validate'

import { render, fireEvent } from '../../src'
import Validate from './components/Validate'

test('can validate using plugin', async () => {
  const { getByPlaceholderText, queryByTestId } = render(Validate, {},
    vue => vue.use(VeeValidate, { events: 'blur' }))

  const usernameInput = getByPlaceholderText('Username...')
  await fireEvent.touch(usernameInput)

  expect(queryByTestId('username-errors').textContent).toBe('The username field is required.')
})
