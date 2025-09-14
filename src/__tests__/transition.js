import '@testing-library/jest-dom'

import {fireEvent, render} from '..'

import TransitionSample from './components/TransitionSample'

test('shows the text', async () => {
  // In Vue Test Utils, the <Transition> component is stubbed
  // by default, but javascript hooks are not supported.
  // If you want to test user interactions using javascript hooks,
  // you can turn off the <Transition> component stubbing
  // by setting global stubs transition to false.
  const {getByRole, findByText} = render(TransitionSample, {
    global: {
      stubs: {
        transition: false,
      },
    },
  })

  // Trigger fade in the text.
  await fireEvent.click(getByRole('button', {name: 'toggle'}))

  // If setting transition stubs, this assertion is failed
  // because javascript hooks are not called and the text is not changed.
  expect(await findByText('Completed.')).toBeVisible()
})

test('hides the text', async () => {
  // If there is no need to use JavaScript Hooks,
  // you can render with the default settings.
  const {getByRole, queryByText} = render(TransitionSample)

  // Trigger fade in the text.
  const toggleButton = getByRole('button', {name: 'toggle'})
  await fireEvent.click(toggleButton)

  // And trigger fade out the text.
  await fireEvent.click(toggleButton)

  expect(queryByText('Now fade out...')).not.toBeVisible()
})
