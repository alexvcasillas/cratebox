import test from 'ava';

const { types } = require('../dist/cratebox');

/**
 * BASE TYPES
 **/

test('it should be of type string', t => {
  t.true(types.string.checker('string').success);
});

test('it should be of type number', t => {
  t.true(types.number.checker(1990).success);
});

test('it should be of type boolean', t => {
  t.true(types.boolean.checker(true).success);
});

test('it should be of type null', t => {
  t.true(types.null.checker(null).success);
});

test('it should be of type undefined', t => {
  t.true(types.undefined.checker(undefined).success);
});

test('it should be of type date', t => {
  t.true(types.date.checker(new Date()).success);
});
