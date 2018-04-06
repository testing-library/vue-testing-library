import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Simulate from './Simulate'
import { wait, queries } from 'dom-testing-library'

function render(TestComponent, { props = null, store = null, routes = null } = {}, configurationCb) {
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

  if (configurationCb && typeof configurationCb === 'function') {
    configurationCb(localVue)
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
      helpers[key] = fn.bind(null, wrapper.element)
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

export { render, wait, Simulate }
