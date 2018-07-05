export const crateModel = (model: object) => {
  let theObject = new Proxy(model, {
    get: function(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    set: function(target, property, value, receiver) {
      throw new Error(`You must dispatch an action to change a property of the model`);
    },
  });
  return {
    model: theObject,
  };
};
