import VuexTest from './components/VuexTest'
import { render, Simulate } from '../../src'
import Vuex from 'vuex'

const store = {
  state: {
    count: 0
  },
  actions: {
    increment: ({commit, state}) => commit('SET_COUNT', state.count + 1),
    decrement: ({commit, state}) => commit('SET_COUNT', state.count - 1)
  },
  mutations: {
    SET_COUNT: (state, count) => state.count = count
  }
}

test('can render with vuex with defaults', () => {
  const {getByTestId, getByText} = render(VuexTest, { store })
  Simulate.click(getByText('+'))
  expect(getByTestId('count-value').textContent).toBe('1')
})

test('can render with vuex with custom initial state', () => {
  store.state.count = 3
  const {getByTestId, getByText} = render(VuexTest, { store })
  Simulate.click(getByText('-'))
  expect(getByTestId('count-value').textContent).toBe('2')
})

test('can render with vuex with custom store', () => {
  // this is a silly store that can never be changed
  const store = { state: { count: 1000 } }
  const {getByTestId, getByText} = render(VuexTest, { store })
  Simulate.click(getByText('+'))
  expect(getByTestId('count-value').textContent).toBe('1000')
  Simulate.click(getByText('-'))
  expect(getByTestId('count-value').textContent).toBe('1000')
})
