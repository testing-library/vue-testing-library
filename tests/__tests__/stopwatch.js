import StopWatch from './components/StopWatch.vue'
import { render, wait, fireEvent } from '../../src'
import 'jest-dom/extend-expect'

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
  await fireEvent.click(startButton)

  expect(elapsedTime).not.toHaveTextContent('0ms')
})
