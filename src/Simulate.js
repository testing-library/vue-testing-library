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
const focus = simulate.bind(null, 'focus')
const blur = simulate.bind(null, 'blur')

const touch = (elem) => {
  focus(elem)
  blur(elem)
}

export default {
  blur,
  click,
  focus,
  submit,
  touch
}
