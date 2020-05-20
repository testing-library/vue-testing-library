test.todo('Your test suite must contain at least one test.')

// // Notice this example is using vee-validate v2.X
// import VeeValidate from 'vee-validate'
// import '@testing-library/jest-dom'

// import {render, fireEvent} from '@testing-library/vue'
// import Validate from './components/Validate'

// test('can validate using plugin', async () => {
//   // The third argument of `render` is a callback function that receives the
//   // Vue instance as a parameter. This way, we can register plugins such as
//   // VeeValidate.
//   const {getByPlaceholderText, queryByTestId, getByTestId} = render(
//     Validate,
//     {},
//     vue => vue.use(VeeValidate, {events: 'blur'}),
//   )

//   // Assert error messages are not in the DOM when rendering the component.
//   expect(queryByTestId('username-errors')).toBeNull()

//   const usernameInput = getByPlaceholderText('Username...')
//   await fireEvent.touch(usernameInput)

//   // After "touching" the input (focusing and blurring), validation error
//   // should appear.
//   expect(getByTestId('username-errors')).toHaveTextContent(
//     /the username field is required/i,
//   )
// })
