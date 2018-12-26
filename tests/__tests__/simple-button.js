import { render, cleanup, fireEvent } from '../../src';
import SimpleButton from './components/Button';

afterEach(cleanup)

test('renders button with text', () => {
  const buttonText = "Click me; I'm sick"
  const { getByText } = render(SimpleButton, {
    props: { text: buttonText, clicked: () => true }
  })

  getByText(buttonText)
})

test('clicked prop is called when button is clicked', () => {
  const clicked = jest.fn()
  const text = 'Click me'
  const { getByText } = render(SimpleButton, {
    props: { text, clicked }
  })
  fireEvent.click(getByText(text))
  expect(clicked).toBeCalled()
})