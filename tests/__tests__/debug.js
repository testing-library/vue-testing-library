import HelloWorld from './components/HelloWorld'
import { cleanup, render } from '../../src'

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  console.log.mockRestore()
})

test('debug pretty prints the container', () => {
  const { debug } = render(HelloWorld)
  debug()
  expect(console.log).toHaveBeenCalledTimes(1)
  expect(console.log).toHaveBeenCalledWith(
    expect.stringContaining('Hello World')
  )
})
