type Store<T, V, A> = {
  state: T;
  views?: V;
  actions?: A;
};

export function createStore<T, V, A>(
  state: T,
  views?: (state: T) => V,
  actions?: (state: T) => A
): Store<T, V, A> {
  const proxiedState = new Proxy<any>(state, {
    get(target: object, prop: string, receiver: any) {
      if (!target[prop] && !target['defaults'][prop]) {
        throw new Error(`Property [${prop}] doesn't exists on state.`);
      }
      if (!target[prop] && target['defaults'][prop]) {
        return target['defaults'][prop];
      }
      return Reflect.get(target, prop, receiver);
    },
    set(object: object, prop: string, value: any) {
      if (prop === 'secure') return Reflect.set(object, prop, value);
      if (!object['secure']) {
        throw new Error(
          `Cannot manually update the [${prop}] property. Dispatch and action instead.`
        );
      }
      delete proxiedState.secure;
      return Reflect.set(object, prop, value);
    },
  });

  const proxiedViews = new Proxy<any>(state, {
    get(_: object, prop: string, __: any) {
      return views && views(proxiedState)[prop];
    },
    set(_: object, __: string, ___: any) {
      throw new Error('Cannot force override a view');
    },
  });

  const proxiedActions = new Proxy<any>(state, {
    get(_: object, prop: string, __: any) {
      proxiedState.secure = true;
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
