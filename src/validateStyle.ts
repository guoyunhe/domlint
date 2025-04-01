import { FastColor } from '@ant-design/fast-color';

export function validateStyle(
  elem: HTMLElement,
  name: string,
  expected: string | string[],
): boolean | null {
  for (const side of ['', '-top', '-bottom', '-left', '-right']) {
    if (name === `border${side}-color`) {
      // for zero width border, border-color comparison is meaningless
      if (elem.computedStyleMap().get(`border${side}-width`)?.toString() === '0px') {
        return null;
      }
    }
  }

  if (Array.isArray(expected)) {
    return expected.some((item) => validateStyle(elem, name, item));
  }

  if (name === 'color' || name.endsWith('-color')) {
    const value = elem.computedStyleMap().get(name)?.toString();
    return new FastColor(value || 'rgba(0,0,0,0)').equals(new FastColor(expected));
  } else if (name.endsWith('-radius') && expected === 'round') {
    const rect = elem.getBoundingClientRect();
    const value = elem.computedStyleMap().get(name)?.toString();
    return !!value && parseFloat(value) >= Math.min(rect.width, rect.height) / 2;
  } else {
    const value = elem.computedStyleMap().get(name)?.toString();
    return value === expected;
  }
}
