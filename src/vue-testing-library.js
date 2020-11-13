/* eslint-disable testing-library/no-wait-for-empty-callback */
import {createLocalVue, mount} from '@vue/test-utils'

import {
  getQueriesForElement,
  prettyDOM,
  waitFor,
  fireEvent as dtlFireEvent,
} from '@testing-library/dom'

const mountedWrappers = new Set()

function render(
  TestComponent,
  {
    store = null,
    routes = null,
    container: customContainer,
    baseElement: customBaseElement,
    ...mountOptions
  } = {},
  configurationCb,
) {
  const div = document.createElement('div')
  const baseElement = customBaseElement || customContainer || document.body
  const container = customContainer || baseElement.appendChild(div)

  const attachTo = document.createElement('div')
  container.appendChild(attachTo)

  const localVue = createLocalVue()
  let vuexStore = null
  let router = null
  let additionalOptions = {}

  if (store) {
    const Vuex = require('vuex')
    localVue.use(Vuex)
    vuexStore = new Vuex.Store(store)
  }

  if (routes) {
    const requiredRouter = require('vue-router')
    const VueRouter = requiredRouter.default || requiredRouter
    localVue.use(VueRouter)
    router = new VueRouter({
      routes,
    })
  }

  if (configurationCb && typeof configurationCb === 'function') {
    additionalOptions = configurationCb(localVue, vuexStore, router)
  }

  if (!mountOptions.propsData && !!mountOptions.props) {
    mountOptions.propsData = mountOptions.props
    delete mountOptions.props
  }

  const wrapper = mount(TestComponent, {
    localVue,
    router,
    attachTo,
    store: vuexStore,
    ...mountOptions,
    ...additionalOptions,
  })

  mountedWrappers.add(wrapper)
  container.appendChild(wrapper.element)

  return {
    container,
    baseElement,
    debug: (el = baseElement, maxLength, options) =>
      Array.isArray(el)
        ? el.forEach(e => console.log(prettyDOM(e, maxLength, options)))
        : console.log(prettyDOM(el, maxLength, options)),
    unmount: () => wrapper.destroy(),
    isUnmounted: () => wrapper.vm._isDestroyed,
    html: () => wrapper.html(),
    emitted: () => wrapper.emitted(),
    updateProps: _ => wrapper.setProps(_),
    ...getQueriesForElement(baseElement),
  }
}

function cleanup() {
  mountedWrappers.forEach(cleanupAtWrapper)
}

function cleanupAtWrapper(wrapper) {
  if (
    wrapper.element.parentNode &&
    wrapper.element.parentNode.parentNode === document.body
  ) {
    document.body.removeChild(wrapper.element.parentNode)
  }

  try {
    wrapper.destroy()
  } finally {
    mountedWrappers.delete(wrapper)
  }
}

// Vue Testing Library's version of fireEvent will call DOM Testing Library's
// version of fireEvent plus wait for one tick of the event loop to allow Vue
// to asynchronously handle the event.
// More info: https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue
async function fireEvent(...args) {
  dtlFireEvent(...args)
  await waitFor(() => {})
}

Object.keys(dtlFireEvent).forEach(key => {
  fireEvent[key] = async (...args) => {
    dtlFireEvent[key](...args)
    await waitFor(() => {})
  }
})

fireEvent.touch = async elem => {
  await fireEvent.focus(elem)
  await fireEvent.blur(elem)
}

// Small utility to provide a better experience when working with v-model.
// Related upstream issue: https://github.com/vuejs/vue-test-utils/issues/345#issuecomment-380588199
// Examples: https://github.com/testing-library/vue-testing-library/blob/master/src/__tests__/form.js
fireEvent.update = (elem, value) => {
  const tagName = elem.tagName
  const type = elem.type

  switch (tagName) {
    case 'OPTION': {
      elem.selected = true

      const parentSelectElement =
        elem.parentElement.tagName === 'OPTGROUP'
          ? elem.parentElement.parentElement
          : elem.parentElement

      return fireEvent.change(parentSelectElement)
    }

    case 'INPUT': {
      if (['checkbox', 'radio'].includes(type)) {
        elem.checked = true
        return fireEvent.change(elem)
      } else {
        elem.value = value
        return fireEvent.input(elem)
      }
    }

    case 'TEXTAREA': {
      elem.value = value
      return fireEvent.input(elem)
    }

    case 'SELECT': {
      elem.value = value
      return fireEvent.change(elem)
    }

    default:
    // do nothing
  }

  return null
}

// If we're running in a test runner that supports afterEach then we'll
// automatically run cleanup after each test. This ensures that tests run in
// isolation from each other.
// If you don't like this, set the VTL_SKIP_AUTO_CLEANUP variable to 'true'.
if (typeof afterEach === 'function' && !process.env.VTL_SKIP_AUTO_CLEANUP) {
  afterEach(() => {
    cleanup()
  })
}

export * from '@testing-library/dom'
export {cleanup, render, fireEvent}
