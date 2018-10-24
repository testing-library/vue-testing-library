<div align="center">
<h1>vue-testing-library</h1>

<p>Lightweight adapter allowing <a href="https://github.com/kentcdodds/dom-testing-library/">dom-testing-library</a> to be used to test <a href="https://github.com/vuejs/vue">Vue.js</a> components built on top of <a href="https://github.com/vuejs/vue-test-utils">@vue/test-utils</a></p>

</div>

<hr />

[![Build Status](https://travis-ci.org/dfcook/vue-testing-library.svg?branch=master)](https://travis-ci.org/dfcook/vue-testing-library)&nbsp;&nbsp;
[![Coverage Status](https://coveralls.io/repos/github/dfcook/vue-testing-library/badge.svg?branch=master)](https://coveralls.io/github/dfcook/vue-testing-library?branch=master)&nbsp;&nbsp;
[![GitHub version](https://badge.fury.io/gh/dfcook%2Fvue-testing-library.svg)](https://badge.fury.io/gh/dfcook%2Fvue-testing-library)

[![npm version](https://badge.fury.io/js/vue-testing-library.svg)](https://badge.fury.io/js/vue-testing-library)&nbsp;&nbsp;
[![license](https://img.shields.io/github/license/dfcook/vue-testing-library.svg)](https://img.shields.io/github/license/dfcook/vue-testing-library)

## This library

The `vue-testing-library` is a an adapter that enables Vue testing using the framework-agnostic DOM testing library `dom-testing-library`

* [Installation](#installation)
* [Usage](#usage)
  * [`render`](#render)
  * [`Simulate`](#simulate)
  * [`wait`](#wait)
* [Examples](#examples) 
* [LICENSE](#license)

## Installation

This module is distributed via npm which is bundled with node and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev vue-testing-library

```

## Usage

```
npm install --save-dev vue-testing-library
                       jest
                       vue-jest
                       babel-jest
                       babel-preset-env
                       babel-plugin-transform-runtime
```

```javascript
// package.json
  "scripts": {
    "test": "jest"
  }

  "jest": {
    "moduleDirectories": [
      "node_modules",
      "src"
    ],
    "moduleFileExtensions": [
      "js",
      "vue"
    ],
    "testPathIgnorePatterns": [
      "/node_modules/"
    ],
    "transform": {
      "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
      ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
    }
  }

// .babelrc
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }]
  ],
  "plugins": [
    "transform-runtime"
  ],
  "env": {
    "test": {
      "presets": ["env"]
    }
  }
}

// src/TestComponent.vue
<template>
  <div>
    <span data-testid="test1">Hello World</span>
  </div>
</template>

// src/TestComponent.spec.js
import { render } from 'vue-testing-library'
import TestComponent from './TestComponent'

test('should render HelloWorld', () => {
  const { queryByTestId } = render(TestComponent)
  expect(queryByTestId('test1').textContent).toBe('Hello World')
})

```

### render

The `render` function takes up to 3 parameters and returns an object with some helper methods

1. Component - the Vue component to be tested.
2. RenderOptions - an object containing additional information to be passed to @vue/test-utils mount. This can be:
* props - The component props to be passed to TestComponent
* store - The object definition of a Vuex store, if present `render` will configure a Vuex store and pass to mount.
* routes - A set of routes, if present render will configure VueRouter and pass to mount.
3. configurationCb - A callback to be called passing the Vue instance when created. This allows 3rd party plugins to be installed prior to mount.

### Simulate

Lightweight wrapper around DOM element methods

### wait

When in need to wait for non-deterministic periods of time you can use `wait`,
to wait for your expectations to pass. The `wait` function is a small wrapper
around the
[`wait-for-expect`](https://github.com/TheBrainFamily/wait-for-expect) module.

Waiting can be very important in Vue components, @vue/test-utils has succeeded in making the majority of updates happen
synchronously however there are occasions when wait will allow the DOM to update. For example, see [`here`](https://github.com/dfcook/vue-testing-library/tree/master/tests/__tests__/validate-plugin.js)

## Examples

You'll find examples of testing with different libraries in
[the test directory](https://github.com/dfcook/vue-testing-library/tree/master/tests/__tests__).
Some included are:

* [`vuex`](https://github.com/dfcook/vue-testing-library/tree/master/tests/__tests__/vuex.js)
* [`vue-router`](https://github.com/dfcook/vue-testing-library/tree/master/tests/__tests__/vue-router.js)
* [`vee-validate`](https://github.com/dfcook/vue-testing-library/tree/master/tests/__tests__/validate-plugin.js)

Feel free to contribute more!

## LICENSE

MIT