/**
 * This function checks if the function has received a parameter
 * @param {any} param
 */
function isUndefined(param) {
  return typeof param === 'undefined';
}

/**
 * This function checks if the type checker provider is indeed a function
 * @param {function} typeChecker
 */
function checkTypeChecker(type) {
  return !isUndefined(type) && type.name && type.name !== '' && type.checker && typeof type.checker === 'function';
}

/**
 * This function checks if the provided value is a plain object
 * @param {object} value 
 */
function isPlainObject(value) {
  if (value === null || typeof value !== "object") return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/**
 * Advanced Type System
 * Consists on objects that store will check against.
 */
export const advancedTypes = {
  /**
   * Array Type
   * The array type has the following properties:
   *    name: name of the type for error feedback
   *    checker: function to check types against
   *    type: base type of the array
   * Behaviour:
   * Array type should be called as a function and the checker will check all of the
   * elements within the array to make sure that all of them are of the same type
   * as the declared array.
   */
  array: function (type) {
    if (isUndefined(type)) {
      throw new TypeError(`Array type must be declared with a base type as it's argument`);
    }
    if (!checkTypeChecker(type)) {
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
  /**
   * Enum Type
   * The Enumeration type has the following properties:
   *    name: name of the type for error feedback
   *    checker: function to check types against
   *    enums: array of literal strings
   * Behaviour:
   * Enum type should only contain one of the described literals
   */
  enum: function (enumeration) {
    if (isUndefined(enumeration) || !Array.isArray(enumeration) || enumeration.length === 0) {
      throw new TypeError(
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
  /**
   * Literal Type
   * The Literal type has the following properties:
   *    name: name of the type for error feedback
   *    checker: function to check types against
   *    literal: the literal to check against
   * Behaviour:
   * Literal type should only contain the described string literal
   */
  literal: function (literal) {
    if (isUndefined(literal) || typeof literal !== 'string') {
      throw new TypeError(`Literal type must be declared with a string literal to check against`);
    }
    return {
      name: 'literal',
      literal: literal,
      checker(v) {
        return v === literal;
      },
    };
  },
  /**
   * Optional Type
   * The Optional type has the following properties:
   *    name: name of the type for error feedback
   *    checker: function to check types against
   *    type: base type for this optional type
   *    defaultValue: the default value in case a value is not provided
   */
  optional: function (type, defaultValue) {
    if (isUndefined(type) || isUndefined(defaultValue)) {
      throw new TypeError(`Optional type must be declared with a type plus a default value for that type`);
    }
    return {
      name: 'optional',
      type: type,
      defaultValue: defaultValue,
      checker(v) {
        // TODO
        return this.type.checker(v);
      },
    };
  },
  /**
   * Frozen Type
   * The Frozen type has the following properties
   *    name: name of the type for error feedback
   *    checker: function to check types against.
   */
  frozen: function (obj) {
    if (isUndefined(obj) || !isPlainObject(obj)) {
      throw new TypeError(`Frozen type must be declared with and object literal`);
    }
    return {
      name: 'frozen',
      checker(v) {
        return isPlainObject(v);
      }
    }
  }
};
