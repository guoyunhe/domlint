# domlint

Lint DOM class, style and attributes

## Installation

```bash
npm i -S domlint
```

## Usage

```jsx
import { DOMLint } from 'domlint';

const domlint = new DOMLint({
  rules: {
    a: {
      style: {
        'border-left-width': { expect: ['0px', '1px'] },
        'border-left-color': { expect: '#666666', ignore: '#ffffff' },
      },
    },
    'code, pre': {
      style: {
        'background-color': {
          expect: '#f6f8fa',
        },
      },
    },
    img: {
      exist: {
        goodness: 10,
        badness: 20,
      },
    },
    h2: {
      deprecated: {},
    },
  },
  ignore: ['script'],
});

setTimeout(() => {
  const report = domlint.lint();
  domlint.print();
}, 1000);

render(
  <div>
    <a id="abc" style={{ border: '1px solid #ffffff' }} />
  </div>,
);
```

## DOMLint UI

<https://guoyunhe.github.io/domlint-ui/>

## Known Issues

### DOMLint doesn't work in Firefox

DOMLint relies on [Element.computedStyleMap()](https://developer.mozilla.org/en-US/docs/Web/API/Element/computedStyleMap), which is unluckily not supported by Firefox.
