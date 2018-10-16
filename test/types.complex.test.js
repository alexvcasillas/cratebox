import test from 'ava';

const { types } = require('../dist/cratebox');

/**
 * COMPLEX TYPES
 */

// ARRAY TYPE OF FROZEN WITH STRING PROPERTY

test('it should not allow to set a frozen property different (number) than the declared within the array of frozen type with property (string)', t => {
  t.is(
    types.array(types.frozen({ name: types.string })).checker([{ name: 28 }]).message,
    `[Array Check] [Frozen Check] Type "number" could not be assigned to type "string" on property "name"`,
  );
});

test('it should not allow to set a frozen property different (boolean) than the declared within the array of frozen type with property (string)', t => {
  t.is(
    types.array(types.frozen({ name: types.string })).checker([{ name: true }]).message,
    `[Array Check] [Frozen Check] Type "boolean" could not be assigned to type "string" on property "name"`,
  );
});

test('it should not allow to set a frozen property different (undefined) than the declared within the array of frozen type with property (string)', t => {
  t.is(
    types.array(types.frozen({ name: types.string })).checker([{ name: undefined }]).message,
    `[Array Check] [Frozen Check] Type "undefined" could not be assigned to type "string" on property "name"`,
  );
});

test('it should not allow to set a frozen property different (Date) than the declared within the array of frozen type with property (string)', t => {
  t.is(
    types.array(types.frozen({ name: types.string })).checker([{ name: new Date() }]).message,
    `[Array Check] [Frozen Check] Type "Date" could not be assigned to type "string" on property "name"`,
  );
});

// ARRAY TYPE OF FROZEN WITH NUMBER PROPERTY

test('it should not allow to set a frozen property different (string) than the declared within the array of frozen type with property (number)', t => {
  t.is(
    types.array(types.frozen({ age: types.number })).checker([{ age: '28' }]).message,
    `[Array Check] [Frozen Check] Type "string" could not be assigned to type "number" on property "age"`,
  );
});

test('it should not allow to set a frozen property different (boolean) than the declared within the array of frozen type with property (number)', t => {
  t.is(
    types.array(types.frozen({ age: types.number })).checker([{ age: true }]).message,
    `[Array Check] [Frozen Check] Type "boolean" could not be assigned to type "number" on property "age"`,
  );
});

test('it should not allow to set a frozen property different (undefined) than the declared within the array of frozen type with property (number)', t => {
  t.is(
    types.array(types.frozen({ age: types.number })).checker([{ age: undefined }]).message,
    `[Array Check] [Frozen Check] Type "undefined" could not be assigned to type "number" on property "age"`,
  );
});

test('it should not allow to set a frozen property different (Date) than the declared within the array of frozen type with property (number)', t => {
  t.is(
    types.array(types.frozen({ age: types.number })).checker([{ age: new Date() }]).message,
    `[Array Check] [Frozen Check] Type "Date" could not be assigned to type "number" on property "age"`,
  );
});

// ARRAY TYPE OF FROZEN WITH NULL PROPERTY

test('it should not allow to set a frozen property different (string) than the declared within the array of frozen type with property (null)', t => {
  t.is(
    types.array(types.frozen({ valid: types.null })).checker([{ valid: '28' }]).message,
    `[Array Check] [Frozen Check] Type "string" could not be assigned to type "null" on property "valid"`,
  );
});

test('it should not allow to set a frozen property different (boolean) than the declared within the array of frozen type with property (null)', t => {
  t.is(
    types.array(types.frozen({ valid: types.null })).checker([{ valid: true }]).message,
    `[Array Check] [Frozen Check] Type "boolean" could not be assigned to type "null" on property "valid"`,
  );
});

test('it should not allow to set a frozen property different (undefined) than the declared within the array of frozen type with property (null)', t => {
  t.is(
    types.array(types.frozen({ valid: types.null })).checker([{ valid: undefined }]).message,
    `[Array Check] [Frozen Check] Type "undefined" could not be assigned to type "null" on property "valid"`,
  );
});

test('it should not allow to set a frozen property different (Date) than the declared within the array of frozen type with property (null)', t => {
  t.is(
    types.array(types.frozen({ valid: types.null })).checker([{ valid: new Date() }]).message,
    `[Array Check] [Frozen Check] Type "Date" could not be assigned to type "null" on property "valid"`,
  );
});

// ARRAY TYPE OF FROZEN WITH UNDEFINED PROPERTY

test('it should not allow to set a frozen property different (string) than the declared within the array of frozen type with property (undefined)', t => {
  t.is(
    types.array(types.frozen({ valid: types.undefined })).checker([{ valid: '28' }]).message,
    `[Array Check] [Frozen Check] Type "string" could not be assigned to type "undefined" on property "valid"`,
  );
});

test('it should not allow to set a frozen property different (boolean) than the declared within the array of frozen type with property (undefined)', t => {
  t.is(
    types.array(types.frozen({ valid: types.undefined })).checker([{ valid: true }]).message,
    `[Array Check] [Frozen Check] Type "boolean" could not be assigned to type "undefined" on property "valid"`,
  );
});

test('it should not allow to set a frozen property different (undefined) than the declared within the array of frozen type with property (undefined)', t => {
  t.is(
    types.array(types.frozen({ valid: types.undefined })).checker([{ valid: null }]).message,
    `[Array Check] [Frozen Check] Type "null" could not be assigned to type "undefined" on property "valid"`,
  );
});

test('it should not allow to set a frozen property different (Date) than the declared within the array of frozen type with property (undefined)', t => {
  t.is(
    types.array(types.frozen({ valid: types.undefined })).checker([{ valid: new Date() }]).message,
    `[Array Check] [Frozen Check] Type "Date" could not be assigned to type "undefined" on property "valid"`,
  );
});

// ARRAY TYPE OF FROZEN WITH DATE PROPERTY

test('it should not allow to set a frozen property different (string) than the declared within the array of frozen type with property (date)', t => {
  t.is(
    types.array(types.frozen({ birthDate: types.date })).checker([{ birthDate: '23/03/1990' }]).message,
    `[Array Check] [Frozen Check] Type "string" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test('it should not allow to set a frozen property different (number) than the declared within the array of frozen type with property (date)', t => {
  t.is(
    types.array(types.frozen({ birthDate: types.date })).checker([{ birthDate: 28 }]).message,
    `[Array Check] [Frozen Check] Type "number" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test('it should not allow to set a frozen property different (boolean) than the declared within the array of frozen type with property (date)', t => {
  t.is(
    types.array(types.frozen({ birthDate: types.date })).checker([{ birthDate: true }]).message,
    `[Array Check] [Frozen Check] Type "boolean" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test('it should not allow to set a frozen property different (undefined) than the declared within the array of frozen type with property (date)', t => {
  t.is(
    types.array(types.frozen({ birthDate: types.date })).checker([{ birthDate: undefined }]).message,
    `[Array Check] [Frozen Check] Type "undefined" could not be assigned to type "Date" on property "birthDate"`,
  );
});
