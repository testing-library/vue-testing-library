import axiosMock from 'axios'
import { render, Simulate, wait } from '../../src'
import Fetch from './components/Fetch.vue'

test('Fetch makes an API call and displays the greeting when load-greeting is clicked', async () => {
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { greeting: 'hello there' }
    })
  )

  const { html, getByText } = render(Fetch, { props: { url: '/greeting' } })

  // Act
  Simulate.click(getByText('Fetch'))

  await wait()

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith('/greeting')
  expect(getByText('hello there').textContent).toBe('hello there')
  expect(html()).toMatchSnapshot()
})
