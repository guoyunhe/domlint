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
        'border-left-width': { expected: ['0px', '1px'] },
      },
    },
    'code, pre': {
      style: {
        'background-color': {
          expected: '#f6f8fa',
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

const report = domlint.lint();
domlint.print();

render(<div>{report.score}</div>);
```
