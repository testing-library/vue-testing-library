export const InputTypeActions = {
  OPTION: 'OPTION',
  INPUT: 'INPUT',
  TEXTAREA: 'TEXTAREA',
  SELECT: 'SELECT',
}

export const useActions = fireEvent => ({
  [InputTypeActions.OPTION]: elem => {
    elem.selected = true

    const parentSelectElement =
      elem.parentElement.tagName === 'OPTGROUP'
        ? elem.parentElement.parentElement
        : elem.parentElement

    return fireEvent.change(parentSelectElement)
  },
  [InputTypeActions.INPUT]: (elem, value) => {
    const {type} = elem

    if (['checkbox', 'radio', 'file'].includes(type)) {
      if (type !== 'file') {
        elem.checked = true
      }

      return fireEvent.change(elem)
    }

    elem.value = value
    return fireEvent.input(elem)
  },
  [InputTypeActions.TEXTAREA]: (elem, value) => {
    elem.value = value
    return fireEvent.input(elem)
  },
  [InputTypeActions.SELECT]: (elem, value) => {
    elem.value = value
    return fireEvent.change(elem)
  },
})
