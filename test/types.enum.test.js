import test from 'ava';

const { types } = require('../dist/cratebox');

// ENUMERATION TYPE

test('it should be of type enumeration', t => {
  t.true(types.enum(['ONE', 'TWO', 'THREE', 'FOUR']).checker('TWO').success);
});

test('it should not allow to set a number within an enumeration type', t => {
  t.is(
    types.enum(['ONE', 'TWO', 'THREE', 'FOUR']).checker(20).message,
    `Type "number" is not a valid type for an enumeration`,
  );
});

test('it should not allow to set a boolean within an enumeration type', t => {
  t.is(
    types.enum(['ONE', 'TWO', 'THREE', 'FOUR']).checker(true).message,
    `Type "boolean" is not a valid type for an enumeration`,
  );
});

test('it should not allow to set a null within an enumeration type', t => {
  t.is(
    types.enum(['ONE', 'TWO', 'THREE', 'FOUR']).checker(null).message,
    `Type "null" is not a valid type for an enumeration`,
  );
});

test('it should not allow to set an undefined within an enumeration type', t => {
  t.is(
    types.enum(['ONE', 'TWO', 'THREE', 'FOUR']).checker(undefined).message,
    `Type "undefined" is not a valid type for an enumeration`,
  );
});

test('it should not allow to set a Date within an enumeration type', t => {
  t.is(
    types.enum(['ONE', 'TWO', 'THREE', 'FOUR']).checker(new Date()).message,
    `Type "Date" is not a valid type for an enumeration`,
  );
});

test("it should complain when it doesn't find a match within the enumeration type", t => {
  t.is(
    types.enum(['ONE', 'TWO', 'THREE', 'FOUR']).checker('FIVE').message,
    `FIVE doesn't match any of the enumerations: ONE,TWO,THREE,FOUR`,
  );
});

// GENERIC ENUMERATION TYPE EXCEPTIONS

test('it should not allow to set an enumeration type without any enumeration', t => {
  const error = t.throws(() => types.enum(), TypeError);
  t.is(
    error.message,
    `Enumeration type must be declared with an array of strings as it's argument with at least one value`,
  );
});

test('it should complain when trying to set a not valid enumeration type', t => {
  const error = t.throws(() => types.enum(['ONE', 2, 'THREE', 'FOUR']), TypeError);
  t.is(error.message, `Enumeration type must be an array of string literals`);
});
