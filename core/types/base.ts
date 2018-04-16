/**
 * Base Type System
 * Base Type System consists on objects that store will check against.
 * The object definition has the following properties:
 *    name: string literal for error purposes
 *    checker: function that will make the type checking
 */
export const baseTypes = {
  string: {
    name: 'string',
    checker: (v: string) => typeof v === 'string'
  },
  number: {
    name: 'number',
    checker: (v: number) => typeof v === 'number'
  },
  boolean: {
    name: 'boolean',
    checker: (v: boolean) => typeof v === 'boolean'
  },
  null: {
    name: 'null',
    checker: (v: null) => v === null
  },
  undefined: {
    name: 'undefined',
    checker: (v: undefined) => typeof v === 'undefined'
  },
  date: {
    name: 'date',
    checker: (v: Date) => v instanceof Date
  }
};
