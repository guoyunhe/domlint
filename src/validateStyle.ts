export function validateStyle(elem: HTMLElement, name: string, expected: string | string[]) {
  if (Array.isArray(expected)) {
    return expected.some((item) => validateStyle(elem, name, item));
  }

  if (name.endsWith('-radius') && expected === 'round') {
    const rect = elem.getBoundingClientRect();
    const value = elem.computedStyleMap().get(name) as CSSNumericValue;
    return (
      value && parseFloat(value?.to('px')?.toString()) <= Math.min(rect.width, rect.height) / 2
    );
  } else {
    const value = elem.computedStyleMap().get(name);
    return value === expected;
  }
}
