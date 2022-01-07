import '@testing-library/jest-dom'
import {render, fireEvent} from '@testing-library/vue'
import Vue from 'vue'
import Vuex from 'vuex'

import VuexTest from './components/Store/VuexTest'
import {store} from './components/Store/store'

// A common testing pattern is to create a custom renderer for a specific test
// file. This way, common operations such as registering a Vuex store can be
// abstracted out while avoiding sharing mutable state.
//
// Tests should be completely isolated from one another.
// Read this for additional context: https://kentcdodds.com/blog/test-isolation-with-react
function renderVuexTestComponent(customStore) {
  // Render the component and merge the original store and the custom one
  // provided as a parameter. This way, we can alter some behaviors of the
  // initial implementation.
  return render(VuexTest, {store: {...store, ...customStore}})
}

test('can render with vuex with defaults', async () => {
  const {getByTestId, getByText} = renderVuexTestComponent()
  await fireEvent.click(getByText('+'))

  expect(getByTestId('count-value')).toHaveTextContent('1')
})

test('can render with vuex with custom initial state', async () => {
  const {getByTestId, getByText} = renderVuexTestComponent({
    state: {count: 3},
  })
  await fireEvent.click(getByText('-'))

  expect(getByTestId('count-value')).toHaveTextContent('2')
})

test('can render with vuex with custom store', async () => {
  // This is a silly store that can never be changed.
  // eslint-disable-next-line no-shadow
  const store = {
    state: {count: 1000},
    actions: {
      increment: () => jest.fn(),
      decrement: () => jest.fn(),
    },
  }

  // Notice how here we are not using the helper method, because there's no
  // need to do that.
  const {getByTestId, getByText} = render(VuexTest, {store})

  await fireEvent.click(getByText('+'))
  expect(getByTestId('count-value')).toHaveTextContent('1000')

  await fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('1000')
})

test('can render with an instantiated Vuex store', async () => {
  // Before calling new Vuex.Store in your code, you'll need to `.use` it on the
  // global (or local) Vue instance. In frameworks like Jest, the `setupFilesAfterEnv`
  // property is a good place to do this.
  // https://jestjs.io/docs/configuration#setupfilesafterenv-array
  Vue.use(Vuex)

  const {getByTestId, getByText} = render(VuexTest, {
    store: new Vuex.Store({
      state: {count: 3},
      mutations: {
        increment(state) {
          state.count++
        },
        decrement(state) {
          state.count--
        },
      },
      actions: {
        increment(context) {
          context.commit('increment')
        },
        decrement(context) {
          context.commit('decrement')
        },
      },
    }),
  })

  await fireEvent.click(getByText('+'))
  expect(getByTestId('count-value')).toHaveTextContent('4')

  await fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('3')
})
