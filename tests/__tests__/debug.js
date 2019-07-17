import HelloWorld from './components/HelloWorld'
import { cleanup, render } from '@testing-library/vue'

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  console.log.mockRestore()
})

test('debug pretty prints the container if no parameter is provided', () => {
  const { debug } = render(HelloWorld)

  debug()

  expect(console.log).toHaveBeenCalledTimes(1)
  expect(console.log).toHaveBeenCalledWith(
    expect.stringContaining('Hello World')
  )
  expect(console.log).toHaveBeenCalledWith(
    expect.stringContaining('Lorem ipsum dolor sit amet')
  )
})

test('debug pretty prints the provided parameter', () => {
  const { getByText, debug } = render(HelloWorld)

  // debug accepts a DOM node as a parameter.
  debug(getByText('Lorem ipsum dolor sit amet'))

  expect(console.log).toHaveBeenCalledTimes(1)
  expect(console.log).toHaveBeenCalledWith(
    expect.stringContaining('Lorem ipsum dolor sit amet')
  )

  // Notice the 'not' particle
  expect(console.log).not.toHaveBeenCalledWith(
    expect.stringContaining('Hello World')
  )
})
