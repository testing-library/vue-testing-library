/* eslint-disable testing-library/no-wait-for-empty-callback */
import {mount} from '@vue/test-utils'
import merge from 'lodash.merge'

import {
  getQueriesForElement,
  logDOM,
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

  // const localVue = createLocalVue()
  let router = null
  let additionalOptions = {}

  const plugins = []

  if (store) {
    const { createStore } = require('vuex')
    plugins.push(createStore(store))
  }

  // TODO: Fix VTL + Vue-router(next?)
  if (routes) {
    const requiredRouter = require('vue-router')
    const VueRouter = requiredRouter.default || requiredRouter
    // localVue.use(VueRouter)
    router = new VueRouter({
      routes,
    })
  }

  // Should we expose vue 3 app? if so, how?
  if (configurationCb && typeof configurationCb === 'function') {
    additionalOptions = configurationCb(router)
  }

  // If `propsData` is provided, rename it to `props`
  // Since this is gonna be a breaking change, we can remove the
  // whole thing.
  if (!mountOptions.props && !!mountOptions.propsData) {
    mountOptions.props = mountOptions.propsData
    delete mountOptions.propsData
  }

  const wrapper = mount(TestComponent, merge({
    // localVue,
    // router,
    attachTo: container,
    global: {
      plugins
    },
    ...mountOptions,
    ...additionalOptions,
  }))

  mountedWrappers.add(wrapper)

  // hack to remove id="app"
  // this fixes tests in auto-cleanup.js and auto-cleanup-skip.js
  wrapper.parentElement.removeAttribute('id')

  return {
    container,
    baseElement,
    debug: (el = baseElement) =>
      Array.isArray(el) ? el.forEach(e => logDOM(e)) : logDOM(el),
    unmount: () => wrapper.unmount(),
    // isUnmounted: () => wrapper.vm._isDestroyed,
    html: () => wrapper.html(),
    emitted: () => wrapper.emitted(),
    setProps: props => wrapper.setProps(props),
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
    wrapper.unmount()
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
