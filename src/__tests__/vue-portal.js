test.todo('Your test suite must contain at least one test.')

// import {render, waitFor} from '@testing-library/vue'
// import '@testing-library/jest-dom/extend-expect'
// import PortalVue from 'portal-vue'

// const PortalComponent = {
//   template: `
//     <div>
//       <Portal to="portalName" data-testid="portal">
//         <p>Content rendered wherever the portal-target is located.</p>
//       </Portal>

//       <PortalTarget name="portalName" data-testid="target" />
//   </div>`,
// }

// wait until PortalVue has removed content from the source element
// and moved it to the target one.
// test('portal', async () => {
//   const {getByTestId} = render(PortalComponent, {}, vue => {
//     vue.use(PortalVue)
//   })

//   // wait until PortalVue has removed content from the source element
//   // and moved it to the target one.
//   await waitFor(() => {
//     expect(getByTestId('portal')).toBeEmptyDOMElement()
//   })

//   expect(getByTestId('target')).toHaveTextContent(
//     'Content rendered wherever the portal-target is located.',
//   )
// })
