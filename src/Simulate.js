export default {
  click(elem) {
    if (elem) {
      if (elem.trigger) {
        elem.trigger('submit')
      }

      if (elem.click) {
        elem.click()
      }
    }
  },
  submit(elem) {
    if (elem) {
      if (elem.trigger) {
        elem.trigger('submit')
      }

      if (elem.submit) {
        elem.submit()
      }
    }
  }
}