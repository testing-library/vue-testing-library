import { render, wait } from '../'
import EndToEnd from './components/EndToEnd'

test('it waits for the data to be loaded', async () => {
  const {queryByText, queryByTestId} = render(EndToEnd)

  expect(queryByText('Loading...')).toBeTruthy()

  await wait(() => expect(queryByText('Loading...')).toBeNull())
  expect(queryByTestId('message').textContent).toMatch(/Hello World/)
})