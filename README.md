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
    pre: {
      style: {
        'background-color': {
          expected: ['#f5f5f5'],
        },
      },
    },
  },
  ignore: ['script'],
});

const report = domlint.lint();
domlint.print();

render(<div>{report.score}</div>);
```
