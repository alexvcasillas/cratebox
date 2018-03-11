/**
 * Type System
 * Type System consists on objects that store will check against.
 * The object definition has the following properties:
 *    name: string literal for error purposes
 *    checker: function that will make the type checking
 */
export const types = {
  string: {
    name: 'string',
    checker: v => typeof v === 'string',
  },
  number: {
    name: 'number',
    checker: v => typeof v === 'number',
  },
  boolean: {
    name: 'boolean',
    checker: v => typeof v === 'boolean',
  },
  null: {
    name: 'null',
    checker: v => typeof v === null,
  },
  undefined: {
    name: 'undefined',
    checker: v => typeof v === 'undefined',
  },
  date: {
    name: 'date',
    checker: v => v instanceof Date,
  },
};
