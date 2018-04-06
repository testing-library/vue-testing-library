import Vue from 'vue'
import StopWatch from './components/StopWatch.vue'
import { render, select, Simulate } from '../../src'

const wait = time => new Promise(resolve => setTimeout(resolve, time))

test('unmounts a component', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const { unmount, isUnmounted, getByText, wrapper } = render(StopWatch)
  Simulate.click(getByText('start'))

  unmount()
  expect(isUnmounted()).toBe(true)

  await wait()
  expect(console.error).not.toHaveBeenCalled()
})
