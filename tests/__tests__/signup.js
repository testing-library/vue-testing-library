import { render, fireEvent } from '@testing-library/vue'
import 'jest-dom/extend-expect'
import Signup from './components/Signup'

test('signup form submits', async () => {
  const fakeUser = {
    username: 'jackiechan',
    about: 'Lorem ipsum dolor sit amet',
    selected: 'None of the above',
    rememberMe: true
  }

  const {
    getByLabelText,
    getByText,
    getByTestId,
    getByDisplayValue,
    getByPlaceholderText,
    emitted
  } = render(Signup)

  const submitButton = getByText('Submit')

  // Initially the form should be disabled
  expect(submitButton).toBeDisabled()

  // We are gonna showcase several ways of targetting DOM elements.
  // However, `getByLabelText` should be your top preference when handling
  // form elements.
  //
  // Read 'What queries should I use?' for additional context:
  // https://testing-library.com/docs/guide-which-query
  const userNameInput = getByLabelText(/username/i)
  await fireEvent.update(userNameInput, fakeUser.username)

  const aboutMeTextarea = getByPlaceholderText('I was born in...')
  await fireEvent.update(aboutMeTextarea, fakeUser.about)

  const rememberMeInput = getByTestId('remember-input')
  await fireEvent.update(rememberMeInput, fakeUser.rememberMe)

  // Get the Select element by using the initially displayed value.
  const preferenceSelect = getByDisplayValue('Dogs')
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
