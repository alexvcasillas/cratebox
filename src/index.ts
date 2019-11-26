import arrayPlugin from './plugins/array.plugin';
import mapPlugin from './plugins/map.plugin';
import objectPlugin from './plugins/object.plugin';

export type Store<T, V, A> = {
  state: T;
  views?: V;
  actions?: A;
};

type Plugin = <T, V, A>(
  state: T,
  views?: (state: T) => V,
  actions?: (state: T) => A
) => Store<T, V, A>;

export function createStore<T, V, A>(
  state: T,
  views?: (state: T) => V,
  actions?: (state: T) => A,
  plugin?: Plugin,
): Store<T, V, A> {
  if (state instanceof Map)
    return typeof plugin !== "undefined"
      ? plugin<T, V, A>(state, views, actions)
      : mapPlugin<T, V, A>(state, views, actions);

  if (state instanceof Array)
    return typeof plugin !== "undefined"
      ? plugin<T, V, A>(state, views, actions)
      : arrayPlugin<T, V, A>(state, views, actions)
      
  return typeof plugin !== "undefined"
    ? plugin<T, V, A>(state, views, actions)
    : objectPlugin<T, V, A>(state, views, actions);
}
