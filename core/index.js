/**
 * Type System
 * Type System consists on objects that store will check against.
 * The object definition has the following properties:
 *    name: string literal for error purposes
 *    checker: function that will make the type checking
 */
const types = {
  string: {
    name: 'string',
    checker: v => typeof v === 'string'
  },
  number: {
    name: 'number',
    checker: v => typeof v === 'number'
  },
  boolean: {
    name: 'boolean',
    checker: v => typeof v === 'boolean'
  },
  null: {
    name: 'null',
    checker: v => typeof v === null
  },
  undefined: {
    name: 'undefined',
    checker: v => typeof v === 'undefined'
  },
  date: {
    name: 'date',
    checker: v => v instanceof Date
  }
};

/**
 * Base Descriptor Object
 * This is the base descriptor object where all of the
 * store descriptions inherit from.
 * All of this properties are considered privates and therefore
 * should not be accesed from outside of the intented scope or
 * it may blow up the library :)
 */
const baseDescriptor = {
  _mutableProperties: false,
  _isDispatched: true
};

/**
 * Dispatched Model Object
 * This is the base object for a state change dispatched
 * via store's dispatch method.
 * If we're trying to change a property directly instead
 * of using store's dispatch method, it won't have the
 * _isDispatched property so we should throw an error
 * complaining about mutating directly the properties.
 */
const dispatchedModel = {
  _isDispatched: true
};

/**
 * TypeMap Object
 * The TypeMap Object is a small override of the
 * default Map.set() functionality.
 * With this small override we ensure that Map.set()
 * is always called within a store's dispatch method.
 */
const TypeMap = function() {
  // Declare the custom map
  const typeMap = new Map();
  // Extend the set functionality
  typeMap.set = function(...args) {
    // Check if this was a store dispatched action
    if (!args[1]._isDispatched) {
      // If it wasn't, then throw an error complaining about it :)
      throw new Error(`Direct state manipulation is not allowed. Use the store's dispatch method instead.`);
    }
  };
  // Return the new TypeMap Object :)
  return typeMap;
};

/**
 * Store System
 * Store System consists on an object that will be in charge of
 * describing the stores within it, dispatching store changes and
 * returning the current state of the store.
 */
