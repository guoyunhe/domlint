import { validateStyle } from './validateStyle';

describe('validateStyle()', () => {
  it('supports different color formats', () => {
    const elem = document.createElement('div');
    elem.style.color = '#666666';
    validateStyle(elem, 'color', ['#666']);
  });
});
