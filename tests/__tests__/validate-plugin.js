import VeeValidate from 'vee-validate'
import 'jest-dom/extend-expect'

import { render, fireEvent } from '../../src'
import Validate from './components/Validate'

test('can validate using plugin', async () => {
  const { getByPlaceholderText, queryByTestId } = render(Validate, {},
    vue => vue.use(VeeValidate, { events: 'blur' }))

  const usernameInput = getByPlaceholderText('Username...')
  await fireEvent.touch(usernameInput)

  expect(queryByTestId('username-errors')).toHaveTextContent('The username field is required.')
})
