import { render, wait } from '../../src'
import EndToEnd from './components/EndToEnd'

test('it waits for the data to be loaded', async () => {
  const { html, queryByText, queryByTestId } = render(EndToEnd)

  expect(queryByText('Loading...')).toBeTruthy()

  await wait(() => expect(queryByText('Loading...')).toBeNull())
  expect(queryByTestId('message').textContent).toMatch(/Hello World/)
})