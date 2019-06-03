import { render, fireEvent } from '@testing-library/vue'
import Login from './components/Login'

test('login form submits', async () => {
  const fakeUser = { username: 'jackiechan', password: 'hiya! 🥋', rememberMe: true }
  const handleSubmit = jest.fn()
  const { getByLabelText, getByText } = render(
    Login, { props: { onSubmit: handleSubmit } }
  )

  const submitButtonNode = getByText('Submit')

  const userNameInput = getByLabelText('Username')
  await fireEvent.update(userNameInput, fakeUser.username)

  const passwordInput = getByLabelText('Password')
  await fireEvent.update(passwordInput, fakeUser.password)

  const rememberMeInput = getByLabelText('Remember Me')
  await fireEvent.update(rememberMeInput, true)

  // NOTE: in jsdom, it's not possible to trigger a form submission
  // by clicking on the submit button. This is really unfortunate.
  // So the next best thing is to fireEvent a submit on the form itself
  // then ensure that there's a submit button.
  await fireEvent.click(submitButtonNode)

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  // make sure the form is submittable
  expect(submitButtonNode.type).toBe('submit')
})
