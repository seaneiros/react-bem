# React Bem

A set of handy decorators to make BEM class management more declarative.

# Installation
To use HOC decorator you should use **React 15.0 or later**
```
npm install --save @seaneiros/react-bem
```

This assumes that you’re using npm package manager with a module bundler like Webpack or Browserify to consume CommonJS modules.

> If you don't use npm or a modern module bundler, and would rather prefer a UMD files, you can grab pre-built versions from `@seaneiros/react-bem/lib/umd`.

# Usage

## Static field

It's the **default** type of exported decorator (due to lower memory consumption).

### Basic example

```javascript
// MyComponent.js

import React from 'react';
import bem from '@seaneiros/react-bem';

const MyComponent = props => {
  const { bem } = MyComponent;

  return (
    <div className={bem.block()}>
      <div className={bem.element('element')}>
        My decorated component
      </div>
    </div>
  );
};

export default bem({ block: 'block' })(MyComponent);
```

```javascript
// somewhere in the app

...
render() {
  return (
    <MyComponent />
  );
}
```
will result
```html
<div class="block">
  <div class="block__element">
    My decorated component
  </div>
</div>
```

### Passing props

Let's make our previous example less dumb.

```javascript
// MyComponent.js

import React from 'react';
import bem from '@seaneiros/react-bem';

const MyComponent = props => {
  const { bem } = MyComponent;

  return (
    <div className={bem.block(props)}>
      <div className={bem.element('element')}>
        My decorated component
      </div>
    </div>
  );
};

export default bem({
  block: 'block',
  modifiers: [ 'inline' ],
})(MyComponent);
```

Notice that we pass `props` as the first parameter to the `bem.block` method.

```javascript
<MyComponent className="externalClass" inline />
```
will turn into
```html
<div class="externalClass block block--inline">
  <div class="block__element">
    My decorated component
  </div>
</div>
```

### More modifiers
That was pretty cool, but what if we need to set some styles within the component?

```javascript
// MyComponent.js

import React from 'react';
import bem from '@seaneiros/react-bem';

const MyComponent = props => {
  const { type } = props;
  const { bem } = MyComponent;

  const color = type === 'success' ? 'green' : 'red';

  return (
    <div className={bem.block(props, { type })}>
      <div className={bem.element('element', { color })}>
        My decorated component
      </div>
    </div>
  );
};

export default bem({
  block: 'block',
  modifiers: [ 'inline' ],
})(MyComponent);
```
Now we need to pass `type` property to compute our styles
```javascript
<MyComponent
  className="externalClass"
  type="success"
  inline
/>
```

```html
<div class="externalClass block block--inline block--type-success">
  <div class="block__element block__element--color-green">
    My decorated component
  </div>
</div>
```
Sometimes (for some reason) you may need to set more than one value to modifier. Let's improve our previous example

```javascript
// MyComponent.js

import React from 'react';
import bem from '@seaneiros/react-bem';

const MyComponent = props => {
  const { type } = props;
  const { bem } = MyComponent;

  const color = type === 'success' ? 'green' : 'red';

  return (
    <div className={bem.block(props, { type, no: [ 'margin', 'border' ] })}>
      <div className={bem.element('element', { color })}>
        My decorated component
      </div>
    </div>
  );
};

export default bem({
  block: 'block',
  modifiers: [ 'inline' ],
})(MyComponent);
```
Now we'll get
```html
<div class="externalClass block block--inline block--type-success block--no-margin block--no-border">
  <div class="block__element block__element--color-green">
    My decorated component
  </div>
</div>
```

## HOC
You can also use HOC to manage styles; syntax is pretty much the same

```javascript
// MyComponent.js

import React from 'react';
import { bemHoc as bem } from '@seaneiros/react-bem';

const MyComponent = props => {
  const { type } = props;
  const { bem } = MyComponent;

  const color = type === 'success' ? 'green' : 'red';

  return (
    <div className={bem.block({ type, no: [ 'margin', 'border' ] })}>
      <div className={bem.element('element', { color })}>
        My decorated component
      </div>
    </div>
  );
};

export default bem({
  block: 'block',
  modifiers: [ 'inline' ],
})(MyComponent);
```

Notice, that we don't need to pass `props` as the first parameter to `bem.block` method anymore.

> HOC will create helper instance for every decorated component, so it's **not recommended** to use it for lists.

## Helper
Although you are expected to use decorators, it is still possible to use helper itself.

```javascript
import { BemHelper } from '@seaneiros/react-bem';

const bem = new BemHelper({
  block: 'someBlock',
  modifiers: [ ... ],
});

// use as a static field
...
```

## Configuration
It is possible to change delimiters as you want
```javascript
bem({
  block: 'someBlock',
  modifiers: [ ... ],
  config: {
    element: '~~',
    modifier: '::',
    modifierValue: '_',
  },
})(MyComponent);
```

# License
ISC