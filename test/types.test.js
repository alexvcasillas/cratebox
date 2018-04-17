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
