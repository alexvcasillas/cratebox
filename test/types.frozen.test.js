import test from 'ava';

const { types } = require('../dist/cratebox');

// FROZEN TYPE

test('it should be of type frozen', t => {
  t.true(
    types.frozen({ name: types.string, lastName: types.string }).checker({ name: 'Alex', lastName: 'Casillas' })
      .success,
  );
});

test('it should not allow to set something different (number) than an object', t => {
  t.is(
    types.frozen({ name: types.string, lastName: types.string }).checker(20).message,
    `Type "number" is not a valid frozen type`,
  );
});

test('it should not allow to set something different (boolean) than an object', t => {
  t.is(
    types.frozen({ name: types.string, lastName: types.string }).checker(true).message,
    `Type "boolean" is not a valid frozen type`,
  );
});

test('it should not allow to set something different (null) than an object', t => {
  t.is(
    types.frozen({ name: types.string, lastName: types.string }).checker(null).message,
    `Type "null" is not a valid frozen type`,
  );
});

test('it should not allow to set something different (undefined) than an object', t => {
  t.is(
    types.frozen({ name: types.string, lastName: types.string }).checker(undefined).message,
    `Type "undefined" is not a valid frozen type`,
  );
});

test('it should not allow to set something different (date) than an object', t => {
  t.is(
    types.frozen({ name: types.string, lastName: types.string }).checker(new Date()).message,
    `Type "Date" is not a valid frozen type`,
  );
});

// FROZEN TYPE STRING TYPE PROPERTY

test('it should not allow to set a property different (number) than the declared frozen property type (string)', t => {
  t.is(
    types.frozen({ name: types.string }).checker({ name: 12 }).message,
    `[Frozen Check] Type "number" could not be assigned to type "string" on property "name"`,
  );
});

test('it should not allow to set a property different (boolean) than the declared frozen property type (string)', t => {
  t.is(
    types.frozen({ name: types.string }).checker({ name: true }).message,
    `[Frozen Check] Type "boolean" could not be assigned to type "string" on property "name"`,
  );
});

test('it should not allow to set a property different (undefined) than the declared frozen property type (string)', t => {
  t.is(
    types.frozen({ name: types.string }).checker({ name: undefined }).message,
    `[Frozen Check] Type "undefined" could not be assigned to type "string" on property "name"`,
  );
});

test('it should not allow to set a property different (Date) than the declared frozen property type (string)', t => {
  t.is(
    types.frozen({ name: types.string }).checker({ name: new Date() }).message,
    `[Frozen Check] Type "Date" could not be assigned to type "string" on property "name"`,
  );
});

// FROZEN TYPE NUMBER TYPE PROPERTY

test('it should not allow to set a property different (string) than the declared frozen property type (number)', t => {
  t.is(
    types.frozen({ age: types.number }).checker({ age: '12' }).message,
    `[Frozen Check] Type "string" could not be assigned to type "number" on property "age"`,
  );
});

test('it should not allow to set a property different (boolean) than the declared frozen property type (number)', t => {
  t.is(
    types.frozen({ age: types.number }).checker({ age: true }).message,
    `[Frozen Check] Type "boolean" could not be assigned to type "number" on property "age"`,
  );
});

test('it should not allow to set a property different (undefined) than the declared frozen property type (number)', t => {
  t.is(
    types.frozen({ age: types.number }).checker({ age: undefined }).message,
    `[Frozen Check] Type "undefined" could not be assigned to type "number" on property "age"`,
  );
});

test('it should not allow to set a property different (Date) than the declared frozen property type (number)', t => {
  t.is(
    types.frozen({ age: types.number }).checker({ age: new Date() }).message,
    `[Frozen Check] Type "Date" could not be assigned to type "number" on property "age"`,
  );
});

// FROZEN TYPE BOOLEAN TYPE PROPERTY

test('it should not allow to set a property different (string) than the declared frozen property type (boolean)', t => {
  t.is(
    types.frozen({ admin: types.boolean }).checker({ admin: 'yes' }).message,
    `[Frozen Check] Type "string" could not be assigned to type "boolean" on property "admin"`,
  );
});

test('it should not allow to set a property different (number) than the declared frozen property type (boolean)', t => {
  t.is(
    types.frozen({ admin: types.boolean }).checker({ admin: 123 }).message,
    `[Frozen Check] Type "number" could not be assigned to type "boolean" on property "admin"`,
  );
});

