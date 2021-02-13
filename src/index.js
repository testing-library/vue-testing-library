<<<<<<< HEAD
import {cleanup} from './render'
=======
/* eslint-disable testing-library/no-wait-for-empty-callback */
import {mount} from '@vue/test-utils'

import {
  getQueriesForElement,
  prettyDOM,
  waitFor,
  fireEvent as dtlFireEvent,
} from '@testing-library/dom'

const mountedWrappers = new Set()

function render(
  Component,
  {
    store = null,
    routes = null,
    container: customContainer,
    baseElement: customBaseElement,
    ...mountOptions
  } = {},
) {
  const div = document.createElement('div')
  const baseElement = customBaseElement || customContainer || document.body
  const container = customContainer || baseElement.appendChild(div)

  if (store || routes) {
    console.warn(`Providing 'store' or 'routes' options is no longer available.
You need to create a router/vuex instance and provide it through 'global.plugins'.
Check out the test examples on GitHub for further details.`)
  }

  const wrapper = mount(Component, {
    ...mountOptions,
    attachTo: container,
  })

  // this removes the additional "data-v-app" div node from VTU:
  // https://github.com/vuejs/vue-test-utils-next/blob/master/src/mount.ts#L196-L213
  unwrapNode(wrapper.parentElement)

  mountedWrappers.add(wrapper)

  return {
    container,
    baseElement,
    debug: (el = baseElement, maxLength, options) =>
      Array.isArray(el)
        ? el.forEach(e => console.log(prettyDOM(e, maxLength, options)))
        : console.log(prettyDOM(el, maxLength, options)),
    unmount: () => wrapper.unmount(),
    html: () => wrapper.html(),
    emitted: () => wrapper.emitted(),
    rerender: props => wrapper.setProps(props),
    ...getQueriesForElement(baseElement),
  }
}

function unwrapNode(node) {
  node.replaceWith(...node.childNodes)
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

  wrapper.unmount()
  mountedWrappers.delete(wrapper)
}

// Vue Testing Library's version of fireEvent will call DOM Testing Library's
// version of fireEvent plus wait for one tick of the event loop to allow Vue
// to asynchronously handle the event.
// More info: https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue
async function fireEvent(...args) {
  dtlFireEvent(...args)
  await waitFor(() => {})
}

function suggestUpdateIfNecessary(eventValue, eventKey) {
  const changeOrInputEventCalledDirectly =
    eventValue && (eventKey === 'change' || eventKey === 'input')

  if (changeOrInputEventCalledDirectly) {
    console.warn(
      `Using fireEvent.${eventKey}() may lead to unexpected results. Please use fireEvent.update() instead.`,
    )
  }
}

Object.keys(dtlFireEvent).forEach(key => {
  fireEvent[key] = async (...args) => {
    suggestUpdateIfNecessary(args[1], key)
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
      } else if (type === 'file') {
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
>>>>>>> 544c49d... Improve messaging

// If we're running in a test runner that supports afterEach then we'll
// automatically run cleanup after each test.
// This ensures that tests run in isolation from each other.
// If you don't like this, set the VTL_SKIP_AUTO_CLEANUP variable to 'true'.
if (typeof afterEach === 'function' && !process.env.VTL_SKIP_AUTO_CLEANUP) {
  afterEach(() => {
    cleanup()
  })
}

export * from '@testing-library/dom'
export {cleanup, render} from './render'
export {fireEvent} from './fire-event'
