import { checkerResponse } from "../utils/base.utils";

/**
 * Base Type System
 * Base Type System consists on objects that store will check against.
 * The object definition has the following properties:
 *    name: string literal for error purposes
 *    checker: function that will make the type checking
 */
export const baseTypes = {
  string: {
    name: "string",
    checker: (v: string | null | Date): checkerResponse =>
      typeof v === "string" || v === null
        ? { success: true }
        : {
            success: false,
            message: `Type "${v instanceof Date ? "Date" : typeof v}" could not be assigned to type "string"`,
          },
  },
  number: {
    name: "number",
    checker: (v: number | null | Date): checkerResponse =>
      typeof v === "number" || v === null
        ? { success: true }
        : {
            success: false,
            message: `Type "${v instanceof Date ? "Date" : typeof v}" could not be assigned to type "number"`,
          },
  },
  boolean: {
    name: "boolean",
    checker: (v: boolean | Date): checkerResponse =>
      typeof v === "boolean"
        ? { success: true }
        : {
            success: false,
            message: `Type "${
              v instanceof Date ? "Date" : v === null ? "null" : typeof v
            }" could not be assigned to type "boolean"`,
          },
  },
  null: {
    name: "null",
    checker: (v: null | Date): checkerResponse =>
      v === null
        ? { success: true }
        : {
            success: false,
            message: `Type "${v instanceof Date ? "Date" : typeof v}" could not be assigned to type "null"`,
          },
  },
  undefined: {
    name: "undefined",
    checker: (v: undefined | null | Date): checkerResponse =>
      typeof v === "undefined"
        ? { success: true }
        : {
            success: false,
            message: `Type "${
              v instanceof Date ? "Date" : v === null ? "null" : typeof v
            }" could not be assigned to type "undefined"`,
          },
  },
  date: {
    name: "date",
    checker: (v: Date | null): checkerResponse =>
      v instanceof Date || v === null
        ? { success: true }
        : { success: false, message: `Type "${v === null ? "null" : typeof v}" could not be assigned to type "Date"` },
  },
};
