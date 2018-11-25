import { render, Simulate } from '../../src'
import Login from './components/Login'

test('login form submits', async () => {
  const fakeUser = { username: 'jackiechan', password: 'hiya! 🥋' }
  const handleSubmit = jest.fn()
  const { getByText, updateState } = render(
    Login, { props: { onSubmit: handleSubmit } }
  )

  const submitButtonNode = getByText('Submit')

  // Act - this is waiting on an issue in @vue/test-utils to allow v-model to be updated by
  // changes to DOM elements
  updateState(fakeUser)

  // NOTE: in jsdom, it's not possible to trigger a form submission
  // by clicking on the submit button. This is really unfortunate.
  // So the next best thing is to simulate a submit on the form itself
  // then ensure that there's a submit button.
  Simulate.click(submitButtonNode)

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  // make sure the form is submittable
  expect(submitButtonNode.type).toBe('submit')
})
