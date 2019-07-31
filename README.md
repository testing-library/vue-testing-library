<div align="center">
<h1>Vue Testing Library</h1>

<p>Lightweight adapter allowing <a href="https://github.com/testing-library/dom-testing-library/">DOM Testing Library</a> to be used to test <a href="https://github.com/vuejs/vue">Vue.js</a> components. Built on top of <a href="https://github.com/vuejs/vue-test-utils">@vue/test-utils</a>.</p>

<br />

[**Read The Docs**](https://testing-library.com/vue) |
[Edit the docs](https://github.com/testing-library/testing-library-docs)

<br />

</div>

<hr />

[![Build Status](https://travis-ci.org/testing-library/vue-testing-library.svg?branch=master)](https://travis-ci.org/testing-library/vue-testing-library)&nbsp;&nbsp;
[![Coverage Status](https://img.shields.io/codecov/c/github/testing-library/vue-testing-library.svg)](https://codecov.io/github/testing-library/vue-testing-library)&nbsp;&nbsp;
[![GitHub version](https://badge.fury.io/gh/testing-library%2Fvue-testing-library.svg)](https://badge.fury.io/gh/testing-library%2Fvue-testing-library)

[![npm version](https://badge.fury.io/js/vue-testing-library.svg)](https://badge.fury.io/js/vue-testing-library)&nbsp;&nbsp;
[![license](https://img.shields.io/github/license/testing-library/vue-testing-library.svg)](https://img.shields.io/github/license/testing-library/vue-testing-library)

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

You'll find examples of testing with different libraries in
[the test directory](https://github.com/testing-library/vue-testing-library/tree/master/tests/__tests__).

Some included are:

* [`vuex`](https://github.com/testing-library/vue-testing-library/tree/master/tests/__tests__/vuex.js)
* [`vue-router`](https://github.com/testing-library/vue-testing-library/tree/master/tests/__tests__/vue-router.js)
* [`vee-validate`](https://github.com/testing-library/vue-testing-library/tree/master/tests/__tests__/validate-plugin.js)

Feel free to contribute with more!

## Docs

[**Read The Docs**](https://testing-library.com/vue) |
[Edit the docs](https://github.com/testing-library/testing-library-docs)

## License

MIT

## Contributors

[![dfcook](https://avatars0.githubusercontent.com/u/10348212?v=3&s=200)](https://github.com/dfcook)
[![afontcu](https://avatars3.githubusercontent.com/u/9197791?s=200&v=3)](https://github.com/afontcu)
[![eunjae-lee](https://avatars0.githubusercontent.com/u/499898?v=3&s=200)](https://github.com/eunjae-lee)
[![tim-maguire](https://avatars0.githubusercontent.com/u/29452317?v=3&s=200)](https://github.com/tim-maguire)
[![samdelacruz](https://avatars0.githubusercontent.com/u/2040007?v=3&s=200)](https://github.com/samdelacruz)
[![ankitsinghaniyaz](https://avatars0.githubusercontent.com/u/11331989?v=3&s=200)](https://github.com/ankitsinghaniyaz)
[![lindgr3n](https://avatars0.githubusercontent.com/u/24882614?v=3&s=200)](https://github.com/lindgr3n)
[![kentcdodds](https://avatars0.githubusercontent.com/u/1500684?v=3&s=200)](https://github.com/kentcdodds)
[![brennj](https://avatars2.githubusercontent.com/u/29227924?v=3&s=200)](https://github.com/brennj)
[![makeupsomething](https://avatars2.githubusercontent.com/u/7676733?v=3&s=200)](https://github.com/makeupsomething)
