import test from "ava";

const { types } = require("../dist/cratebox");

/**
 * BASE TYPES
 **/

test("it should be of type string", t => {
  t.true(types.string.checker("string").success);
});

test("it should be of type number", t => {
  t.true(types.number.checker(1990).success);
});

test("it should be of type boolean", t => {
  t.true(types.boolean.checker(true).success);
});

test("it should be of type null", t => {
  t.true(types.null.checker(null).success);
});

test("it should be of type undefined", t => {
  t.true(types.undefined.checker(undefined).success);
});

test("it should be of type date", t => {
  t.true(types.date.checker(new Date()).success);
});

/**
 * ADVANCED TYPES
 **/

// STRING ARRAY TYPE

test("it should be of type array of strings", t => {
  t.true(types.array(types.string).checker(["hello", "world"]).success);
});

test("it should complain when receiving a number within an array of type string", t => {
  t.is(
    types.array(types.string).checker([123, "world"]).message,
    `[Array Check] Type "number" could not be assigned to type "string"`,
  );
});

test("it should complain when receiving a boolean within an array of type string", t => {
  t.is(
    types.array(types.string).checker([false, "world"]).message,
    `[Array Check] Type "boolean" could not be assigned to type "string"`,
  );
});

test("it should complain when receiving an undefined within an array of type string", t => {
  t.is(
    types.array(types.string).checker(["hello", undefined]).message,
    `[Array Check] Type "undefined" could not be assigned to type "string"`,
  );
});

test("it should complain when receiving a Date within an array of type string", t => {
  t.is(
    types.array(types.string).checker([new Date(), "world"]).message,
    `[Array Check] Type "Date" could not be assigned to type "string"`,
  );
});

// NUMBER ARRAY TYPE

test("it should be of type array of numbers", t => {
  t.true(types.array(types.number).checker([23, 3, 1990]).success);
});

test("it should complain when receiving a string within an array of type number", t => {
  t.is(
    types.array(types.number).checker([123, "world"]).message,
    `[Array Check] Type "string" could not be assigned to type "number"`,
  );
});

test("it should complain when receiving a boolean within an array of type number", t => {
  t.is(
    types.array(types.number).checker([false, 123]).message,
    `[Array Check] Type "boolean" could not be assigned to type "number"`,
  );
});

test("it should complain when receiving an undefined within an array of type number", t => {
  t.is(
    types.array(types.number).checker([123, undefined]).message,
    `[Array Check] Type "undefined" could not be assigned to type "number"`,
  );
});

test("it should complain when receiving a Date within an array of type number", t => {
  t.is(
    types.array(types.number).checker([new Date(), 123]).message,
    `[Array Check] Type "Date" could not be assigned to type "number"`,
  );
});

// BOOLEAN ARRAY TYPE

test("it should be of type array of boolean", t => {
  t.true(types.array(types.boolean).checker([true, false, true]).success);
});

test("it should complain when receiving a string within an array of type boolean", t => {
  t.is(
    types.array(types.boolean).checker([true, "world"]).message,
    `[Array Check] Type "string" could not be assigned to type "boolean"`,
  );
});

test("it should complain when receiving a number within an array of type boolean", t => {
  t.is(
    types.array(types.boolean).checker([true, 123]).message,
    `[Array Check] Type "number" could not be assigned to type "boolean"`,
  );
});

test("it should complain when receiving an undefined within an array of type boolean", t => {
  t.is(
    types.array(types.boolean).checker([false, undefined]).message,
    `[Array Check] Type "undefined" could not be assigned to type "boolean"`,
  );
});

test("it should complain when receiving a Date within an array of type boolean", t => {
  t.is(
    types.array(types.boolean).checker([new Date(), false]).message,
    `[Array Check] Type "Date" could not be assigned to type "boolean"`,
  );
});

// NULL ARRAY TYPE

test("it should be of type array of null", t => {
  t.true(types.array(types.null).checker([null, null]).success);
});

test("it should complain when receiving a string within an array of type null", t => {
  t.is(
    types.array(types.null).checker([null, "world"]).message,
    `[Array Check] Type "string" could not be assigned to type "null"`,
  );
});

test("it should complain when receiving a number within an array of type null", t => {
  t.is(
    types.array(types.null).checker([null, 123]).message,
    `[Array Check] Type "number" could not be assigned to type "null"`,
  );
});

