import NumberDisplay from './components/NumberDisplay.vue'
import { render, wait } from '../../src'

test('calling render with the same component but different props does not remount', async () => {
  const { queryByTestId, updateProps } = render(NumberDisplay, { props: { number: 1 } })
  expect(queryByTestId('number-display').textContent).toBe('1')

  updateProps({ number: 2 })
  await wait()

  expect(queryByTestId('number-display').textContent).toBe('2')
  expect(queryByTestId('instance-id').textContent).toBe('1')
})
