import Vue from 'vue'
import StopWatch from './components/StopWatch.vue'
import { render, select, Simulate } from '../'

const wait = time => new Promise(resolve => setTimeout(resolve, time))

test('unmounts a component', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const { unmount, getByText, wrapper } = render(StopWatch)
  Simulate.click(getByText('start'))

  unmount()
  expect(wrapper.vm._isDestroyed).toBe(true)

  await wait()
  expect(console.error).not.toHaveBeenCalled()
})