test('it should not allow to set a property different (null) than the declared frozen property type (boolean)', t => {
  t.is(
    types.frozen({ admin: types.boolean }).checker({ admin: null }).message,
    `[Frozen Check] Type "null" could not be assigned to type "boolean" on property "admin"`,
  );
});

test('it should not allow to set a property different (undefined) than the declared frozen property type (boolean)', t => {
  t.is(
    types.frozen({ admin: types.boolean }).checker({ admin: undefined }).message,
    `[Frozen Check] Type "undefined" could not be assigned to type "boolean" on property "admin"`,
  );
});

test('it should not allow to set a property different (Date) than the declared frozen property type (boolean)', t => {
  t.is(
    types.frozen({ admin: types.boolean }).checker({ admin: new Date() }).message,
    `[Frozen Check] Type "Date" could not be assigned to type "boolean" on property "admin"`,
  );
});

// FROZEN TYPE NULL TYPE PROPERTY

test('it should not allow to set a property different (string) than the declared frozen property type (null)', t => {
  t.is(
    types.frozen({ admin: types.null }).checker({ admin: 'yes' }).message,
    `[Frozen Check] Type "string" could not be assigned to type "null" on property "admin"`,
  );
});

test('it should not allow to set a property different (number) than the declared frozen property type (null)', t => {
  t.is(
    types.frozen({ admin: types.null }).checker({ admin: 123 }).message,
    `[Frozen Check] Type "number" could not be assigned to type "null" on property "admin"`,
  );
});

test('it should not allow to set a property different (undefined) than the declared frozen property type (null)', t => {
  t.is(
    types.frozen({ admin: types.null }).checker({ admin: undefined }).message,
    `[Frozen Check] Type "undefined" could not be assigned to type "null" on property "admin"`,
  );
});

test('it should not allow to set a property different (Date) than the declared frozen property type (null)', t => {
  t.is(
    types.frozen({ admin: types.null }).checker({ admin: new Date() }).message,
    `[Frozen Check] Type "Date" could not be assigned to type "null" on property "admin"`,
  );
});

// FROZEN TYPE UNDEFINED TYPE PROPERTY

test('it should not allow to set a property different (string) than the declared frozen property type (undefined)', t => {
  t.is(
    types.frozen({ admin: types.undefined }).checker({ admin: 'yes' }).message,
    `[Frozen Check] Type "string" could not be assigned to type "undefined" on property "admin"`,
  );
});

test('it should not allow to set a property different (number) than the declared frozen property type (undefined)', t => {
  t.is(
    types.frozen({ admin: types.undefined }).checker({ admin: 123 }).message,
    `[Frozen Check] Type "number" could not be assigned to type "undefined" on property "admin"`,
  );
});

test('it should not allow to set a property different (null) than the declared frozen property type (undefined)', t => {
  t.is(
    types.frozen({ admin: types.undefined }).checker({ admin: null }).message,
    `[Frozen Check] Type "null" could not be assigned to type "undefined" on property "admin"`,
  );
});

test('it should not allow to set a property different (Date) than the declared frozen property type (undefined)', t => {
  t.is(
    types.frozen({ admin: types.undefined }).checker({ admin: new Date() }).message,
    `[Frozen Check] Type "Date" could not be assigned to type "undefined" on property "admin"`,
  );
});

// FROZEN TYPE DATE TYPE PROPERTY

test('it should not allow to set a property different (string) than the declared frozen property type (Date)', t => {
  t.is(
    types.frozen({ birthDate: types.date }).checker({ birthDate: 'yes' }).message,
    `[Frozen Check] Type "string" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test('it should not allow to set a property different (number) than the declared frozen property type (Date)', t => {
  t.is(
    types.frozen({ birthDate: types.date }).checker({ birthDate: 123 }).message,
    `[Frozen Check] Type "number" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test('it should not allow to set a property different (boolean) than the declared frozen property type (Date)', t => {
  t.is(
    types.frozen({ birthDate: types.date }).checker({ birthDate: true }).message,
    `[Frozen Check] Type "boolean" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test('it should not allow to set a property different (undefined) than the declared frozen property type (Date)', t => {
  t.is(
    types.frozen({ birthDate: types.date }).checker({ birthDate: undefined }).message,
    `[Frozen Check] Type "undefined" could not be assigned to type "Date" on property "birthDate"`,
  );
});
