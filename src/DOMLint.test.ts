import { DOMLint, DOMLintConfig } from '.';

describe('DOMLint', () => {
  it('constructor', async () => {
    const config: DOMLintConfig = {};
    const domlint = new DOMLint(config);
    expect(domlint.config).toBe(config);
  });
});
