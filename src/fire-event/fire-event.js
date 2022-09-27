/* eslint-disable testing-library/no-wait-for-empty-callback */
import {waitFor, fireEvent as dtlFireEvent} from '@testing-library/dom'
import {useActions, InputTypeActions} from './input-type-actions'

// Vue Testing Lib's version of fireEvent will call DOM Testing Lib's
// version of fireEvent. The reason is because we need to wait another
// event loop tick to allow Vue to flush and update the DOM
// More info: https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue

async function fireEvent(...args) {
  dtlFireEvent(...args)
  await waitFor(() => {})
}

Object.keys(dtlFireEvent).forEach(key => {
  fireEvent[key] = async (...args) => {
    warnOnChangeOrInputEventCalledDirectly(args[1], key)

    dtlFireEvent[key](...args)
    await waitFor(() => {})
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
  const {tagName} = elem

  if (!InputTypeActions[tagName.toUpperCase()]) {
    return null
  }

  const {[tagName.toUpperCase()]: inputAction} = useActions(fireEvent)

  return inputAction(elem, value)
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
