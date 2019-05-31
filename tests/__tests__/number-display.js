import NumberDisplay from './components/NumberDisplay.vue'
import { render } from 'vue-testing-library'
import 'jest-dom/extend-expect'

test('calling render with the same component but different props does not remount', async () => {
  const { queryByTestId, updateProps } = render(NumberDisplay, { props: { number: 1 } })
  expect(queryByTestId('number-display')).toHaveTextContent('1')

  await updateProps({ number: 2 })

  expect(queryByTestId('number-display')).toHaveTextContent('2')
  expect(queryByTestId('instance-id')).toHaveTextContent('1')
})
