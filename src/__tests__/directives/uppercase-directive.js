// This directive converts any text into its uppercase version
export const uppercaseDirective = {
  beforeMount(el, binding) {
    el.innerHTML = binding.value.toUpperCase()
  },
}
