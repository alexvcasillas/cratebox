/**
 * Type System
 * Type System consists on objects that store will check against.
 * The object definition has the following properties:
 *    name: string literal for error purposes
 *    checker: function that will make the type checking
 */
export var types = {
    string: {
        name: 'string',
        checker: function (v) { return typeof v === 'string'; }
    },
    number: {
        name: 'number',
        checker: function (v) { return typeof v === 'number'; }
    },
    boolean: {
        name: 'boolean',
        checker: function (v) { return typeof v === 'boolean'; }
    },
    null: {
        name: 'null',
        checker: function (v) { return typeof v === null; }
    },
    undefined: {
        name: 'undefined',
        checker: function (v) { return typeof v === 'undefined'; }
    },
    date: {
        name: 'date',
        checker: function (v) { return v instanceof Date; }
    }
};
//# sourceMappingURL=types.js.map