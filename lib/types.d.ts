/**
 * Type System
 * Type System consists on objects that store will check against.
 * The object definition has the following properties:
 *    name: string literal for error purposes
 *    checker: function that will make the type checking
 */
export declare const types: {
    string: {
        name: string;
        checker: (v: any) => boolean;
    };
    number: {
        name: string;
        checker: (v: any) => boolean;
    };
    boolean: {
        name: string;
        checker: (v: any) => boolean;
    };
    null: {
        name: string;
        checker: (v: any) => boolean;
    };
    undefined: {
        name: string;
        checker: (v: any) => boolean;
    };
    date: {
        name: string;
        checker: (v: any) => boolean;
    };
};
