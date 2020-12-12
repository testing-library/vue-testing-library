import '@testing-library/jest-dom'
import fetch from 'isomorphic-unfetch'
import {render, fireEvent, screen} from '..'
import { DefaultApolloClient } from '@vue/apollo-composable'
import ApolloClient from 'apollo-boost'
import {setupServer} from 'msw/node'
import {graphql} from 'msw'
import { provide, h } from 'vue'
import Component from './components/VueApollo.vue'

// Since vue-apollo doesn't provide a MockProvider for Vue,
// you need to use some kind of mocks for the queries.

// We are using Mock Service Worker (aka MSW) library to declaratively mock API communication
// in your tests instead of stubbing window.fetch, or relying on third-party adapters.

const server = setupServer(
  ...[
    graphql.query('getUser', (req, res, ctx) => {
      const {variables} = req

      if (variables.id !== '1') {
        return res(
          ctx.errors([
            {
              message: 'User not found',
            },
          ]),
        )
      }

      return res(
        ctx.data({
          user: 
            {
              id: 1,
              email: 'alice@example.com',
              __typename: 'User'
            },
        }),
      )
    }),

    graphql.mutation('updateUser', (req, res, ctx) => {
      const {variables} = req

      return res(
        ctx.data({
          updateUser: {
            id: variables.input.id, 
            email: variables.input.email,
            __typename: 'User'
          },
        }),
        )
      }),

  ],
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const apolloClient = new ApolloClient({
    uri: "http://localhost:3000",
    fetch,
})

const ComponentWithInjectedApollo = {
  // It would be preferable to use global.provide when we pass options to VTU options
  // to testing library render function but that option is not yet supported by VTU
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render() {
    return h(Component)
  }
}

test('mocking queries and mutations', async () => {

  render(ComponentWithInjectedApollo, {
      props: {id: '1'}
  })

  //Initial rendering will be in the loading state,
  expect(screen.getByText('Loading')).toBeInTheDocument()

  expect(
    await screen.findByText('Email: alice@example.com')
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
