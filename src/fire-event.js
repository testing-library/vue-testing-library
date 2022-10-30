import {fireEvent as dtlFireEvent} from '@testing-library/dom'
import {flushPromises} from '@vue/test-utils'

// Vue Testing Lib's version of fireEvent will call DOM Testing Lib's
// version of fireEvent. The reason is because we need to wait another
// event loop tick to allow Vue to flush and update the DOM
// More info: https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue

async function fireEvent(...args) {
  dtlFireEvent(...args)
  await flushPromises()
}

Object.keys(dtlFireEvent).forEach(key => {
  fireEvent[key] = async (...args) => {
    warnOnChangeOrInputEventCalledDirectly(args[1], key)

    dtlFireEvent[key](...args)
    await flushPromises()
  }
})

fireEvent.touch = async elem => {
  await fireEvent.focus(elem)
  await fireEvent.blur(elem)
}

// fireEvent.update is a small utility to provide a better experience when
// working with v-model.
// Related upstream issue: https://github.com/vuejs/vue-test-utils/issues/345#issuecomment-380588199
// See some examples in __tests__/form.js
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

function warnOnChangeOrInputEventCalledDirectly(eventValue, eventKey) {
  if (process.env.VTL_SKIP_WARN_EVENT_UPDATE) return

  if (eventValue && (eventKey === 'change' || eventKey === 'input')) {
    console.warn(
      `Using "fireEvent.${eventKey}" may lead to unexpected results. Please use fireEvent.update() instead.`,
    )
  }
}

export {fireEvent}
