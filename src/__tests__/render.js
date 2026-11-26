import {h, defineComponent} from 'vue'
import '@testing-library/jest-dom'
import {render, cleanup} from '..'

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

test.each([
  ['the default container', {}],
  ['document.body', {container: document.body}],
])('preserves focus set on mount with %s', (_, options) => {
  const {getByRole} = render(
    {
      mounted() {
        this.$refs.button.focus()
      },
      template: '<div><button ref="button">Continue</button></div>',
    },
    options,
  )

  expect(getByRole('button', {name: 'Continue'})).toHaveFocus()
})

test('keeps focus moved elsewhere while unwrapping the mount element', () => {
  const target = document.body.appendChild(document.createElement('button'))

  customElements.define(
    'vtl-focus-on-connect',
    class extends HTMLElement {
      connectedCallback() {
        target.focus()
      }
    },
  )

  try {
    render({
      mounted() {
        this.$refs.button.focus()
      },
      render() {
        return h('vtl-focus-on-connect', [
          h('button', {ref: 'button'}, 'Continue'),
        ])
      },
    })

    expect(target).toHaveFocus()
  } finally {
    target.remove()
  }
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

test('unmounts when no wrapper element is present', () => {
  const Comp = defineComponent((_, ctx) => () => ctx.slots.default?.())

  const {unmount} = render({
    render: () => h(Comp, () => h('div')),
  })

  unmount()

  expect(() => cleanup()).not.toThrow()
})
