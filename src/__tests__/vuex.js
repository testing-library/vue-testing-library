import VuexTest from './components/VuexTest'
import { render, Simulate } from '../'
import Vuex from 'vuex'

const store = {
  state: {
    count: 0
  },
  actions: {
    increment: jest.fn(),
    decrement: jest.fn()    
  },
  mutations: {
    SET_COUNT: (state, count) => state.count = count
  }
}

test('can render with redux with defaults', () => {
  const { wrapper, queryByTestId } = render(VuexTest, { store })
  Simulate.click(queryByTestId('incrementer'))
  wrapper.update()
  expect(store.actions.increment).toBeCalled()  
})

test('can render with redux with custom initial state', () => {
  store.state.count = 3
  const {queryByTestId} = render(VuexTest, { store })
  Simulate.click(queryByTestId('decrementer'))
  expect(store.actions.decrement).toBeCalled()
})

test('can render with redux with custom store', () => {
  // this is a silly store that can never be changed
  const store = { state: { count: 1000 } }
  const {queryByTestId} = render(VuexTest, { store })
  Simulate.click(queryByTestId('incrementer'))
  expect(queryByTestId('count-value').textContent).toBe('1000')
  Simulate.click(queryByTestId('decrementer'))
  expect(queryByTestId('count-value').textContent).toBe('1000')
})
