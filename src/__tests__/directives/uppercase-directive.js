// This function converts the received text passed to the
// v-uppercase directive used in the Directive.vue component
// to upper case and this is appended to the <p> element
export function uppercaseDirective(el, binding) {
  el.innerHTML = binding.value.toUpperCase()
}
