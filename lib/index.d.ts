import { types } from './types';
/**
 * Store System
 * Store System consists on an object that will be in charge of
 * describing the stores within it, dispatching store changes and
 * returning the current state of the store.
 */
declare const store: {
    descriptions: Map<any, any>;
    state: Map<any, any>;
    listeners: Map<any, any>;
    describeStore(storeModel: any): void;
    getStoreDescriptions(): Map<any, any>;
    getStoreDescription(identifier: any): any;
    getGlobalState(): Map<any, any>;
    getState(identifier: any): any;
    dispatch({ identifier, model }: {
        identifier: any;
        model: any;
    }): void;
    travelForwards(identifier: any): void;
    travelBackwards(identifier: any): void;
    travelTo(identifier: any, index: any): void;
    subscribe(store: any, listener: any): void;
};
export { types, store };
