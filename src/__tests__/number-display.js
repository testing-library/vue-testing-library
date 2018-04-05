import NumberDisplay from './components/NumberDisplay.vue'
import { render } from '../'

test('calling render with the same component but different props does not remount', () => {
  const { queryByTestId, updateProps } = render(NumberDisplay, { props: { number: 1 } })
  expect(queryByTestId('number-display').textContent).toBe('1')

  updateProps({ number: 2 })
  expect(queryByTestId('number-display').textContent).toBe('2')
  expect(queryByTestId('instance-id').textContent).toBe('1')
})
