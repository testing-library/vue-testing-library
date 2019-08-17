import { render, waitForElementToBeRemoved } from '@testing-library/vue'
import Disappearance from './components/Disappearance'
import '@testing-library/jest-dom/extend-expect'

test('waits for the data to be loaded', async () => {
  const { getByText, queryByText, queryByTestId } = render(Disappearance)

  // Assert initial state
  getByText('Loading...')
  expect(queryByText(/Loaded this message/)).not.toBeInTheDocument()

  // Line reads as follows: "Wait until element with text 'Loading...' is gone."
  await waitForElementToBeRemoved(() => queryByText('Loading...'))
  // It is equivalent to:
  //
  // await wait(() => {
  //   expect(queryByText('Loading...')).not.toBeInTheDocument()
  // })
  //
  // `wait()` waits until the callback function passes or times out.

  // After 'Loading...' is gone, we can assert that fetched data is rendered.
  expect(queryByTestId('message')).toHaveTextContent(/Hello World/)

  // Read more about async utilities:
  // https://testing-library.com/docs/dom-testing-library/api-async
})
