import test from 'ava';

const { types } = require('../dist/cratebox');

/**
 * ADVANCED TYPES
 **/

// STRING ARRAY TYPE

test('it should be of type array of strings', t => {
  t.true(types.array(types.string).checker(['hello', 'world']).success);
});

test('it should complain when receiving a number within an array of type string', t => {
  t.is(
    types.array(types.string).checker([123, 'world']).message,
    `[Array Check] Type "number" could not be assigned to type "string"`,
  );
});

test('it should complain when receiving a boolean within an array of type string', t => {
  t.is(
    types.array(types.string).checker([false, 'world']).message,
    `[Array Check] Type "boolean" could not be assigned to type "string"`,
  );
});

test('it should complain when receiving an undefined within an array of type string', t => {
  t.is(
    types.array(types.string).checker(['hello', undefined]).message,
    `[Array Check] Type "undefined" could not be assigned to type "string"`,
  );
});

test('it should complain when receiving a Date within an array of type string', t => {
  t.is(
    types.array(types.string).checker([new Date(), 'world']).message,
    `[Array Check] Type "Date" could not be assigned to type "string"`,
  );
});

// NUMBER ARRAY TYPE

test('it should be of type array of numbers', t => {
  t.true(types.array(types.number).checker([23, 3, 1990]).success);
});

test('it should complain when receiving a string within an array of type number', t => {
  t.is(
    types.array(types.number).checker([123, 'world']).message,
    `[Array Check] Type "string" could not be assigned to type "number"`,
  );
});

test('it should complain when receiving a boolean within an array of type number', t => {
  t.is(
    types.array(types.number).checker([false, 123]).message,
    `[Array Check] Type "boolean" could not be assigned to type "number"`,
  );
});

test('it should complain when receiving an undefined within an array of type number', t => {
  t.is(
    types.array(types.number).checker([123, undefined]).message,
    `[Array Check] Type "undefined" could not be assigned to type "number"`,
  );
});

test('it should complain when receiving a Date within an array of type number', t => {
  t.is(
    types.array(types.number).checker([new Date(), 123]).message,
    `[Array Check] Type "Date" could not be assigned to type "number"`,
  );
});

// BOOLEAN ARRAY TYPE

test('it should be of type array of boolean', t => {
  t.true(types.array(types.boolean).checker([true, false, true]).success);
});

test('it should complain when receiving a string within an array of type boolean', t => {
  t.is(
    types.array(types.boolean).checker([true, 'world']).message,
    `[Array Check] Type "string" could not be assigned to type "boolean"`,
  );
});

test('it should complain when receiving a number within an array of type boolean', t => {
  t.is(
    types.array(types.boolean).checker([true, 123]).message,
    `[Array Check] Type "number" could not be assigned to type "boolean"`,
  );
});

test('it should complain when receiving an undefined within an array of type boolean', t => {
  t.is(
    types.array(types.boolean).checker([false, undefined]).message,
    `[Array Check] Type "undefined" could not be assigned to type "boolean"`,
  );
});

test('it should complain when receiving a Date within an array of type boolean', t => {
  t.is(
    types.array(types.boolean).checker([new Date(), false]).message,
    `[Array Check] Type "Date" could not be assigned to type "boolean"`,
  );
});

// NULL ARRAY TYPE

test('it should be of type array of null', t => {
  t.true(types.array(types.null).checker([null, null]).success);
});

test('it should complain when receiving a string within an array of type null', t => {
  t.is(
    types.array(types.null).checker([null, 'world']).message,
    `[Array Check] Type "string" could not be assigned to type "null"`,
  );
});

test('it should complain when receiving a number within an array of type null', t => {
  t.is(
    types.array(types.null).checker([null, 123]).message,
    `[Array Check] Type "number" could not be assigned to type "null"`,
  );
});

test('it should complain when receiving an undefined within an array of type null', t => {
  t.is(
    types.array(types.null).checker([null, undefined]).message,
    `[Array Check] Type "undefined" could not be assigned to type "null"`,
  );
});

test('it should complain when receiving a Date within an array of type null', t => {
  t.is(
    types.array(types.null).checker([new Date(), null]).message,
    `[Array Check] Type "Date" could not be assigned to type "null"`,
  );
});

// UNDEFINED ARRAY TYPE

test('it should be of type array of date', t => {
  t.true(types.array(types.date).checker([new Date(), new Date()]).success);
});

test('it should complain when receiving a string within an array of type date', t => {
  t.is(
    types.array(types.date).checker([new Date(), 'world']).message,
    `[Array Check] Type "string" could not be assigned to type "Date"`,
  );
});

test('it should complain when receiving a number within an array of type date', t => {
  t.is(
    types.array(types.date).checker([new Date(), 123]).message,
    `[Array Check] Type "number" could not be assigned to type "Date"`,
  );
});

test('it should complain when receiving a boolean within an array of type date', t => {
  t.is(
    types.array(types.date).checker([new Date(), 123]).message,
    `[Array Check] Type "number" could not be assigned to type "Date"`,
  );
});

test('it should complain when receiving an undefined within an array of type date', t => {
  t.is(
    types.array(types.date).checker([new Date(), undefined]).message,
    `[Array Check] Type "undefined" could not be assigned to type "Date"`,
  );
});

// UNDEFINED ARRAY TYPE

test('it should be of type array of undefined', t => {
  t.true(types.array(types.undefined).checker([undefined, undefined]).success);
});

test('it should complain when receiving a string within an array of type undefined', t => {
  t.is(
    types.array(types.undefined).checker([undefined, 'world']).message,
    `[Array Check] Type "string" could not be assigned to type "undefined"`,
  );
});

test('it should complain when receiving a number within an array of type undefined', t => {
  t.is(
    types.array(types.undefined).checker([undefined, 123]).message,
    `[Array Check] Type "number" could not be assigned to type "undefined"`,
  );
});

test('it should complain when receiving a boolean within an array of type undefined', t => {
  t.is(
    types.array(types.undefined).checker([undefined, true]).message,
    `[Array Check] Type "boolean" could not be assigned to type "undefined"`,
  );
});

test('it should complain when receiving a Date within an array of type undefined', t => {
  t.is(
    types.array(types.undefined).checker([new Date(), undefined]).message,
    `[Array Check] Type "Date" could not be assigned to type "undefined"`,
  );
});

// GENERIC ARRAY TYPE EXCEPTIONS

test('it should not allow to set an array type without a base type', t => {
  const error = t.throws(() => types.array(), TypeError);
  t.is(error.message, `Array type must be declared with a base type as it's argument`);
});

test('it should not allow to set an array type without a valid base type', t => {
  const error = t.throws(() => types.array({ will: 'fail' }), TypeError);
  t.is(error.message, `The declared type of the array is not a valid base type`);
});
