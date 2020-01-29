import objectPlugin from './plugins/object.plugin';

export type Subscription = (listener: any) => () => void;

export type Store<T, V, A> = {
  state: T;
  views?: V;
  actions?: A;
  subscribe: Subscription,
};

type Plugin = <T, V, A>(
  state: T,
  views?: (state: T) => V,
  actions?: (state: T) => A,
  subscriber?: Subscription,
) => Store<T, V, A>;

export function createStore<T, V, A>(
  state: T,
  views?: (state: T) => V,
  actions?: (state: T) => A,
  plugin?: Plugin,
): Store<T, V, A> {      
  return typeof plugin !== "undefined"
    ? plugin<T, V, A>(state, views, actions)
    : objectPlugin<T, V, A>(state, views, actions);
}