const store = {
  // Map that contains all of the store definitions
  descriptions: new Map(),
  // Map that contains all of the store changes based on the store definitions
  state: new Map(),
  // Map that contains all of the subscription listeners
  listeners: new Map(),
  /**
   * This method describes a store based on a store model object.
   * @param {object} storeModel
   */
  describeStore(storeModel) {
    // Check if we already have the given store described
    if (this.descriptions.has(storeModel.identifier)) {
      // If we do, then throw an error complaining about it :)
      throw new Error(`You can't describe a new store with the same identifier as a previously described one.`);
    }
    // If not, then we will set a new description based on the identifier and the model
    this.descriptions.set(storeModel.identifier, { ...storeModel.model });
  },
  /**
   * This method returns all of the store descriptions in the store.
   */
  getStoreDescriptions() {
    return this.descriptions;
  },
  /**
   * This method returns a single store description in the store by
   * the given description identifier.
   * @param {string} identifier
   */
  getStoreDescription(identifier) {
    // Check if we have definied that store description
    if (!this.descriptions.has(identifier)) {
      // If we don't, then throw an error complaining about it :)
      throw new Error(`You're trying to get a store description that doesn't exists.`);
    }
    // If we do, then get the descriptor of the store based on the given identifier
    return this.descriptions.get(identifier);
  },
  /**
   * This method returns the current state of the whole store object.
   */
  getGlobalState() {
    return this.state;
  },
  /**
   * This method returns the current state of an specified store
   * @param {string} identifier
   */
  getState(identifier) {
    const currentState = this.state.get(identifier).currentState;
    return this.state.get(identifier)._data.slice(currentState, currentState + 1)[0];
  },
  /**
   * This method dispatches a new store action to the store by
   * the given store action object.
   * @param {object} storeAction
   */
  dispatch({ identifier, model }) {
    // First we need to get the store descriptor
    const descriptor = this.getStoreDescription(identifier);
    // Then we need to iterate through all the properties of the model we want to dispatch
    Object.keys(model).forEach(key => {
      // Typecheck agains the descriptor type-checker :)
      if (!descriptor[key].checker(model[key])) {
        // If it's not a valid type, then throw an error complaining about it :)
        throw new Error(
          `Type "${typeof model[key]}" cannot be setted to the property ${key} described as a "${descriptor[key].name}"`
        );
      }
    });
    // If all of the keys pass the type-checking then we proceed to set it into the store
    const previousState = this.state.get(identifier); // Get the previous state of the store
    let nextState; // Declare the next state where we will set the new state
    let nextStateObject; // Declare the next state object that will be set in the new state
    // Check if we have a previous state
    if (typeof previousState !== 'undefined') {
      /**
       * If so, then simply just set the nextState as a new array with a
       * copy of the previous state data and adding to it the data model
       * nextStateObject is a merge of the previous state object and the
       * new model data, so we respect the properties that where missing
       * from a new state change.
       */
      nextStateObject = Object.assign({}, previousState._data.slice(-1)[0], model);
      nextState = [...previousState._data, nextStateObject];
    } else {
      /**
       * If we don't have a previous state, just set the nextState
       * as a new array holding the new dispatched data model within it
       */
      nextState = [model];
      // If it's our first state, we should return the nextStateObject as the received model
      nextStateObject = model;
    }
    const currentState = nextState.length - 1; // Declare the current state index of the store to time travel
    this.state.set(identifier, { ...dispatchedModel, currentState: currentState, _data: nextState });
    // Check if we have a listener subscribing to this store
    if (this.listeners.has(identifier)) {
      // If we do, then we should call the listener :)
      this.listeners.get(identifier)(nextStateObject);
    } else {
      // If not, we warn the user that the store has changed but there's no listener attached to it
      console.warn('A store has changed but it has no listener attached to it.');
    }
  },
  /**
   * This method makes a store time travel forwards
   * by the given identifier.
   * @param {string} identifier
   */
  travelForwards(identifier) {
    // Get the state
    const state = this.state.get(identifier);
    // Obtain the nextStateIndex that is the current state + 1
    const nextStateIndex = state.currentState + 1;
    // Check if we have and index out of bounds :)
    if (nextStateIndex >= state._data.length) {
      // If we do, we warn the user that the store has nothing more beyond this state
      console.warn(`You can't keep traveling forwards within this store`);
    } else {
      // Set the Current State to the next state index
      this.state.set(identifier, { ...state, currentState: nextStateIndex });
      // Then call the subscribed listener of the store with the current state :)
      this.listeners.get(identifier)(this.getState(identifier));
    }
  },
  /**
   * This method makes a store time travel backwards
   * by the given identifier.
   * @param {string} identifier
   */
  travelBackwards(identifier) {
    // Get the state
    const state = this.state.get(identifier);
    // Obtain the nextStateIndex that is the current state - 1
    const previousStateIndex = state.currentState - 1;
    // Check if we have and index out of bounds :)
    if (previousStateIndex < 0) {
      // If we do, we warn the user that the store has nothing more beyond this state
      console.warn(`You can't keep traveling backwards within this store`);
    } else {
      // Set the Current State to the next state index
      this.state.set(identifier, { ...state, currentState: previousStateIndex });
      // Then call the subscribed listener of the store with the current state :)
      this.listeners.get(identifier)(this.getState(identifier));
    }
  },
  /**
   * This method makes a store time travel to
   * a certain state based on the given index and by
   * the given identifier.
   * @param {string} identifier
   * @param {number} index
   */
  travelTo(identifier, index) {},
  /**
   * This method adds a subscription to a store making it reactive to changes
   * triggered by the store's dispatch method.
   * @param {string} store
   * @param {function} listener
   */
  subscribe(store, listener) {
    // Check if we have a defined store to attached the listener to
    if (typeof store === 'undefined') {
      // If we don't, then throw an error complaining about it :)
      throw new Error(`The subscription method needs a store to subscribe to`);
    }
    // Check if we have a defined function for the listener callback
    if (typeof listener !== 'function') {
      // If we don't, then throw an error complaining about it :)
      throw new Error(`Subscribe listener is expected to be a function.`);
    }
    // Check if we're trying to set a listener for a non-existent store
    if (!this.descriptions.has(store)) {
      // If we do, then throw an error complaining about it :)
      throw new Error(`You're tyring to subscribe changes for a non-existent store.`);
    }
    // Check if we already have a listener defined for this store
    if (this.listeners.has(store)) {
      // If we do, then throw an error complaining about it :)
      throw new Error(`You're trying to set a listener to a store that already has a listener attached to it.`);
    }
    // Add the listener to the store
    this.listeners.set(store, listener);
  }
};

export { types, store };
