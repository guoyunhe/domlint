import * as members from '.';

test('members should match snapshots', () => {
  expect(members).toMatchSnapshot();
});
