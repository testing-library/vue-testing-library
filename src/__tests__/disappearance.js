import {render, waitForElementToBeRemoved} from '..'
import Disappearance from './components/Disappearance'
import '@testing-library/jest-dom'

test('waits for the data to be loaded', async () => {
  const {getByText, queryByText, queryByTestId} = render(Disappearance)

  // Assert initial state
  expect(getByText('Loading...')).toBeInTheDocument()
  expect(queryByText(/Loaded this message/)).not.toBeInTheDocument()

  // Following line reads as follows:
  // "Wait until element with text 'Loading...' is gone."
  await waitForElementToBeRemoved(getByText('Loading...'))
  // It is equivalent to:
  //
  // await waitFor(() => {
  //   expect(queryByText('Loading...')).not.toBeInTheDocument()
  // })

  // After 'Loading...' is gone, we can assert that fetched data is rendered.
  expect(queryByTestId('message')).toHaveTextContent(/Hello World/)

  // Read more about async utilities:
  // https://testing-library.com/docs/dom-testing-library/api-async
})
