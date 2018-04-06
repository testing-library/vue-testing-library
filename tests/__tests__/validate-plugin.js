import Vue from 'vue'
import VeeValidate from 'vee-validate'

import { render, Simulate, wait } from '../../src'
import '../../src/extend-expect'
import Validate from './components/Validate'

test('can validate using plugin', async () => {
  const { getByPlaceholderText, queryByTestId } = render(Validate, {},
    vue => vue.use(VeeValidate, { events: 'blur' }))

  const usernameInput = getByPlaceholderText('Username...')
  Simulate.focus(usernameInput)
  Simulate.blur(usernameInput)

  await wait()

  expect(queryByTestId('username-errors')).toBeInTheDOM()
})
