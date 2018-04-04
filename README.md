<div align="center">
<h1>vue-testing-library</h1>

<p>Port of the ultra-low surface area testing library <a href="https://github.com/kentcdodds/react-testing-library/">react-testing-library</a> to <a href="https://github.com/vuejs/vue">Vue.js</a> using <a href="https://github.com/vuejs/vue-test-utils">@vue/test-utils</a></p>

</div>

<hr />

[![Build Status](https://travis-ci.org/dfcook/vue-testing-library.svg?branch=master)](https://travis-ci.org/dfcook/vue-testing-library)&nbsp;&nbsp;
[![Coverage Status](https://coveralls.io/repos/github/dfcook/vue-testing-library/badge.svg?branch=master)](https://coveralls.io/github/dfcook/vue-testing-library?branch=master)&nbsp;&nbsp;
[![GitHub version](https://badge.fury.io/gh/dfcook%2Fvue-testing-library.svg)](https://badge.fury.io/gh/dfcook%2Fvue-testing-library)

[![npm version](https://badge.fury.io/js/vue-testing-library.svg)](https://badge.fury.io/js/vue-testing-library)&nbsp;&nbsp;
[![license](https://img.shields.io/github/license/dfcook/vue-testing-library.svg)](https://img.shields.io/github/license/dfcook/vue-testing-library)

## This library

The `vue-testing-library` is a very light-weight solution for testing Vue
components. It provides light utility functions on top of `@vue/test-utils`, in a way that encourages better testing practices.
It's primary guiding principle is:

The more your tests resemble the way your software is used, the more confidence they can give you.

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
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
  <span data-testid="test1">Hello World</span>
</template>

// src/TestComponent.spec.js
import { render } from 'vue-testing-library'
import TestComponent from './TestComponent'

test('should render HelloWorld', () => {
  const { queryByTestId } = render(TestComponent)
  expect(queryByTestId('test1').textContent).toBe('Hello World')
})

```

## LICENSE

MIT