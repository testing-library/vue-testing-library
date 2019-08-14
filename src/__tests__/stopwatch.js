import {render, wait, fireEvent} from '@testing-library/vue'
import StopWatch from './components/StopWatch.vue'
import '@testing-library/jest-dom/extend-expect'

test('unmounts a component', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const {unmount, isUnmounted, getByText} = render(StopWatch)
  await fireEvent.click(getByText('Start'))

  // Destroys a Vue component instance.
  unmount()

  expect(isUnmounted()).toBe(true)

  await wait()

  expect(console.error).not.toHaveBeenCalled()
})

test('updates component state', async () => {
  const {getByTestId, getByText} = render(StopWatch)

  const startButton = getByText('Start')
  const elapsedTime = getByTestId('elapsed')

  // Assert initial state.
  expect(elapsedTime).toHaveTextContent('0ms')
  getByText('Start')

  await fireEvent.click(startButton)

  getByText('Stop')

  // Wait for one tick of the event loop.
  await wait()

  // Stop the timer.
  await fireEvent.click(startButton)

  // We can't assert a specific amount of time. Instead, we assert that the
  // content has changed.
  expect(elapsedTime).not.toHaveTextContent('0ms')
})
