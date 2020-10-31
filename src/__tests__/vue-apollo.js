test.todo('Your test suite must contain at least one test.')
// import '@testing-library/jest-dom'
// import fetch from 'isomorphic-unfetch'
// import {render, fireEvent, screen} from '@testing-library/vue'
// import VueApollo from 'vue-apollo'
// import {InMemoryCache} from 'apollo-cache-inmemory'
// import ApolloClient from 'apollo-boost'

// // Since vue-apollo doesn't provides a MockProvider for Vue,
// // you need to use some kind of mocks for the queries.

// // We recommend using Mock Service Worker library to declaratively mock API communication
// // in your tests instead of stubbing window.fetch, or relying on third-party adapters.

// import {setupServer} from 'msw/node'
// import {graphql} from 'msw'

// import Component from './components/VueApollo.vue'

// const apolloClient = new ApolloClient({
//   uri: 'http://localhost:3020/graphql',
//   cache: new InMemoryCache({
//     addTypename: false,
//   }),
//   fetch,
// })

// const server = setupServer(
//   ...[
//     graphql.mutation('updateUser', (req, res, ctx) => {
//       const {variables} = req

//       return res(
//         ctx.data({
//           updateUser: {id: variables.input.id, email: variables.input.email},
//         }),
//       )
//     }),
//     graphql.query('User', (req, res, ctx) => {
//       return res(ctx.data({user: {id: '1', email: 'alice@example.com'}}))
//     }),
//   ],
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

// test('mocking queries and mutations', async () => {
//   render(Component, {props: {id: '1'}}, localVue => {
//     localVue.use(VueApollo)

//     return {
//       apolloProvider: new VueApollo({defaultClient: apolloClient}),
//     }
//   })

//   //Initial rendering will be in the loading state,
//   expect(screen.getByText('Loading')).toBeInTheDocument()

//   expect(
//     await screen.findByText('Email: alice@example.com'),
//   ).toBeInTheDocument()

//   await fireEvent.update(
//     screen.getByLabelText('Email'),
//     'alice+new@example.com',
//   )

//   await fireEvent.click(screen.getByRole('button', {name: 'Change email'}))

//   expect(
//     await screen.findByText('Email: alice+new@example.com'),
//   ).toBeInTheDocument()
// })
