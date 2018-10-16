import test from 'ava';

const { types } = require('../dist/cratebox');

// LITERAL TYPE

test('it should be of type literal', t => {
  t.true(types.literal('CRATEBOX').checker('CRATEBOX').success);
});

test('it should not allow to set a literal with a number type', t => {
  t.is(types.literal('CRATEBOX').checker(20).message, `Type "number" is not a valid type for a string literal`);
});

test('it should not allow to set a literal with a boolean type', t => {
  t.is(types.literal('CRATEBOX').checker(true).message, `Type "boolean" is not a valid type for a string literal`);
});

test('it should not allow to set a literal with an undefined type', t => {
  t.is(
    types.literal('CRATEBOX').checker(undefined).message,
    `Type "undefined" is not a valid type for a string literal`,
  );
});

test('it should not allow to set a literal with a null type', t => {
  t.is(types.literal('CRATEBOX').checker(null).message, `Type "null" is not a valid type for a string literal`);
});

test('it should not allow to set a literal with a date type', t => {
  t.is(types.literal('CRATEBOX').checker(new Date()).message, `Type "Date" is not a valid type for a string literal`);
});

test("it should complain when the given literal doesn't match with the required", t => {
  t.is(types.literal('CRATEBOX').checker('REDUX').message, `REDUX doesn't match with the string literal CRATEBOX`);
});

// GENERIC LITERAL TYPE EXCEPTIONS

test("it should complain when trying to define a string literal that's not a string type", t => {
  const error = t.throws(() => types.literal(20), TypeError);
  t.is(error.message, `Literal type must be declared with a string literal to check against`);
});
