# domlint

Lint DOM class, style and attributes

## Installation

```bash
npm i -S domlint
```

## API Usage

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

## UI Usage

```jsx
import { DOMLintUI } from 'domlint';

const config = {
  rules: {
    a: {
      style: {
        'border-left-width': { expected: ['0px', '1px'] },
      },
    },
    'code, pre': {
      style: {
        'background-color': {
          expected: ['#f3f3f3', '#f8f8f8'],
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
};

render(<DOMLintUI config={config} />);
```
