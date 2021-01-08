import '@testing-library/jest-dom'
import {defineComponent, h, computed} from 'vue'
import {render} from '..'
import NumberDisplay from './components/NumberDisplay'

// It'd probably be better if you test the component that's doing the rerendering
// to ensure that the rerendered component is being updated correctly.
// That said, if you'd prefer to, for example, update the props of a rendered
// component, this function can be used to do so.
test('rerender re-renders the element', async () => {
  const {rerender, getByTestId} = render(NumberDisplay, {
    props: {number: 1},
  })

  expect(getByTestId('number-display')).toHaveTextContent('1')

  await rerender({number: 3})
  expect(getByTestId('number-display')).toHaveTextContent('3')

  await rerender({number: 5})
  expect(getByTestId('number-display')).toHaveTextContent('5')

  // Notice we don't remount a different instance
  expect(getByTestId('instance-id')).toHaveTextContent('1')
})

test('rerender works with composition API', async () => {
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

  const getContent = () => getByTestId('node')

  expect(getContent()).toHaveTextContent('Foo is: foo. Foobar is: foo-bar')

  await rerender({foo: 'qux'})

  expect(getContent()).toHaveTextContent('Foo is: qux. Foobar is: qux-bar')
})
