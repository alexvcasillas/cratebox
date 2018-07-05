import { types } from "./types";
import { crateModel } from "./models";
import { StoreModel, Model } from "./models/store-model";

/**
 * Store System
 * Store System consists on an object that will be in charge of
 * describing the stores within it, dispatching store changes and
 * returning the current state of the store.
 */
const cratebox = function() {
  // Map that contains all of the store definitions
  const descriptions: Map<string, Model> = new Map();
  // Map that contains all of the store changes based on the store definitions
  const state: Map<string, Model> = new Map();
  // Map that contains all of the subscription listeners
  const listeners: Map<string, Function> = new Map();

  return {
    /**
     * This method describes a store based on a store model object.
     * @param {object} storeModel
     */
    describeStore(storeModel: StoreModel) {
      // Check for store model object
      if (typeof storeModel === "undefined") {
        throw new Error(`You can't define a store without a store model object`);
      }
      // Check for the identifier
      if (!storeModel.hasOwnProperty("identifier")) {
        throw new Error(`You can't describe a store without an identifier`);
      }
      // Check for the model
      if (!storeModel.hasOwnProperty("model")) {
        throw new Error(`You can't describe a store without a model`);
      }
      // Check if we already have the given store described
      if (descriptions.has(storeModel.identifier)) {
        // If we do, then throw an error complaining about it :)
        throw new Error(`You can't describe a new store with the same identifier as a previously described one.`);
      }
      // If not, then we will set a new description based on the identifier and the model
      descriptions.set(storeModel.identifier, { ...storeModel.model });
    },
    /**
     * This method returns all of the store descriptions in the store.
     */
    getStoreDescriptions(): Map<string, Model> {
      return descriptions;
    },
    /**
     * This method returns a single store description in the store by
     * the given description identifier.
     * @param {string} identifier
     */
    getStoreDescription(identifier: string): Model {
      // Check if we have definied that store description
      if (!descriptions.has(identifier)) {
        // If we don't, then throw an error complaining about it :)
        throw new Error(`You're trying to get a store description that doesn't exists.`);
      }
      // If we do, then get the descriptor of the store based on the given identifier
      return descriptions.get(identifier) || {};
    },
    /**
     * This method returns the current state of the whole store object.
     */
    getGlobalState() {
      return state;
    },
    /**
     * This method returns the current state of an specified store
     * @param {string} identifier
     */
    getState(identifier: string): Model | null {
      const theState: Model = state.get(identifier) || {};
      if (!theState) return null;
      if (state.get(identifier) || typeof state.get(identifier) !== "undefined") {
        const currentState = theState.currentState;
        return theState._data.slice(currentState, currentState + 1)[0];
      } else {
        return null;
      }
    },
    /**
     * This method dispatches a new store action to the store by
     * the given store action object.
     * @param {StoreModel} dispatchObject
     */
    dispatch(dispatchObject: StoreModel) {
      if (typeof dispatchObject === "undefined") {
        throw new Error(`You can't dispatch changes without a dispatch object: { identifier: string, model: object }`);
      }
      const { identifier, model } = dispatchObject;
      // Check for identifier
      if (!identifier) {
        throw new Error(`You need a store identifier to dispatch changes to`);
      }
      // Check for the model
      if (!model) {
        throw new Error(`You need a model with the changes you would like to apply`);
      }
      // First we need to get the store descriptor
      const descriptor: Model = this.getStoreDescription(identifier) || {};
      // Then we need to iterate through all the properties of the model we want to dispatch
      Object.keys(model).forEach(key => {
        // Check if it's a property valid for this descriptor
        if (!descriptor.hasOwnProperty(key)) {
          // If not, delete it
          delete model[key];
          return;
        }
        // Typecheck agains the descriptor type-checker :)
        if (!descriptor[key].checker(model[key])) {
          // If it's not a valid type, then throw an error complaining about it :)
          throw new Error(
            `Type "${typeof model[key]}" cannot be setted to the property ${key} described as a/an "${
              descriptor[key].name
            }"`,
          );
        }
      });
      // If all of the keys pass the type-checking then we proceed to set it into the store
      const previousState = state.get(identifier); // Get the previous state of the store
      let nextState; // Declare the next state where we will set the new state
      let nextStateObject; // Declare the next state object that will be set in the new state
      // Check if we have a previous state
      if (typeof previousState !== "undefined") {
        /**
         * If so, then simply just set the nextState as a new array with a
         * copy of the previous state data and adding to it the data model
         * nextStateObject is a merge of the previous state object and the
         * new model data, so we respect the properties that where missing
         * from a new state change.
         */
        const { model: safeModel } = crateModel({
          ...previousState._data.slice(-1)[0],
          ...model,
        }); // Safe cratebox model
        nextStateObject = safeModel; // Object.assign(crateModel({}), previousState._data.slice(-1)[0], safeModel);
        nextState = [...previousState._data, nextStateObject];
      } else {
        /**
         * If we don't have a previous state, just set the nextState
         * as a new array holding the new dispatched data model within it
         */
        const { model: safeModel } = crateModel(model); // Safe cratebox model
        nextState = [safeModel];
        // If it's our first state, we should return the nextStateObject as the received model
        nextStateObject = safeModel;
      }
      const currentState = nextState.length - 1; // Declare the current state index of the store to time travel
      state.set(identifier, { currentState: currentState, _data: nextState });
      // Check if we have a listener subscribing to this store
      if (listeners.has(identifier)) {
        // If we do, then we should call the listener :)
        const listener: Function | null = listeners.get(identifier) || null;
        if (listener) listener(nextStateObject);
      } else {
        // If not, we warn the user that the store has changed but there's no listener attached to it
        // console.warn('A store has changed but it has no listener attached to it.');
      }
    },
    /**
     * This method adds a subscription to a store making it reactive to changes
     * triggered by the store's dispatch method.
     * @param {string} store
     * @param {Function} listener
     */
    subscribe(store: string, listener: Function) {
      // Check if we have a defined store to attached the listener to
      if (typeof store === "undefined") {
        // If we don't, then throw an error complaining about it :)
        throw new Error(`The subscription method needs a store to subscribe to`);
      }
      // Check if we have a defined function for the listener callback
      if (typeof listener !== "function") {
        // If we don't, then throw an error complaining about it :)
        throw new Error(`Subscribe listener is expected to be a function.`);
      }
      // Check if we're trying to set a listener for a non-existent store
      if (!descriptions.has(store)) {
        // If we do, then throw an error complaining about it :)
        throw new Error(`You're tyring to subscribe changes for a non-existent store.`);
      }
      // Check if we already have a listener defined for this store
      if (listeners.has(store)) {
        // If we do, then throw an error complaining about it :)
        throw new Error(`You're trying to set a listener to a store that already has a listener attached to it.`);
      }
      // Add the listener to the store
      listeners.set(store, listener);
    },
    /**
     * This method makes a store time travel forwards
     * by the given identifier.
     * @param {string} identifier
     */
    travelForwards(identifier: string): void {
      // Get the state
      const storedState = state.get(identifier) || null;
      if (!storedState) return;
      // Obtain the nextStateIndex that is the current state + 1
      const nextStateIndex = storedState.currentState + 1;
      // Check if we have and index out of bounds :)
      if (nextStateIndex >= storedState._data.length) {
        // If we do, we warn the user that the store has nothing more beyond this state
        // console.warn(`You can't keep traveling forwards within this store`);
      } else {
        // Set the Current State to the next state index
        state.set(identifier, { ...storedState, currentState: nextStateIndex });
        // Then call the subscribed listener of the store with the current state :)
        // Check if we have a listener subscribing to this store
        if (listeners.has(identifier)) {
          // If we do, then we should call the listener :)
          const listener: Function | null = listeners.get(identifier) || null;
          if (listener) listener(this.getState(identifier));
        } else {
          // If not, we warn the user that the store has changed but there's no listener attached to it
          // console.warn('A store has changed but it has no listener attached to it.');
        }
      }
    },
    /**
     * This method makes a store time travel backwards
     * by the given identifier.
     * @param {string} identifier
     */
    travelBackwards(identifier: string): void {
      // Get the state
      const storedState = state.get(identifier) || null;
      if (!storedState) return;
      // Obtain the nextStateIndex that is the current state - 1
      const previousStateIndex = storedState.currentState - 1;
      // Check if we have and index out of bounds :)
      if (previousStateIndex < 0) {
        // If we do, we warn the user that the store has nothing more beyond this state
        // console.warn(`You can't keep traveling backwards within this store`);
      } else {
        // Set the Current State to the next state index
        state.set(identifier, {
          ...storedState,
          currentState: previousStateIndex,
        });
        // Then call the subscribed listener of the store with the current state :)
        // Check if we have a listener subscribing to this store
        if (listeners.has(identifier)) {
          // If we do, then we should call the listener :)
          const listener: Function | null = listeners.get(identifier) || null;
          if (listener) listener(this.getState(identifier));
        } else {
          // If not, we warn the user that the store has changed but there's no listener attached to it
          // console.warn('A store has changed but it has no listener attached to it.');
        }
      }
    },
    /**
     * This method makes a store time travel to
     * a certain state based on the given index and by
     * the given identifier.
     * @param {string} identifier
     * @param {number} index
     */
    travelTo(identifier: string, index: number): void {},
  };
};

export { types, cratebox };
