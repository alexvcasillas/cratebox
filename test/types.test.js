import test from 'ava';
const { types } = require('../dist/cratebox');

test('it should be of type string', t => {
  t.true(types.string.checker('string'));
});

test('it should be of type number', t => {
  t.true(types.number.checker(1990));
});

test('it should be of type boolean', t => {
  t.true(types.boolean.checker(true));
});

test('it should be of type null', t => {
  t.true(types.null.checker(null));
});

test('it should be of type undefined', t => {
  t.true(types.undefined.checker(undefined));
});

test('it should be of type date', t => {
  t.true(types.date.checker(new Date()));
});

test('it should be of type array of strings', t => {
  t.true(types.array(types.string).checker(['hola', 'mundo']));
});

test('it should be of type array of numbers', t => {
  t.true(types.array(types.number).checker([23, 3, 1990]));
});

test('it should be of type array of boolean', t => {
  t.true(types.array(types.boolean).checker([true, false, true]));
});

test('it should not allow to set an array type without a base type', t => {
  const error = t.throws(() => types.array(), TypeError);
  t.is(error.message, `Array type must be declared with a base type as it's argument`);
});

test('it should not allow to set an array type without a valid base type', t => {
  const error = t.throws(() => types.array({ will: 'fail' }), TypeError);
  t.is(error.message, `The declared type of the array is not a valid base type`);
});

test('it should be of type enumeration', t => {
  t.true(types.enum(['ONE', 'TWO', 'THREE', 'FOUR']).checker('TWO'));
});

test('it should not allow to set an invalid enumeration type', t => {
  t.false(types.enum(['ONE', 'TWO', 'THREE', 'FOUR']).checker(20));
});

test('it should not allow to set an enumeration type without any enumeration', t => {
  const error = t.throws(() => types.enum(), Error);
  t.is(
    error.message,
    `Enumeration type must be declared with an array of strings as it's argument with at least one value`,
  );
});

test('it should explode when trying to set a not valid enumeration type', t => {
  const error = t.throws(() => types.enum(['ONE', 2, 'THREE', 'FOUR']), TypeError);
  t.is(error.message, `Enumeration type must be an array of string literals`);
});
