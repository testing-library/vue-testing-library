import axiosMock from 'axios'
import { render, Simulate, flushPromises } from '../'
import Fetch from './components/Fetch.vue'

test('Fetch makes an API call and displays the greeting when load-greeting is clicked', async () => {  
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {greeting: 'hello there'},
    }),
  )
  
  const { queryByTestId, wrapper } = render(Fetch, { props: { url: '/greeting' } })

  // Act
  Simulate.click(queryByTestId('load-greeting'))

  await flushPromises()
  
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith('/greeting')
  expect(queryByTestId('greeting-text').textContent).toBe('hello there')
  expect(wrapper.html()).toMatchSnapshot()
})