test("it should complain when receiving an undefined within an array of type null", t => {
  t.is(
    types.array(types.null).checker([null, undefined]).message,
    `[Array Check] Type "undefined" could not be assigned to type "null"`,
  );
});

test("it should complain when receiving a Date within an array of type null", t => {
  t.is(
    types.array(types.null).checker([new Date(), null]).message,
    `[Array Check] Type "Date" could not be assigned to type "null"`,
  );
});

// UNDEFINED ARRAY TYPE

test("it should be of type array of date", t => {
  t.true(types.array(types.date).checker([new Date(), new Date()]).success);
});

test("it should complain when receiving a string within an array of type date", t => {
  t.is(
    types.array(types.date).checker([new Date(), "world"]).message,
    `[Array Check] Type "string" could not be assigned to type "Date"`,
  );
});

test("it should complain when receiving a number within an array of type date", t => {
  t.is(
    types.array(types.date).checker([new Date(), 123]).message,
    `[Array Check] Type "number" could not be assigned to type "Date"`,
  );
});

test("it should complain when receiving a boolean within an array of type date", t => {
  t.is(
    types.array(types.date).checker([new Date(), 123]).message,
    `[Array Check] Type "number" could not be assigned to type "Date"`,
  );
});

test("it should complain when receiving an undefined within an array of type date", t => {
  t.is(
    types.array(types.date).checker([new Date(), undefined]).message,
    `[Array Check] Type "undefined" could not be assigned to type "Date"`,
  );
});

// UNDEFINED ARRAY TYPE

test("it should be of type array of undefined", t => {
  t.true(types.array(types.undefined).checker([undefined, undefined]).success);
});

test("it should complain when receiving a string within an array of type undefined", t => {
  t.is(
    types.array(types.undefined).checker([undefined, "world"]).message,
    `[Array Check] Type "string" could not be assigned to type "undefined"`,
  );
});

test("it should complain when receiving a number within an array of type undefined", t => {
  t.is(
    types.array(types.undefined).checker([undefined, 123]).message,
    `[Array Check] Type "number" could not be assigned to type "undefined"`,
  );
});

test("it should complain when receiving a boolean within an array of type undefined", t => {
  t.is(
    types.array(types.undefined).checker([undefined, true]).message,
    `[Array Check] Type "boolean" could not be assigned to type "undefined"`,
  );
});

test("it should complain when receiving a Date within an array of type undefined", t => {
  t.is(
    types.array(types.undefined).checker([new Date(), undefined]).message,
    `[Array Check] Type "Date" could not be assigned to type "undefined"`,
  );
});

// GENERIC ARRAY TYPE EXCEPTIONS

test("it should not allow to set an array type without a base type", t => {
  const error = t.throws(() => types.array(), TypeError);
  t.is(error.message, `Array type must be declared with a base type as it's argument`);
});

test("it should not allow to set an array type without a valid base type", t => {
  const error = t.throws(() => types.array({ will: "fail" }), TypeError);
  t.is(error.message, `The declared type of the array is not a valid base type`);
});

// ENUMERATION TYPE

test("it should be of type enumeration", t => {
  t.true(types.enum(["ONE", "TWO", "THREE", "FOUR"]).checker("TWO").success);
});

test("it should not allow to set a number within an enumeration type", t => {
  t.is(
    types.enum(["ONE", "TWO", "THREE", "FOUR"]).checker(20).message,
    `Type "number" is not a valid type for an enumeration`,
  );
});

test("it should not allow to set a boolean within an enumeration type", t => {
  t.is(
    types.enum(["ONE", "TWO", "THREE", "FOUR"]).checker(true).message,
    `Type "boolean" is not a valid type for an enumeration`,
  );
});

test("it should not allow to set a null within an enumeration type", t => {
  t.is(
    types.enum(["ONE", "TWO", "THREE", "FOUR"]).checker(null).message,
    `Type "null" is not a valid type for an enumeration`,
  );
});

test("it should not allow to set an undefined within an enumeration type", t => {
  t.is(
    types.enum(["ONE", "TWO", "THREE", "FOUR"]).checker(undefined).message,
    `Type "undefined" is not a valid type for an enumeration`,
  );
});

test("it should not allow to set a Date within an enumeration type", t => {
  t.is(
    types.enum(["ONE", "TWO", "THREE", "FOUR"]).checker(new Date()).message,
    `Type "Date" is not a valid type for an enumeration`,
  );
});

