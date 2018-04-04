const simulate = (event, elem, ...params) => {
  if (elem) {
    if (elem.trigger) {
      return elem.trigger(event, ...params)
    }

    if (elem[event]) {
      return elem[event](...params)
    }
  }
}

const click = simulate.bind(null, 'click')
const submit = simulate.bind(null, 'submit')
const change = simulate.bind(null, 'change')

export default {
  click,
  submit,
  change
}
