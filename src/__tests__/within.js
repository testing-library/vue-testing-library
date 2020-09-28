import {render, within} from '@testing-library/vue'

test('within() returns an object with all queries bound to the DOM node', () => {
  const {getByTestId, getByText} = render({
    template: `
      <div>
        <p>repeated text</p>
        <div data-testid="div">repeated text</div>
      </div>
    `,
  })

  // getByText() provided by render() fails because it finds multiple elements
  // with the same text (as expected).
  expect(() => getByText('repeated text')).toThrow(
    'Found multiple elements with the text: repeated text',
  )

  const divNode = getByTestId('div')

  // within() returns queries bound to the provided DOM node, so the following
  // assertion passes. Notice how we are not using the getByText() function
  // provided by render(), but the one coming from within().
  // eslint-disable-next-line testing-library/prefer-explicit-assert
  within(divNode).getByText('repeated text')

  // Here, proof that there's only one match for the specified text.
  expect(divNode).toMatchInlineSnapshot(`
    <div
      data-testid="div"
    >
      repeated text
    </div>
  `)
})
