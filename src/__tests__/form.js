import Vue from 'vue'
import { render, Simulate } from '../'
import Login from './components/Login'

test('login form submits', () => {
  const fakeUser = {username: 'jackiechan', password: 'hiya! 🥋'}
  const handleSubmit = jest.fn()
  const {wrapper, getByLabelText, getByText} = render(
    Login, { props: { onSubmit: handleSubmit } }
  )

  const usernameNode = getByLabelText('username')
  const passwordNode = getByLabelText('password')
  const formNode = wrapper.find('form')
  const submitButtonNode = getByText('submit')

  // Act
  wrapper.setData(fakeUser)

  // NOTE: in jsdom, it's not possible to trigger a form submission
  // by clicking on the submit button. This is really unfortunate.
  // So the next best thing is to simulate a submit on the form itself
  // then ensure that there's a submit button.
  Simulate.submit(formNode)

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  // make sure the form is submittable
  expect(submitButtonNode.type).toBe('submit')
})
