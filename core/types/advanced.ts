import { isArray, keyList, checkerResponse } from "../utils/base.utils";
import { Model } from "../models/store-model";

/**
 * This function checks if the function has received a parameter
 * @param {any} param
 */
function isUndefined(param: any): boolean {
  return typeof param === "undefined";
}

/**
 * This function checks if the type checker provider is indeed a function
 * @param {function} typeChecker
 */
function checkTypeChecker(type: any): boolean {
  return !isUndefined(type) && type.name && type.name !== "" && type.checker && typeof type.checker === "function";
}

/**
 * This function checks if the provided value is a plain object
 * @param {object} value
 */
function isPlainObject(value: object): boolean {
  if (value === null || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
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
  array: function(type: any) {
    if (isUndefined(type)) {
      throw new TypeError(`Array type must be declared with a base type as it's argument`);
    }
    if (!checkTypeChecker(type)) {
      throw new TypeError(`The declared type of the array is not a valid base type`);
    }
    return {
      name: "array",
      type: type,
      checker(v: Array<any>): checkerResponse {
        // Check if it's an array
        if (!isArray(v)) return { success: false, message: `Type "${typeof v}" could not be assigned to an Array` };
        // Check if it has length 0 to prevent executing array type of elements
        if (v.length === 0) return { success: true };
        // Ietarte through the elements
        let iterationError: checkerResponse | null = null;
        for (let index = 0; index < v.length; index++) {
          const element = v[index];
          const checkResult = this.type.checker(element);
          if (!checkResult.success) {
            iterationError = { success: false, message: `[Array Check] ${checkResult.message}` };
            break;
          }
        }
        return iterationError || { success: true };
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
  enum: function(enumeration: Array<string>) {
    if (isUndefined(enumeration) || !Array.isArray(enumeration) || enumeration.length === 0) {
      throw new TypeError(
        `Enumeration type must be declared with an array of strings as it's argument with at least one value`,
      );
    }
    enumeration.forEach(value => {
      if (typeof value !== "string") {
        throw new TypeError(`Enumeration type must be an array of string literals`);
      }
    });
    return {
      name: "enum",
      enums: enumeration,
      checker(v: string | null | Date): checkerResponse {
        if (typeof v !== "string")
          return {
            success: false,
            message: `Type "${
              v instanceof Date ? "Date" : v === null ? "null" : typeof v
            }" is not a valid type for an enumeration`,
          };
        return this.enums.includes(v)
          ? { success: true }
          : { success: false, message: `${v} doesn't match any of the enumerations: ${this.enums}` };
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
  literal: function(literal: string) {
    if (isUndefined(literal) || typeof literal !== "string") {
      throw new TypeError(`Literal type must be declared with a string literal to check against`);
    }
    return {
      name: "literal",
      literal: literal,
      checker(v: string | null | Date): checkerResponse {
        if (typeof v !== "string")
          return {
            success: false,
            message: `Type "${
              v instanceof Date ? "Date" : v === null ? "null" : typeof v
            }" is not a valid type for a string literal`,
          };
        if (v !== literal)
          return { success: false, message: `${v} doesn't match with the string literal ${this.literal}` };
        return { success: true };
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
  optional: function(type: any, defaultValue: any) {
    if (isUndefined(type) || isUndefined(defaultValue)) {
      throw new TypeError(`Optional type must be declared with a type plus a default value for that type`);
    }
    return {
      name: "optional",
      type: type,
      defaultValue: defaultValue,
      checker(v: any): boolean {
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
  frozen: function(obj: Model) {
    if (isUndefined(obj) || !isPlainObject(obj)) {
      throw new TypeError(`Frozen type must be declared with an object literal`);
    }
    return {
      name: "frozen",
      properties: obj,
      checker(model: Model | null | Date): checkerResponse {
        if (model === null || model instanceof Date || !isPlainObject(model))
          return {
            success: false,
            message: `Type "${
              model instanceof Date ? "Date" : model === null ? "null" : typeof model
            }" is not a valid frozen type`,
          };
        try {
          keyList(model).forEach(
            (frozenProperty: any): checkerResponse | void => {
              const { success, message } = this.properties[frozenProperty].checker(model[frozenProperty]);
              if (!success) throw new TypeError(`[Frozen Check] ${message} on property "${frozenProperty}"`);
            },
          );
        } catch (error) {
          return { success: false, message: error.message };
        }
        return { success: true };
      },
    };
  },
};
