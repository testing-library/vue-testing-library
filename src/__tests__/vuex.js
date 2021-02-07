import '@testing-library/jest-dom'
import {createStore} from 'vuex'
import {render, fireEvent} from '..'
import VuexTest from './components/Store/VuexTest'
import {store} from './components/Store/store'

// A common testing pattern is to create a custom renderer for a specific test
// file. This way, common operations such as registering a Vuex store can be
// abstracted out while avoiding sharing mutable state.
//
// Tests should be completely isolated from one another.
// Read this for additional context: https://kentcdodds.com/blog/test-isolation-with-react
function renderVuexTestComponent(customStore) {
  // Create a custom store with the original one and the one coming as a
  // parameter. This way we can alter some of its values.
  const mergedStore = createStore({...store, ...customStore})

  return render(VuexTest, {
    global: {
      plugins: [mergedStore],
    },
  })
}

test('can render with vuex with defaults', async () => {
  const {getByTestId, getByText} = renderVuexTestComponent()

  await fireEvent.click(getByText('+'))

  expect(getByTestId('count-value')).toHaveTextContent('1')
})

test('can render with vuex with custom initial state', async () => {
  const {getByTestId, getByText} = renderVuexTestComponent({
    state: () => ({count: 3}),
  })

  await fireEvent.click(getByText('-'))

  expect(getByTestId('count-value')).toHaveTextContent('2')
})

test('can render with vuex with custom store', async () => {
  // This is a silly store that can never be changed.
  // eslint-disable-next-line no-shadow
  const store = createStore({
    state: () => ({count: 1000}),
    actions: {
      increment: () => jest.fn(),
      decrement: () => jest.fn(),
    },
  })

  // Notice how here we are not using the helper rendering method, because
  // there's no need to do that here. We're passing a whole store.
  const {getByTestId, getByText} = render(VuexTest, {
    global: {
      plugins: [store],
    },
  })

  await fireEvent.click(getByText('+'))
  expect(getByTestId('count-value')).toHaveTextContent('1000')

  await fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('1000')
})
