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
const focus = simulate.bind(null, 'focus')
const blur = simulate.bind(null, 'blur')

export default {
  click,
  submit,
  change,
  focus,
  blur
}
