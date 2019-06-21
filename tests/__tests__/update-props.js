import NumberDisplay from './components/NumberDisplay.vue'
import { render } from '@testing-library/vue'
import 'jest-dom/extend-expect'

test('calling render with the same component but different props does not remount', async () => {
  const { getByTestId, updateProps } = render(NumberDisplay, {
    props: { number: 1 }
  })

  expect(getByTestId('number-display')).toHaveTextContent('1')

  await updateProps({ number: 2 })

  expect(getByTestId('number-display')).toHaveTextContent('2')

  // Assert that, even after updating props, the component hasn't remounted,
  // meaning we are testing the same component instance we rendered initially.
  expect(getByTestId('instance-id')).toHaveTextContent('1')
})
