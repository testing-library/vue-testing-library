import '@testing-library/jest-dom'
import axiosMock from 'axios'
import {render, fireEvent} from '@testing-library/vue'
import Component from './components/Fetch.vue'

test('mocks an API call when load-greeting is clicked', async () => {
  axiosMock.get.mockResolvedValueOnce({
    data: {greeting: 'hello there'},
  })

  const {html, getByText} = render(Component, {props: {url: '/greeting'}})

  await fireEvent.click(getByText('Fetch'))

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith('/greeting')
  expect(getByText('hello there')).toBeInTheDocument()

  // You can render component snapshots by using html(). However, bear in mind
  // that Snapshot Testing should not be treated as a replacement for regular
  // tests.
  // More about the topic: https://twitter.com/searls/status/919594505938112512
  expect(html()).toMatchInlineSnapshot(
    `<div><button> Fetch </button><span>hello there</span></div>`,
  )
})
