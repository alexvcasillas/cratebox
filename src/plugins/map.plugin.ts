export default <T, V, A>(
  state: T,
  views?: (state: T) => V,
  actions?: (state: T) => A
) => {
  const proxiedState: T = state;

  const proxiedViews: V = new Proxy<any>(state, {
    get(_: object, prop: string, __: any) {
      return views && views(state)[prop];
    },
    set(_: object, __: string, ___: any) {
      throw new Error('Cannot force override a view');
    },
  });
  const proxiedActions: A = new Proxy<any>(state, {
    get(_: object, prop: string, __: any) {
      return actions && actions(state)[prop];
    },
    set(_: object, __: string, ___: any) {
      throw new Error('Cannot force override an action');
    },
  });

  return {
    state: proxiedState,
    views: proxiedViews,
    actions: proxiedActions,
  }
}