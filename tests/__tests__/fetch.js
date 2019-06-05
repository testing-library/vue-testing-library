import axiosMock from 'axios'
import { render, fireEvent } from '@testing-library/vue'
import Fetch from './components/Fetch.vue'
import 'jest-dom/extend-expect'

test('Fetch makes an API call and displays the greeting when load-greeting is clicked', async () => {
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { greeting: 'hello there' },
    })
  )

  const { html, getByText } = render(Fetch, { propsData: { url: '/greeting' } })

  // Act
  await fireEvent.click(getByText('Fetch'))

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith('/greeting')
  expect(getByText('hello there')).toHaveTextContent('hello there')
  expect(html()).toMatchSnapshot()
})
