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
  }
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
    this.descriptions.set(storeModel.identifier, storeModel.model);
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
  getState() {
    return this.state;
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
    this.state.set(identifier, model);
  }
};

// Describe a new store
store.describeStore({
  identifier: 'user',
  model: {
    name: types.string,
    lastName: types.string,
    age: types.number
  }
});

console.log('Store state');
console.log(store.getState());
console.log('----');
// Dispatch a new action the the user store
store.dispatch({
  identifier: 'user',
  model: {
    name: 'Alex',
    lastName: 'Casillas',
    age: 27
  }
});
console.log('Store descriptions');
console.log(store.getStoreDescriptions());
console.log('----');
console.log('Store state');
console.log(store.getState());
