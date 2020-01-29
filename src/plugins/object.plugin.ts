export default <T, V, A>(
  state: T,
  views?: (state: T) => V,
  actions?: (state: T) => A,
) => {

  const subscriptions = new Map<string, (state: T) => void>();

  const proxiedState: T = new Proxy<any>(state, {
    get(target: object, prop: string, receiver: any) {
      if (!target[prop]) return undefined;
      return Reflect.get(target, prop, receiver);
    },
    set(object: object, prop: string, value: any) {
      if (prop === '__dispatchedSecureAction') return Reflect.set(object, prop, value);
      if (typeof object['__dispatchedSecureAction'] === "undefined" || object['__dispatchedSecureAction'] === false) {
        throw new Error(
          `Cannot manually update the [${prop}] property. Dispatch and action instead.`
        );
      }
      // Turn off again the secure property
      object['__dispatchedSecureAction'] = false;
      if (subscriptions.size !== 0) {
        subscriptions.forEach(subscription => {
          subscription({ ...proxiedState, [prop]: value });
        });
      }
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
      if (proxiedState['__dispatchedSecureAction']) {
        proxiedState['__dispatchedSecureAction'] = true;
      } else {
        Object.defineProperty(proxiedState, '__dispatchedSecureAction', { value: true, writable: true });
      }
      return actions && actions(proxiedState)[prop];
    },
    set(_: object, __: string, ___: any) {
      throw new Error('Cannot force override an action');
    },
  });

  const subscribe = (listener: any) => {
    const identifier = `subs-${subscriptions.size + 1}`;
    subscriptions.set(identifier, listener);
    return () => {
      subscriptions.delete(identifier);
    };
  }

  return {
    state: proxiedState,
    views: proxiedViews,
    actions: proxiedActions,
    subscribe,
  };
}