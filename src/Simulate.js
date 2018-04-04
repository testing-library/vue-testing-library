export default {
  click(elem) {
    if (elem) {
      if (elem.trigger) {
        return elem.trigger('click')
      }

      if (elem.click) {
        return elem.click()
      }
    }
  },
  submit(elem) {
    if (elem) {
      if (elem.trigger) {
        return elem.trigger('submit')
      }

      if (elem.submit) {
        return elem.submit()
      }
    }
  },
  change (elem, value) {
    if (elem) {
      if (elem.trigger) {
        return elem.trigger('change',{ value })
      }

      if (elem.value) {
        return elem.value = value
      }
    }
  }
}