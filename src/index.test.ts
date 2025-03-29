import { domlint } from '.';

describe('domlint', () => {
  it('normal', async () => {
    expect(domlint('Foo', 'Bar')).toBe('Foo Bar');
  });

  it('lastName upper case', async () => {
    expect(domlint('Foo', 'Bar', { lastNameUpperCase: true })).toBe('Foo BAR');
  });
});
