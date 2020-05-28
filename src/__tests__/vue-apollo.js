// Caution!
// This approach only works with apollo-client 2.x and vue-apollo 3.x

import '@testing-library/jest-dom'
import {render, fireEvent, screen} from '@testing-library/vue'
import VueApollo from 'vue-apollo'

// Since vue-apollo doesn't provides a MockProvider for Vue,
// you need to use some kind of a mocking client for Apollo.

// If you decide to use `mock-apollo-client`,
// have a look at the documentation at
// https://github.com/Mike-Gibson/mock-apollo-client
import {createMockClient} from 'mock-apollo-client'

import Component from './components/VueApollo.vue'
import {userQuery, updateUserMutation} from './components/VueApollo/queries'

test('mocking queries and mutations', async () => {
  const mockClient = createMockClient()

  mockClient.setRequestHandler(userQuery, () =>
    Promise.resolve({
      data: {user: {id: '1', email: 'alice@example.com'}},
    }),
  )

  mockClient.setRequestHandler(updateUserMutation, variables =>
    Promise.resolve({
      data: {
        updateUser: {id: variables.input.id, email: variables.input.email},
      },
    }),
  )

  render(Component, {props: {id: '1'}}, localVue => {
    localVue.use(VueApollo)

    return {
      apolloProvider: new VueApollo({
        defaultClient: mockClient,
      }),
    }
  })

  //Initial rendering will be in the loading state,
  expect(screen.getByText('Loading')).toBeInTheDocument()

  expect(
    await screen.findByText('Email: alice@example.com'),
  ).toBeInTheDocument()

  await fireEvent.update(
    screen.getByLabelText('Email'),
    'alice+new@example.com',
  )

  await fireEvent.click(screen.getByRole('button', {name: 'Change email'}))

  expect(
    await screen.findByText('Email: alice+new@example.com'),
  ).toBeInTheDocument()
})
