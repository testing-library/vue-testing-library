import axiosMock from 'axios'
import {render, fireEvent} from '@testing-library/vue'
import Component from './components/Fetch.vue'
import '@testing-library/jest-dom/extend-expect'

test('makes an API call and displays the greeting when load-greeting is clicked', async () => {
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {greeting: 'hello there'},
    }),
  )

  const {html, getByText} = render(Component, {props: {url: '/greeting'}})

  // Act
  await fireEvent.click(getByText('Fetch'))

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith('/greeting')
  getByText('hello there')

  // You can render component snapshots by using html(). However, bear in mind
  // that Snapshot Testing should not be treated as a replacement for regular
  // tests.
  // More about the topic: https://twitter.com/searls/status/919594505938112512
  expect(html()).toMatchSnapshot()
})