test("it should complain when it doesn't find a match within the enumeration type", t => {
  t.is(
    types.enum(["ONE", "TWO", "THREE", "FOUR"]).checker("FIVE").message,
    `FIVE doesn't match any of the enumerations: ONE,TWO,THREE,FOUR`,
  );
});

// GENERIC ENUMERATION TYPE EXCEPTIONS

test("it should not allow to set an enumeration type without any enumeration", t => {
  const error = t.throws(() => types.enum(), TypeError);
  t.is(
    error.message,
    `Enumeration type must be declared with an array of strings as it's argument with at least one value`,
  );
});

test("it should complain when trying to set a not valid enumeration type", t => {
  const error = t.throws(() => types.enum(["ONE", 2, "THREE", "FOUR"]), TypeError);
  t.is(error.message, `Enumeration type must be an array of string literals`);
});

// LITERAL TYPE

test("it should be of type literal", t => {
  t.true(types.literal("CRATEBOX").checker("CRATEBOX").success);
});

test("it should not allow to set a literal with a number type", t => {
  t.is(types.literal("CRATEBOX").checker(20).message, `Type "number" is not a valid type for a string literal`);
});

test("it should not allow to set a literal with a boolean type", t => {
  t.is(types.literal("CRATEBOX").checker(true).message, `Type "boolean" is not a valid type for a string literal`);
});

test("it should not allow to set a literal with an undefined type", t => {
  t.is(
    types.literal("CRATEBOX").checker(undefined).message,
    `Type "undefined" is not a valid type for a string literal`,
  );
});

test("it should not allow to set a literal with a null type", t => {
  t.is(types.literal("CRATEBOX").checker(null).message, `Type "null" is not a valid type for a string literal`);
});

test("it should not allow to set a literal with a date type", t => {
  t.is(types.literal("CRATEBOX").checker(new Date()).message, `Type "Date" is not a valid type for a string literal`);
});

test("it should complain when the given literal doesn't match with the required", t => {
  t.is(types.literal("CRATEBOX").checker("REDUX").message, `REDUX doesn't match with the string literal CRATEBOX`);
});

// GENERIC LITERAL TYPE EXCEPTIONS

test("it should complain when trying to define a string literal that's not a string type", t => {
  const error = t.throws(() => types.literal(20), TypeError);
  t.is(error.message, `Literal type must be declared with a string literal to check against`);
});

// FROZEN TYPE

test("it should be of type frozen", t => {
  t.true(
    types.frozen({ name: types.string, lastName: types.string }).checker({ name: "Alex", lastName: "Casillas" })
      .success,
  );
});

test("it should not allow to set something different (number) than an object", t => {
  t.is(
    types.frozen({ name: types.string, lastName: types.string }).checker(20).message,
    `Type "number" is not a valid frozen type`,
  );
});

test("it should not allow to set something different (boolean) than an object", t => {
  t.is(
    types.frozen({ name: types.string, lastName: types.string }).checker(true).message,
    `Type "boolean" is not a valid frozen type`,
  );
});

test("it should not allow to set something different (null) than an object", t => {
  t.is(
    types.frozen({ name: types.string, lastName: types.string }).checker(null).message,
    `Type "null" is not a valid frozen type`,
  );
});

test("it should not allow to set something different (undefined) than an object", t => {
  t.is(
    types.frozen({ name: types.string, lastName: types.string }).checker(undefined).message,
    `Type "undefined" is not a valid frozen type`,
  );
});

test("it should not allow to set something different (date) than an object", t => {
  t.is(
    types.frozen({ name: types.string, lastName: types.string }).checker(new Date()).message,
    `Type "Date" is not a valid frozen type`,
  );
});

// FROZEN TYPE STRING TYPE PROPERTY

test("it should not allow to set a property different (number) than the declared frozen property type (string)", t => {
  t.is(
    types.frozen({ name: types.string }).checker({ name: 12 }).message,
    `[Frozen Check] Type "number" could not be assigned to type "string" on property "name"`,
  );
});

test("it should not allow to set a property different (boolean) than the declared frozen property type (string)", t => {
  t.is(
    types.frozen({ name: types.string }).checker({ name: true }).message,
    `[Frozen Check] Type "boolean" could not be assigned to type "string" on property "name"`,
  );
});

test("it should not allow to set a property different (undefined) than the declared frozen property type (string)", t => {
  t.is(
    types.frozen({ name: types.string }).checker({ name: undefined }).message,
    `[Frozen Check] Type "undefined" could not be assigned to type "string" on property "name"`,
  );
});

