/**
 * Advanced Type System
 * Advanced Type System consists on objects that store will check against.
 * The object definition has the following properties:
 *    name: string literal for error purposes
 *    checker: function that will make the type checking
 */
export const advancedTypes = {
  array: function(type) {
    if (typeof type === 'undefined') {
      throw new TypeError(`Array type must be declared with a base type as it's argument`);
    }
    if (!type.name || !type.checker || typeof type.checker !== 'function') {
      throw new TypeError(`The declared type of the array is not a valid base type`);
    }
    return {
      name: 'array',
      type: type,
      checker(v) {
        // Check if it's an array
        if (!Array.isArray(v)) return false;
        // Check if it has length 0 to prevent executing array type of elements
        if (v.length === 0) return true;
        // Set a flag for checking all of the elements
        let allOk = true;
        // Ietarte through the elements
        v.forEach(e => {
          // Check if the type of this particular element matches the type of this array
          if (!this.type.checker(e)) allOk = false;
        });
        return allOk;
      },
    };
  },
  enum: function(enumeration) {
    if (typeof enumeration === 'undefined' || !Array.isArray(enumeration) || enumeration.length === 0) {
      throw new Error(
        `Enumeration type must be declared with an array of strings as it's argument with at least one value`,
      );
    }
    enumeration.forEach(value => {
      if (typeof value !== 'string') {
        throw new TypeError(`Enumeration type must be an array of string literals`);
      }
    });
    return {
      name: 'enum',
      enums: enumeration,
      checker(v) {
        return this.enums.includes(v);
      },
    };
  },
};
