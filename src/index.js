import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Simulate from './Simulate'

function select(id) {
  return `[data-testid="${id}"]`
}

function queryDivByTestId(wrapper, id) {
  return wrapper.find(select(id)).element
}

function render(TestComponent, { props = null, store = null, routes = null } = {}) {    
  const localVue = createLocalVue()
  let vuexStore = null
  let router = null

  if (store) { 
    localVue.use(Vuex)
    vuexStore = new Vuex.Store(store)
  }

  if (routes) {
    localVue.use(VueRouter)
    router = new VueRouter(routes)
  }

  const wrapper = mount(TestComponent, {
    localVue,
    router,
    store: vuexStore,
    propsData: { ...props },
    attachToDocument: true
  })

  return {
    wrapper,
    unmount: () => wrapper.destroy(true),    
    queryByTestId: queryDivByTestId.bind(null, wrapper),
  }  
}

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

export { render, flushPromises, Simulate }
