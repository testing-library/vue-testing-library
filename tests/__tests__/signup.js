import { render, fireEvent } from '@testing-library/vue'
import 'jest-dom/extend-expect'
import Signup from './components/Signup'

test('signup form submits', async () => {
  const fakeUser = {
    username: 'jackiechan',
    password: 'hiya! 🥋',
    about: 'Lorem ipsum dolor sit amet',
    selected: 'None of the above',
    rememberMe: true
  }

  const { getByLabelText, getByText, emitted } = render(Signup)

  const submitButton = getByText('Submit')

  // Initially the form should be disabled
  expect(submitButton).toBeDisabled()

  const userNameInput = getByLabelText('Username')
  await fireEvent.update(userNameInput, fakeUser.username)

  const passwordInput = getByLabelText('Password')
  await fireEvent.update(passwordInput, fakeUser.password)

  const aboutMeTextarea = getByLabelText('About Me')
  await fireEvent.update(aboutMeTextarea, fakeUser.about)

  const rememberMeInput = getByLabelText('Remember Me')
  await fireEvent.update(rememberMeInput, fakeUser.rememberMe)

  const preferenceSelect = getByLabelText('I prefer...')
  await fireEvent.update(preferenceSelect, fakeUser.selected)

  // NOTE: in jsdom, it's not possible to trigger a form submission
  // by clicking on the submit button. This is really unfortunate.
  // So the next best thing is to fireEvent a submit on the form itself
  // then ensure that there's a submit button.
  expect(submitButton).toBeEnabled()
  expect(submitButton).toHaveAttribute('type', 'submit')
  await fireEvent.click(submitButton)

  // Assert event has been emitted.
  expect(emitted().submit).toHaveLength(1)
  expect(emitted().submit[0]).toEqual([ fakeUser ])
})
