import StopWatch from './components/StopWatch.vue'
import { render, wait, fireEvent } from '../../src'

test('unmounts a component', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const { unmount, isUnmounted, getByText } = render(StopWatch)
  fireEvent.click(getByText('Start'))

  await wait()

  unmount()
  expect(isUnmounted()).toBe(true)

  await wait()
  expect(console.error).not.toHaveBeenCalled()
})

test('updates component state', async () => {
  const { getByTestId, getByText } = render(StopWatch)

  const startButton = getByText('Start')
  const elapsedTime = getByTestId('elapsed')

  expect(elapsedTime.textContent).toBe('0ms')

  fireEvent.click(startButton)
  await wait()
  fireEvent.click(startButton)

  expect(elapsedTime.textContent).not.toBe('0ms')
})
