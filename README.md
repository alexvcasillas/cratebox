# Cratebox

<p align="center">
  <img src="https://github.com/alexvcasillas/cratebox/blob/master/logo/cratebox-logo.png?raw=true" width="500" height="200"></img>
</p>

<p align="center">
  Cratebox is a plugin based state management library.
</p>

* **Declarative**: with cratebox you will create almost effortless stores to keep your state in a global level.
* **Plugin-based**: create your own plugins to handle state, views & actions the way you want or let Cratebox use it's defaults so you don't have to worry about anything.

## Installation

Cratebox can be installer into your project with [yarn](https://yarnpkg.com) or [npm](https://npmjs.com) with the following commands:

```
yarn add cratebox
```

```
npm install cratebox
```

## Usage & API

Cratebox comes with one named export called **createStore** which is a function with the following signature:

```typescript
interface createStore<T, V, A>(
  state: T,
  views?: (state: T) => V,
  actions?: (state: T) => A,
  plugin?: Plugin,
) => Store<T, V, A>;
```

Let's proceed to describe the signature a little.

* **createStore**: will take three parameters of types T, V and A which will be used to infer types to give you a good developer experience when using [vscode](https://code.visualstudio.com/).
* **state**: will be one of the following types:
  * **object**: a regular object type shape to manage state.
* **views**: views are a function of state and are used to create computed properties.
* **actions**: actions are a function of state and should be used to update state from within this function. Note that this is not a rule but it's recommended that you only update the state though actions so you can keep track of where and when you're applying changes to a store. The default plugin that comes with Cratebox will ensure that you don't apply changes directly to state at any point and only through actions.
* **plugin**: plugins are a to handle your own state, views & actions logic for the given store. If you don't pass any plugin at the creation time, Cratebox will use it's default plugin for you.

## Examples

The following example shows how to create a simple user store to keep some user data within it, make use of views and actions to dispatch changes to the state.

```typescript
import { createStore } from "cratebox";

/**
 * Define this store's shape!
 */
type UserState = {
  name?: string,
  lastName?: string,
};

/**
 * User state object that matches the User State Type
 */
const userState: UserState = {};

/**
 * Define User Views
 *  – it's like computed properties!
 */
type UserViews = {
  fullName: string,
}

/**
 * User Views function of state that returns
 * and object with the user views type
 */
const userViews = (state: UserState): UserViews => ({
  fullName: `${state.name || "John"} ${state.lastName || "Doe"}`,
});


/**
 * Define User Actions
 *  – You'll be able to change the state within this actions only!
 */
type UserActions = {
  changeName(name: string): void;
  changeLastName(lastName: string): void;
}

/**
 * User Actions function of state that returns
 * an object with the user actions type
 */
const userActions = (state: UserState): UserActions => ({
  changeName(name: string) {
    state.name = name;
  },
  changeLastName(lastName: string) {
    state.lastName = lastName;
  }
});

/**
 * Create the store
 * and then export it to use it somewhere else!
 */
const userStore = createStore(
  userState,
  userViews,
  userActions
);

export default userStore;
```

## Plugins

With cratebox you have the ability to create your own plugins to handle state, views & actions in your own way. This gives your (the developer) the flexibility of using it's own business logic the way you see fit.

The following example comes with a very simple implementation of a plugin for a store with an object type state based. You can use this as a base for your plugin and enhance it the way you consider better.

```typescript
import { createStore, Store } from "cratebox";

/**
 * Define this store's shape!
 */
type UserState = {
  name?: string,
  lastName?: string,
};

/**
 * User state object that matches the User State Type
 */
const userState: UserState = {};

/**
 * Define User Views
 *  – it's like computed properties!
 */
type UserViews = {
  fullName: string,
}

/**
 * User Views function of state that returns
 * and object with the user views type
 */
const userViews = (state: UserState): UserViews => ({
  fullName: `${state.name || "John"} ${state.lastName || "Doe"}`,
});


/**
 * Define User Actions
 *  – You'll be able to change the state within this actions only!
 */
type UserActions = {
  changeName(name: string): void;
  changeLastName(lastName: string): void;
}

/**
 * User Actions function of state that returns
 * an object with the user actions type
 */
const userActions = (state: UserState): UserActions => ({
  changeName(name: string) {
    state.name = name;
  },
  changeLastName(lastName: string) {
    state.lastName = lastName;
  }
});

/**
 * Create the store
 * and then export it to use it somewhere else!
 */
const userStore = createStore(
  userState,
  userViews,
  userActions,
  <UserState, UserViews, UserActions>(
    userState: UserState,
    userViews: (state: UserState) => UserViews,
    userActions: (state: UserState) => UserActions
    ): Store<UserState, UserViews, UserActions> => {

      const proxiedState: T = new Proxy<any>(state, {
        get(target: object, prop: string, receiver: any) {
          return Reflect.get(target, prop, receiver);
        },
        set(object: object, prop: string, value: any) {
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
);
```