test("it should not allow to set a property different (Date) than the declared frozen property type (string)", t => {
  t.is(
    types.frozen({ name: types.string }).checker({ name: new Date() }).message,
    `[Frozen Check] Type "Date" could not be assigned to type "string" on property "name"`,
  );
});

// FROZEN TYPE NUMBER TYPE PROPERTY

test("it should not allow to set a property different (string) than the declared frozen property type (number)", t => {
  t.is(
    types.frozen({ age: types.number }).checker({ age: "12" }).message,
    `[Frozen Check] Type "string" could not be assigned to type "number" on property "age"`,
  );
});

test("it should not allow to set a property different (boolean) than the declared frozen property type (number)", t => {
  t.is(
    types.frozen({ age: types.number }).checker({ age: true }).message,
    `[Frozen Check] Type "boolean" could not be assigned to type "number" on property "age"`,
  );
});

test("it should not allow to set a property different (undefined) than the declared frozen property type (number)", t => {
  t.is(
    types.frozen({ age: types.number }).checker({ age: undefined }).message,
    `[Frozen Check] Type "undefined" could not be assigned to type "number" on property "age"`,
  );
});

test("it should not allow to set a property different (Date) than the declared frozen property type (number)", t => {
  t.is(
    types.frozen({ age: types.number }).checker({ age: new Date() }).message,
    `[Frozen Check] Type "Date" could not be assigned to type "number" on property "age"`,
  );
});

// FROZEN TYPE BOOLEAN TYPE PROPERTY

test("it should not allow to set a property different (string) than the declared frozen property type (boolean)", t => {
  t.is(
    types.frozen({ admin: types.boolean }).checker({ admin: "yes" }).message,
    `[Frozen Check] Type "string" could not be assigned to type "boolean" on property "admin"`,
  );
});

test("it should not allow to set a property different (number) than the declared frozen property type (boolean)", t => {
  t.is(
    types.frozen({ admin: types.boolean }).checker({ admin: 123 }).message,
    `[Frozen Check] Type "number" could not be assigned to type "boolean" on property "admin"`,
  );
});

test("it should not allow to set a property different (null) than the declared frozen property type (boolean)", t => {
  t.is(
    types.frozen({ admin: types.boolean }).checker({ admin: null }).message,
    `[Frozen Check] Type "null" could not be assigned to type "boolean" on property "admin"`,
  );
});

test("it should not allow to set a property different (undefined) than the declared frozen property type (boolean)", t => {
  t.is(
    types.frozen({ admin: types.boolean }).checker({ admin: undefined }).message,
    `[Frozen Check] Type "undefined" could not be assigned to type "boolean" on property "admin"`,
  );
});

test("it should not allow to set a property different (Date) than the declared frozen property type (boolean)", t => {
  t.is(
    types.frozen({ admin: types.boolean }).checker({ admin: new Date() }).message,
    `[Frozen Check] Type "Date" could not be assigned to type "boolean" on property "admin"`,
  );
});

// FROZEN TYPE NULL TYPE PROPERTY

test("it should not allow to set a property different (string) than the declared frozen property type (null)", t => {
  t.is(
    types.frozen({ admin: types.null }).checker({ admin: "yes" }).message,
    `[Frozen Check] Type "string" could not be assigned to type "null" on property "admin"`,
  );
});

test("it should not allow to set a property different (number) than the declared frozen property type (null)", t => {
  t.is(
    types.frozen({ admin: types.null }).checker({ admin: 123 }).message,
    `[Frozen Check] Type "number" could not be assigned to type "null" on property "admin"`,
  );
});

test("it should not allow to set a property different (undefined) than the declared frozen property type (null)", t => {
  t.is(
    types.frozen({ admin: types.null }).checker({ admin: undefined }).message,
    `[Frozen Check] Type "undefined" could not be assigned to type "null" on property "admin"`,
  );
});

test("it should not allow to set a property different (Date) than the declared frozen property type (null)", t => {
  t.is(
    types.frozen({ admin: types.null }).checker({ admin: new Date() }).message,
    `[Frozen Check] Type "Date" could not be assigned to type "null" on property "admin"`,
  );
});

// FROZEN TYPE UNDEFINED TYPE PROPERTY

test("it should not allow to set a property different (string) than the declared frozen property type (undefined)", t => {
  t.is(
    types.frozen({ admin: types.undefined }).checker({ admin: "yes" }).message,
    `[Frozen Check] Type "string" could not be assigned to type "undefined" on property "admin"`,
  );
});

