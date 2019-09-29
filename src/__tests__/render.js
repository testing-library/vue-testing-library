import {render} from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'

test('returns baseElement which defaults to document.body', () => {
  const {baseElement} = render({template: '<div />'})
  expect(baseElement).toBe(document.body)
})

test('returns custom baseElement', () => {
  const {baseElement} = render(
    {
      template: '<div />',
    },
    {
      baseElement: document.createElement('blink'),
    },
  )

  expect(baseElement).toMatchInlineSnapshot(`
    <blink>
      <div>
        <div />
      </div>
    </blink>
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
