import { types } from './types';
/**
 * TypeMap Object
 * The TypeMap Object is a small override of the
 * default Map.set() functionality.
 * With this small override we ensure that Map.set()
 * is always called within a store's dispatch method.
 */
/**
 * Store System
 * Store System consists on an object that will be in charge of
 * describing the stores within it, dispatching store changes and
 * returning the current state of the store.
 */
declare const cratebox: {
    descriptions: Map<any, any>;
    state: Map<any, any>;
    listeners: Map<any, any>;
    describeStore(storeModel: any): void;
    getStoreDescriptions(): Map<any, any>;
    getStoreDescription(identifier: any): any;
    getGlobalState(): Map<any, any>;
    getState(identifier: any): any;
    dispatch({ identifier, model }: any): void;
    travelForwards(identifier: string): void;
    travelBackwards(identifier: string): void;
    travelTo(identifier: string, index: number): void;
    subscribe(store: string, listener: Function): void;
};
export { types, cratebox };
