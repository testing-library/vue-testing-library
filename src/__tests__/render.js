import {render} from '@testing-library/vue'
import '@testing-library/jest-dom'

test('baseElement defaults to document.body', () => {
  const {baseElement} = render({template: '<div />'})
  expect(baseElement).toBe(document.body)
})

test('renders custom baseElement', () => {
  const Component = {template: '<span />'}

  const {baseElement, container} = render(Component, {
    baseElement: document.createElement('blink'),
  })

  expect(baseElement).toMatchInlineSnapshot(`
    <blink>
      <div>
        <span />
      </div>
    </blink>
  `)

  expect(container).toMatchInlineSnapshot(`
    <div>
      <span />
    </div>
  `)
})

test('renders container', () => {
  const {container, getByTestId} = render({
    template: '<div data-testid="myDiv">my content</div>',
  })

  expect(container.firstChild).toHaveTextContent(
    getByTestId('myDiv').textContent,
  )
})

test('container defaults to div', () => {
  const {container} = render({template: '<div />'})

  expect(container.tagName).toBe('DIV')
})

test('renders custom container', () => {
  const blink = document.createElement('blink')
  const Component = {template: '<div />'}

  const {container} = render(Component, {
    container: document.body.appendChild(blink),
  })

  expect(container).toBe(blink)
})

test('baseElement matches container if not custom baseElement is provided', () => {
  const blink = document.createElement('blink')
  const Component = {template: '<div />'}

  const {container, baseElement} = render(Component, {
    container: document.body.appendChild(blink),
  })

  expect(container).toMatchInlineSnapshot(`
    <blink>
      <div />
    </blink>
  `)

  expect(baseElement).toMatchInlineSnapshot(`
    <blink>
      <div />
    </blink>
  `)
})

test('unmounts', () => {
  const {getByTestId, unmount, queryByTestId} = render({
    template: `<div data-testid="node">Hi</div>`,
  })

  expect(getByTestId('node')).toBeInTheDocument()

  unmount()

  expect(queryByTestId('node')).not.toBeInTheDocument()
})
