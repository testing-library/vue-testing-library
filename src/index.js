import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import waitForExpect from 'wait-for-expect'
import Simulate from './Simulate'
import * as queries from './queries'

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

  const wrapperHelpers = Object.entries(queries).reduce(
    (helpers, [key, fn]) => {
      helpers[key] = fn.bind(null, wrapper)
      return helpers
    },
    {},
  )

  return {
    unmount: () => wrapper.destroy(),
    isUnmounted: () => wrapper.vm._isDestroyed,
    html: () => wrapper.html(),
    updateProps: _ => wrapper.setProps(_),
    updateState: _ => wrapper.setData(_),
    ...wrapperHelpers
  }
}

function wait(callback = () => {}, {timeout = 4500, interval = 50} = {}) {
  return waitForExpect(callback, timeout, interval)
}

export { render, wait, Simulate }
