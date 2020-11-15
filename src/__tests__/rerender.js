import '@testing-library/jest-dom'
import {defineComponent, h, computed} from 'vue'
import {render} from '@testing-library/vue'
import NumberDisplay from './components/NumberDisplay'

// It'd probably be better if you test the component that's doing the rerendering
// to ensure that the rerendered component is being updated correctly.
// That said, if you'd prefer to, for example, update the props of a rendered
// component, this function can be used to do so.
test('calling rerender remounts the component and updates the props', () => {
  const {rerender, getByTestId} = render(NumberDisplay, {
    props: {number: 1},
  })

  expect(getByTestId('number-display')).toHaveTextContent('1')

  rerender({props: {number: 3}})
  expect(getByTestId('number-display')).toHaveTextContent('3')

  rerender({props: {number: 5}})
  expect(getByTestId('number-display')).toHaveTextContent('5')

  // Assert that, after rerendering and updating props, the component has been remounted,
  // meaning we are testing a different component instance than we rendered initially.
  expect(getByTestId('instance-id')).toHaveTextContent('3')
})

test('rerender works with composition API', () => {
  const Component = defineComponent({
    props: {
      foo: {type: String, default: 'foo'},
    },
    setup(props) {
      const foobar = computed(() => `${props.foo}-bar`)
      return () =>
        h(
          'div',
          {'data-testid': 'node'},
          `Foo is: ${props.foo}. Foobar is: ${foobar.value}`,
        )
    },
  })

  const {rerender, getByTestId} = render(Component)

  const originalNode = getByTestId('node')
  expect(originalNode).toHaveTextContent('Foo is: foo. Foobar is: foo-bar')

  rerender({props: {foo: 'qux'}})

  const newNode = getByTestId('node')
  expect(newNode).toHaveTextContent('Foo is: qux. Foobar is: qux-bar')
})
