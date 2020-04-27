import '@testing-library/jest-dom'
import {render} from '@testing-library/vue'
import NumberDisplay from './components/NumberDisplay.vue'

// It'd probably be better if you test the component that's doing the prop
// updating to ensure that the props are being updated correctly.
// That said, if you'd prefer to update the props of a rendered component, this
// function can be used to update props of the rendered component.
test('calling render with the same component but different props does not remount', async () => {
  const {getByTestId, setProps} = render(NumberDisplay, {
    props: {number: 1},
  })

  expect(getByTestId('number-display')).toHaveTextContent('1')

  await setProps({number: 2})

  expect(getByTestId('number-display')).toHaveTextContent('2')

  // Assert that, even after updating props, the component hasn't remounted,
  // meaning we are testing the same component instance we rendered initially.
  expect(getByTestId('instance-id')).toHaveTextContent('1')
})
