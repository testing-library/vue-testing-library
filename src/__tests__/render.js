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

test.each([
  ['the default container', () => ({})],
  ['document.body as the container', body => ({container: body})],
])(
  'keeps document.body when a component moves its root on mount with %s',
  (_, getOptions) => {
    const body = document.body
    const originalChildCount = body.childNodes.length
    const Component = defineComponent({
      mounted() {
        body.appendChild(this.$el)
      },
      render() {
        return h('button', 'Moved button')
      },
    })

    try {
      const {getByRole} = render(Component, getOptions(body))

      expect(document.body).toBe(body)
      expect(getByRole('button', {name: 'Moved button'}).parentNode).toBe(body)

      cleanup()

      expect(body.childNodes).toHaveLength(originalChildCount)
    } finally {
      document.body = body
    }
  },
)

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
