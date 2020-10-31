import '@testing-library/jest-dom'
import {render, waitFor, fireEvent} from '@testing-library/vue'
import StopWatch from './components/StopWatch.vue'

const sleep = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

test('updates component state', async () => {
  const {getByTestId, getByText} = render(StopWatch)

  const startButton = getByText('Start')
  const elapsedTime = getByTestId('elapsed')

  // Assert initial state.
  expect(elapsedTime).toHaveTextContent('0ms')
  expect(getByText('Start')).toBeInTheDocument()

  await fireEvent.click(startButton)

  expect(getByText('Stop')).toBeInTheDocument()

  // Wait for one tick of the event loop.
  await waitFor(() => {
    expect(elapsedTime).not.toHaveTextContent('0ms')
  })
  const timeBeforeStop = elapsedTime.textContent

  // Stop the timer.
  await fireEvent.click(startButton)

  // Wait for a few milliseconds
  await sleep(5)

  // We can't assert a specific amount of time. Instead, we assert that the
  // content has changed.
  expect(elapsedTime).toHaveTextContent(timeBeforeStop)
})
