# ES6 Class Auto Binder

A Javascript ES6 class autoBind() function with a customizable filter and defaults for React.

## Why Build This?

This package exposes an `autoBind` function that calls `bind()` on 'methods' in you ES6 `class` so that `this` always refers to the `class` object instance and not `window` or some other random object.  It avoids the need to call `bind()` multiple times in your constructor, like this:

```Javascript
class Foo {
  constructor() {
    this.onClick = this.onClick.bind()
    this.onDrag = this.onDrag.bind()
    this.onWhatever = this.onWhatever.bind()
    ...
  }
  ...
}
```

Instead you just write:

```Javascript
class Foo {
  constructor() {
    autoBind(this)
  }
  ...
}
```

There are a few `autoBind` functions out there already, and they work great.  However what I really felt was needed was a fully customizable function that used a filter callback so that it would work with whatever naming conventions you used for your callback functions.

## Usage

Install the package with:

```Shell
npm install auto-bind2
```

Import it using:

```Javascript
import autoBind from 'auto-bind2'
// OR
var autoBind = require('auto-bind2')
```

The function takes a `this` pointer and an optional filter method, e.g.:

```Javascript
autoBind(this)

autoBind(this, (funcName) => (funcName.startsWith('on')))

autoBind(this, (funcName) => (['onClick', 'onDrag', 'onEvent'].includes(funcName)))
```

The library includes support for React.  React `Component` methods are already bound, so you can exclude them with:

```Javascript
import { reactAutoBind } from 'auto-bind2'

reactAutoBind(this)
```

or:

```Javascript
import { isReactMethod, autoBind } from 'auto-bind2'

autoBind(this, isReactMethod)
```

## About

The code is written in ES6 Javascript and built to target NodeJS v8, Chrome v60 and uglification.
