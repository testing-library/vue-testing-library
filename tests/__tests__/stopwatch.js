import StopWatch from './components/StopWatch.vue'
import { render, wait, Simulate } from '../../src'

test('unmounts a component', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const { unmount, isUnmounted, getByText } = render(StopWatch)
  Simulate.click(getByText('start'))

  await wait()

  unmount()
  expect(isUnmounted()).toBe(true)

  await wait()
  expect(console.error).not.toHaveBeenCalled()
})

test('updates component state', async () => {
  const { getByTestId, getByText } = render(StopWatch)

  const startButton = getByText('start')
  const elapsedTime = getByTestId('elapsed')

  expect(elapsedTime.textContent).toBe('0ms')

  Simulate.click(startButton)
  await wait()
  Simulate.click(startButton)

  expect(elapsedTime.textContent).not.toBe('0ms')
})
