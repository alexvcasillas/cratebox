export default <T, V, A>(
  state: T,
  views?: (state: T) => V,
  actions?: (state: T) => A
) => {

  const proxiedState: T = new Proxy<any>(state, {
    get(target: object, prop: string, receiver: any) {
      if (!target[prop]) return undefined;
      return Reflect.get(target, prop, receiver);
    },
    set(object: object, prop: string, value: any) {
      if (prop === '__dispatchedSecureAction') return Reflect.set(object, prop, value);
      if (!object['__dispatchedSecureAction']) {
        throw new Error(
          `Cannot manually update the [${prop}] property. Dispatch and action instead.`
        );
      }
      if (proxiedState['__dispatchedSecureAction']) delete proxiedState['__dispatchedSecureAction'];
      return Reflect.set(object, prop, value);
    },
  });

  const proxiedViews: V = new Proxy<any>(state, {
    get(_: object, prop: string, __: any) {
      return views && views(proxiedState)[prop];
    },
    set(_: object, __: string, ___: any) {
      throw new Error('Cannot force override a view');
    },
  });

  const proxiedActions: A = new Proxy<any>(state, {
    get(_: object, prop: string, __: any) {
      Object.defineProperty(proxiedState, '__dispatchedSecureAction', { value: true });
      return actions && actions(proxiedState)[prop];
    },
    set(_: object, __: string, ___: any) {
      throw new Error('Cannot force override an action');
    },
  });

  return {
    state: proxiedState,
    views: proxiedViews,
    actions: proxiedActions,
  };
}