import VuexTest from './components/VuexTest'
import { render, Simulate, wait } from '../../src'

const store = {
  state: {
    count: 0
  },
  actions: {
    increment: ({ commit, state }) => commit('SET_COUNT', state.count + 1),
    decrement: ({ commit, state }) => commit('SET_COUNT', state.count - 1)
  },
  mutations: {
    SET_COUNT: (state, count) => { state.count = count }
  }
}

test('can render with vuex with defaults', async () => {
  const { getByTestId, getByText } = render(VuexTest, { store })
  Simulate.click(getByText('+'))
  await wait()
  expect(getByTestId('count-value').textContent).toBe('1')
})

test('can render with vuex with custom initial state', async () => {
  store.state.count = 3
  const { getByTestId, getByText } = render(VuexTest, { store })
  Simulate.click(getByText('-'))
  await wait()
  expect(getByTestId('count-value').textContent).toBe('2')
})

test('can render with vuex with custom store', async () => {
  // this is a silly store that can never be changed
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const store = { state: { count: 1000 } }
  const { getByTestId, getByText } = render(VuexTest, { store })
  Simulate.click(getByText('+'))
  await wait()
  expect(getByTestId('count-value').textContent).toBe('1000')
  Simulate.click(getByText('-'))
  await wait()
  expect(getByTestId('count-value').textContent).toBe('1000')

  expect(console.error).toHaveBeenCalled()
})
