export const crateModel = model => {
  let theObject = new Proxy(model, {
    get: function(target, prop, receiver) {
      return Reflect.get(...arguments);
    },
    set: function(target, property, value, receiver) {
      throw new Error(`You must dispatch an action to change a property of the model`);
    },
  });
  return {
    model: theObject,
  };
};
