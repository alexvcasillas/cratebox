const { types } = require('../dist/cratebox');

test('it should be of type string', () => {
  expect(types.string.checker('string')).toBe(true);
});

test('it should be of type number', () => {
  expect(types.number.checker(1990)).toBe(true);
});

test('it should be of type boolean', () => {
  expect(types.boolean.checker(true)).toBe(true);
});

test('it should be of type null', () => {
  expect(types.null.checker(null)).toBe(true);
});

test('it should be of type undefined', () => {
  expect(types.undefined.checker(undefined)).toBe(true);
});

test('it should be of type date', () => {
  expect(types.date.checker(new Date())).toBe(true);
});