test("it should not allow to set a property different (number) than the declared frozen property type (undefined)", t => {
  t.is(
    types.frozen({ admin: types.undefined }).checker({ admin: 123 }).message,
    `[Frozen Check] Type "number" could not be assigned to type "undefined" on property "admin"`,
  );
});

test("it should not allow to set a property different (null) than the declared frozen property type (undefined)", t => {
  t.is(
    types.frozen({ admin: types.undefined }).checker({ admin: null }).message,
    `[Frozen Check] Type "null" could not be assigned to type "undefined" on property "admin"`,
  );
});

test("it should not allow to set a property different (Date) than the declared frozen property type (undefined)", t => {
  t.is(
    types.frozen({ admin: types.undefined }).checker({ admin: new Date() }).message,
    `[Frozen Check] Type "Date" could not be assigned to type "undefined" on property "admin"`,
  );
});

// FROZEN TYPE DATE TYPE PROPERTY

test("it should not allow to set a property different (string) than the declared frozen property type (Date)", t => {
  t.is(
    types.frozen({ birthDate: types.date }).checker({ birthDate: "yes" }).message,
    `[Frozen Check] Type "string" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test("it should not allow to set a property different (number) than the declared frozen property type (Date)", t => {
  t.is(
    types.frozen({ birthDate: types.date }).checker({ birthDate: 123 }).message,
    `[Frozen Check] Type "number" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test("it should not allow to set a property different (boolean) than the declared frozen property type (Date)", t => {
  t.is(
    types.frozen({ birthDate: types.date }).checker({ birthDate: true }).message,
    `[Frozen Check] Type "boolean" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test("it should not allow to set a property different (undefined) than the declared frozen property type (Date)", t => {
  t.is(
    types.frozen({ birthDate: types.date }).checker({ birthDate: undefined }).message,
    `[Frozen Check] Type "undefined" could not be assigned to type "Date" on property "birthDate"`,
  );
});

/**
 * COMPLEX TYPES
 */

// ARRAY TYPE OF FROZEN WITH STRING PROPERTY

test("it should not allow to set a frozen property different (number) than the declared within the array of frozen type with property (string)", t => {
  t.is(
    types.array(types.frozen({ name: types.string })).checker([{ name: 28 }]).message,
    `[Array Check] [Frozen Check] Type "number" could not be assigned to type "string" on property "name"`,
  );
});

test("it should not allow to set a frozen property different (boolean) than the declared within the array of frozen type with property (string)", t => {
  t.is(
    types.array(types.frozen({ name: types.string })).checker([{ name: true }]).message,
    `[Array Check] [Frozen Check] Type "boolean" could not be assigned to type "string" on property "name"`,
  );
});

test("it should not allow to set a frozen property different (undefined) than the declared within the array of frozen type with property (string)", t => {
  t.is(
    types.array(types.frozen({ name: types.string })).checker([{ name: undefined }]).message,
    `[Array Check] [Frozen Check] Type "undefined" could not be assigned to type "string" on property "name"`,
  );
});

test("it should not allow to set a frozen property different (Date) than the declared within the array of frozen type with property (string)", t => {
  t.is(
    types.array(types.frozen({ name: types.string })).checker([{ name: new Date() }]).message,
    `[Array Check] [Frozen Check] Type "Date" could not be assigned to type "string" on property "name"`,
  );
});

// ARRAY TYPE OF FROZEN WITH NUMBER PROPERTY

test("it should not allow to set a frozen property different (string) than the declared within the array of frozen type with property (number)", t => {
  t.is(
    types.array(types.frozen({ age: types.number })).checker([{ age: "28" }]).message,
    `[Array Check] [Frozen Check] Type "string" could not be assigned to type "number" on property "age"`,
  );
});

test("it should not allow to set a frozen property different (boolean) than the declared within the array of frozen type with property (number)", t => {
  t.is(
    types.array(types.frozen({ age: types.number })).checker([{ age: true }]).message,
    `[Array Check] [Frozen Check] Type "boolean" could not be assigned to type "number" on property "age"`,
  );
});

test("it should not allow to set a frozen property different (undefined) than the declared within the array of frozen type with property (number)", t => {
  t.is(
    types.array(types.frozen({ age: types.number })).checker([{ age: undefined }]).message,
    `[Array Check] [Frozen Check] Type "undefined" could not be assigned to type "number" on property "age"`,
  );
});

test("it should not allow to set a frozen property different (Date) than the declared within the array of frozen type with property (number)", t => {
  t.is(
    types.array(types.frozen({ age: types.number })).checker([{ age: new Date() }]).message,
    `[Array Check] [Frozen Check] Type "Date" could not be assigned to type "number" on property "age"`,
  );
});

// ARRAY TYPE OF FROZEN WITH NULL PROPERTY

test("it should not allow to set a frozen property different (string) than the declared within the array of frozen type with property (null)", t => {
  t.is(
    types.array(types.frozen({ valid: types.null })).checker([{ valid: "28" }]).message,
    `[Array Check] [Frozen Check] Type "string" could not be assigned to type "null" on property "valid"`,
  );
});

test("it should not allow to set a frozen property different (boolean) than the declared within the array of frozen type with property (null)", t => {
  t.is(
    types.array(types.frozen({ valid: types.null })).checker([{ valid: true }]).message,
    `[Array Check] [Frozen Check] Type "boolean" could not be assigned to type "null" on property "valid"`,
  );
});

test("it should not allow to set a frozen property different (undefined) than the declared within the array of frozen type with property (null)", t => {
  t.is(
    types.array(types.frozen({ valid: types.null })).checker([{ valid: undefined }]).message,
    `[Array Check] [Frozen Check] Type "undefined" could not be assigned to type "null" on property "valid"`,
  );
});

test("it should not allow to set a frozen property different (Date) than the declared within the array of frozen type with property (null)", t => {
  t.is(
    types.array(types.frozen({ valid: types.null })).checker([{ valid: new Date() }]).message,
    `[Array Check] [Frozen Check] Type "Date" could not be assigned to type "null" on property "valid"`,
  );
});

// ARRAY TYPE OF FROZEN WITH UNDEFINED PROPERTY

test("it should not allow to set a frozen property different (string) than the declared within the array of frozen type with property (undefined)", t => {
  t.is(
    types.array(types.frozen({ valid: types.undefined })).checker([{ valid: "28" }]).message,
    `[Array Check] [Frozen Check] Type "string" could not be assigned to type "undefined" on property "valid"`,
  );
});

test("it should not allow to set a frozen property different (boolean) than the declared within the array of frozen type with property (undefined)", t => {
  t.is(
    types.array(types.frozen({ valid: types.undefined })).checker([{ valid: true }]).message,
    `[Array Check] [Frozen Check] Type "boolean" could not be assigned to type "undefined" on property "valid"`,
  );
});

test("it should not allow to set a frozen property different (undefined) than the declared within the array of frozen type with property (undefined)", t => {
  t.is(
    types.array(types.frozen({ valid: types.undefined })).checker([{ valid: null }]).message,
    `[Array Check] [Frozen Check] Type "null" could not be assigned to type "undefined" on property "valid"`,
  );
});

test("it should not allow to set a frozen property different (Date) than the declared within the array of frozen type with property (undefined)", t => {
  t.is(
    types.array(types.frozen({ valid: types.undefined })).checker([{ valid: new Date() }]).message,
    `[Array Check] [Frozen Check] Type "Date" could not be assigned to type "undefined" on property "valid"`,
  );
});

// ARRAY TYPE OF FROZEN WITH DATE PROPERTY

test("it should not allow to set a frozen property different (string) than the declared within the array of frozen type with property (date)", t => {
  t.is(
    types.array(types.frozen({ birthDate: types.date })).checker([{ birthDate: "23/03/1990" }]).message,
    `[Array Check] [Frozen Check] Type "string" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test("it should not allow to set a frozen property different (number) than the declared within the array of frozen type with property (date)", t => {
  t.is(
    types.array(types.frozen({ birthDate: types.date })).checker([{ birthDate: 28 }]).message,
    `[Array Check] [Frozen Check] Type "number" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test("it should not allow to set a frozen property different (boolean) than the declared within the array of frozen type with property (date)", t => {
  t.is(
    types.array(types.frozen({ birthDate: types.date })).checker([{ birthDate: true }]).message,
    `[Array Check] [Frozen Check] Type "boolean" could not be assigned to type "Date" on property "birthDate"`,
  );
});

test("it should not allow to set a frozen property different (undefined) than the declared within the array of frozen type with property (date)", t => {
  t.is(
    types.array(types.frozen({ birthDate: types.date })).checker([{ birthDate: undefined }]).message,
    `[Array Check] [Frozen Check] Type "undefined" could not be assigned to type "Date" on property "birthDate"`,
  );
});
