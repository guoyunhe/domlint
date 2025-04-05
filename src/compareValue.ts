import { FastColor } from '@ant-design/fast-color';

export function compareValue(a: string, b: string) {
  if (a.startsWith('#') || a.startsWith('rgb(') || a.startsWith('rgba(')) {
    return new FastColor(a).equals(new FastColor(b));
  } else {
    return a === b;
  }
}
