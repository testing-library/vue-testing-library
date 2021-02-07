import {render} from '..'

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  console.warn.mockRestore()
})

test('warns on deprecated store option', () => {
  const Component = {template: `<div></div>`}

  render(Component, {
    store: 'anything',
  })

  expect(console.warn).toHaveBeenCalledTimes(1)
  expect(console.warn).toHaveBeenCalledWith(
    expect.stringContaining(
      `Providing 'store' or 'routes' options is now deprecated`,
    ),
  )
})

test('warns on deprecated routes option', () => {
  const Component = {template: `<div></div>`}

  render(Component, {
    routes: 'anything',
  })

  expect(console.warn).toHaveBeenCalledTimes(1)
  expect(console.warn).toHaveBeenCalledWith(
    expect.stringContaining(
      `Providing 'store' or 'routes' options is now deprecated`,
    ),
  )
})
