<div align="center">
<h1>Vue Testing Library</h1>

<a href="https://www.joypixels.com/emoji/1F98E">
  <img
    height="80"
    width="80"
    alt="lizard"
    src="https://raw.githubusercontent.com/testing-library/vue-testing-library/master/lizard.png"
  />
</a>

<p>Simple and complete Vue.js testing utilities that encourage good testing practices.</p>

<p>Vue Testing Library is a lightweight adapter built on top of <a href="https://github.com/testing-library/dom-testing-library/">DOM Testing Library</a> and <a href="https://github.com/vuejs/vue-test-utils">@vue/test-utils</a>.</p>

<br />

[**Read The Docs**][docs] |
[Edit the docs][docs-edit]

<br />

</div>

<hr />

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![Coverage Status][coverage-badge]][coverage]
[![GitHub version][github-badge]][github]
[![npm version][npm-badge]][npm]

[![MIT License][license-badge]][license]
[![Join the community on Spectrum][spectrum-badge]][spectrum]
<!-- prettier-ignore-end -->

<h2>Table of Contents</h2>

- [Installation](#installation)
- [Examples](#examples)
- [Docs](#docs)
- [License](#license)
- [Contributors](#contributors)

## Installation

This module is distributed via npm which is bundled with node and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev @testing-library/vue
```

You may also be interested in installing `jest-dom` so you can use
[the custom Jest matchers](https://github.com/gnapse/jest-dom#readme).

## Examples

```html
<!-- TestComponent.vue -->
<template>
  <div>
    <p>Times clicked: {{ count }}</p>
    <button @click="increment">increment</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    count: 0
  }),
  methods: {
    increment () {
      this.count++
    }
  }
}
</script>
```

```js
// TestComponent.spec.js
import { render, fireEvent, cleanup } from '@testing-library/vue'
import TestComponent from './TestComponent.vue'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

it('increments value on click', async () => {
  // The render method returns a collection of utilities to query your component.
  const { getByText } = render(TestComponent)

  // getByText returns the first matching node for the provided text, and
  // throws an error if no elements match or if more than one match is found.
  getByText('Times clicked: 0')

  const button = getByText('increment')

  // Dispatch a native click event to our button element.
  await fireEvent.click(button)
  await fireEvent.click(button)

  getByText('Times clicked: 2')
})
```


You'll find examples of testing with different situations and popular libraries in
[the test directory][test-directory].

Some included are:

* [`vuex`][vuex-example]
* [`vue-router`][vue-router-example]
* [`vee-validate`][vee-validate-example]
* [`vue-i18n`][vue-i18n-example]

Feel free to contribute with more examples!

## Docs

[**Read The Docs**][docs] |
[Edit the docs][docs-edit]

## License

[MIT][license]

## Contributors


<!-- prettier-ignore-start -->
[build-badge]: https://travis-ci.org/testing-library/vue-testing-library.svg?branch=master
[build]: https://travis-ci.org/testing-library/vue-testing-library
[spectrum-badge]: https://withspectrum.github.io/badge/badge.svg
[spectrum]: https://spectrum.chat/testing-library
[coverage-badge]: https://img.shields.io/codecov/c/github/testing-library/vue-testing-library.svg
[coverage]: https://codecov.io/github/testing-library/vue-testing-library
[github-badge]: https://badge.fury.io/gh/testing-library%2Fvue-testing-library.svg
[github]: https://badge.fury.io/gh/testing-library%2Fvue-testing-library
[npm-badge]: https://badge.fury.io/js/%40testing-library%2Fvue.svg
[npm]: https://badge.fury.io/js/%40testing-library%2Fvue
[license-badge]: https://img.shields.io/github/license/testing-library/vue-testing-library.svg
[license]: https://github.com/testing-library/vue-testing-library/blob/master/LICENSE

[docs]: https://testing-library.com/vue
[docs-edit]: https://github.com/testing-library/testing-library-docs

[test-directory]: https://github.com/testing-library/vue-testing-library/tree/master/tests/__tests__
[vuex-example]: https://github.com/testing-library/vue-testing-library/tree/master/tests/__tests__/vuex.js
[vue-router-example]: https://github.com/testing-library/vue-testing-library/tree/master/tests/__tests__/vue-router.js
[vee-validate-example]: https://github.com/testing-library/vue-testing-library/tree/master/tests/__tests__/validate-plugin.js
[vue-i18n-example]: https://github.com/testing-library/vue-testing-library/blob/master/tests/__tests__/vueI18n.js
<!-- prettier-ignore-end -->
