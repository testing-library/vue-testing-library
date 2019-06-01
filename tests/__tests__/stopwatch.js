import StopWatch from './components/StopWatch.vue'
import { cleanup, render, wait, fireEvent } from '@testing-library/vue'
import 'jest-dom/extend-expect'

afterEach(cleanup)

test('unmounts a component', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const { unmount, isUnmounted, getByText } = render(StopWatch)
  await fireEvent.click(getByText('Start'))

  unmount()
  expect(isUnmounted()).toBe(true)

  await wait()
  expect(console.error).not.toHaveBeenCalled()
})

test('updates component state', async () => {
  const { getByTestId, getByText } = render(StopWatch)

  const startButton = getByText('Start')
  const elapsedTime = getByTestId('elapsed')

  expect(elapsedTime).toHaveTextContent('0ms')

  await fireEvent.click(startButton)
  await wait()
  await fireEvent.click(startButton)

  expect(elapsedTime).not.toHaveTextContent('0ms')
})
