/**
 * Advanced Type System
 * Advanced Type System consists on objects that store will check against.
 * The object definition has the following properties:
 *    name: string literal for error purposes
 *    checker: function that will make the type checking
 */
export const advancedTypes = {
  array: function(type) {
    return {
      name: 'array',
      type: type,
      checker(v) {
        // Check if we have a defined type
        if (this.type === undefined) return false;
        // Check if it's an array
        if (!Array.isArray(v)) return false;
        // Check if it has length 0 to prevent executing array type of elements
        if (v.length === 0) return true;
        // Set a flag for checking all of the elements
        let allOk = true;
        // Ietarte though the elements
        v.forEach(e => {
          // Check if type of this particular element matches the type of this array
          if (!this.type.checker(e)) allOk = false;
        });
        return allOk;
      }
    };
  }
};
