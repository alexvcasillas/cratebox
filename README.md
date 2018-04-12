# Typestore

TypeStore is an Opinionated State Management library for no particular UI library.

# Contents

* [Installation](#installation)
* [Getting Started](#getting-started)
* [Describing a Store](#describing-a-store)
* [Dispatching Changes](#dispatching-changes)
* [Retrieving State](#retrieving-state)
* [Subscriptions](#subscriptions)
* [Time Traveling](#time-traveling)
* [Types](#types)
  * [Basic Types](#basic-types)
  * [Advanced Types](#advanced-types)
* [Roadmap](#roadmap)
* [Thanks!](#thanks)

# Installation

NPM

```
npm install typestore
```

Yarn

```
yarn add typestore
```

# Getting Started

To get started with **TypeStore** first of all you need to import the dependency into your project plus the typings dependency for your models.

```
import { typeStore, types } from 'typestore`
```

From that point on, you'll have access to the full API of **TypeStore**.

# Describing a Store

```
store.describeStore({
  identifier: 'user',
  model: {
    name: types.string,
    lastName: types.string,
    avatar: types.string,
    age: types.number,
    birthDate: types.date,
    position: types.string,
    github: types.string,
  }
});
```

Let's take a look at the example above and let's get though all of the details.

First of all we have the `describeStore` function. This function is the one in charge to tell **TypeStore** that we would like to describe a new store were we will put our state.

The `describeStore` function takes on parameter that is an object will the following structure:

```
{
  identifier: string,
  model: model object
}
```

The `identifier` property represents the name of the store you're describing, therefore, this will be the name you'll be using latter on to deal with this particular store within **TypeStore**.

The `model` property is a `model object` that represents all of the properties that you're identified store will contain. This properties could be any of the properties that we will describe later on. This properties are typed by our own typing system and will let you build rock-solid-typed models.

As we can see at the `describeStore` example above, we're defining a model that contains the following properties:

```
name: types.string,
lastName: types.string,
avatar: types.string,
age: types.number,
birthDate: types.date,
position: types.string,
github: types.string,
```

Many of the properties described above are of type `string`, meaning that no mater what you store there, if it's not a `string`, it will complain about it and, therefore, it wont let you store it at the given property.

There's also a type `number` and a type `date` there, meaning that, the property `age` will only be able to store numeric data and the `birthDate` property will only be able to store instances of the `Date` type.

Ok, we've described our store so far at this point. Let's proceed with more stuff about **TypeStore**.

# Dispatching changes

To dispatch a change into a store, we will call the `dispatch` function from the **TypeStore** API.

```
typeStore.dispatch({
  identifier: 'user',
  model: {
    name: 'Alex',
    lastName: 'Casillas',
    age: 28,
    birthDate: new Date('1990-03-23'),
    avatar: 'https://avatars3.githubusercontent.com/u/9496960?s=460&v=4',
    position: 'Frontend Engineer',
    github: 'https://github.com/alexvcasillas'
  }
})
```

Let's take a minute to process the code above. Got it? Ok, let's go for it.

The `dispatch` function takes on single argument that is a `dispatch object`. This `dispatch object` contains the following properties:

```
{
  identifier: string,
  model: model object
}
```

See some resemblance from something we described before? That's it! It has the same structure that our `described store`! That makes things even more easy to deal with.

The `identifier` property will tell **TypeStore** which of the `described stores` is the one that's getting a change. In the example above, `user` store is the one that's getting a change dispatched.

We can dispatch as many changes to a store as we want. You have to consider that you dispatch changes to a model, meaning that, calling the `dispatch` event with the following data:

```
typeStore.dispatch({
  identifier: 'user',
  model: {
    name: 'Antonio',
    lastName: 'Cobos',
    position: 'Backend Engineer',
  }
})
```

Won't generate a new state with just:

```
{
  name: 'Antonio',
  lastName: 'Cobos',
  position: 'Backend Engineer',
}
```

But instead will be:

```
{
  name: 'Antonio',
  lastName: 'Cobos',
  avatar: 'https://avatars3.githubusercontent.com/u/9496960?s=460&v=4',
  age: 28,
  birthDate: '1990-03-23',
  position: 'Backend Engineer Engineer',
  github: 'https://github.com/alexvcasillas'
}
```

As you can see, it will generate changes based on the previous state, making sure that state changes to a single value won't break the state of your app.

You also have to take note that properties that _are not described_ at the `describeStore()` function, won't affect your state if you try to dispatch properties not defined previously. For example:

```
typeStore.dispatch({
  identifier: 'user',
  model: {
    name: 'Antonio',
    lastName: 'Cobos',
    position: 'Backend Engineer',
    mightyLevel: 'Over 9000!!'
  }
})
```

This `dispatch` call will generate a new state with the described properties updated but the `mightyLevel` property will be discarded.

# Retrieving State

You can retrieve the current state of a specific store making use of our simple exposed API method for this: `getState(identifier: string)`

This method will retrieve the current state of a store by the given identifier. Let's look at an example:

```
// Describe the store
store.describeStore({
  identifier: 'user',
  model: {
    name: types.string,
    lastName: types.string,
  }
});

// Dispatch a new change at the user store
store.dispatch({
  identifier: 'user',
  model: {
    name: 'Alex',
    lastName: 'Casillas',
  }
})

// Call the Get State method
console.log( store.getState('user') );
```

The code above will give you the following output in your console:

```
{
  name: 'Alex',
  lastName: 'Casillas',
}
```

# Subscriptions

Subscriptions will let you listen to changes to a given store. This way you'll be able to update your UI (for example) based on state changes you made to your store.

The way of subscribing to changes within a particular store is:

```
typeStore.subscribe('user', model => {
  // Handle your changes the way you want here :)
});
```

Let's dive into the `subscribe` method now.

This method takes two arguments, the `identifier` of the store you want to track state changes to and a callback function that will give you the current `state model` after a `dispatch` action make changes to a store.

Let's see the following case as example:

```
// Describe the store
store.describeStore({
  identifier: 'user',
  model: {
    name: types.string,
    lastName: types.string,
  }
});

// Create a subscriber for the user store
store.subscribe('user', model => {
  console.log(model);
})

// Dispatch a new change at the user store
store.dispatch({
  identifier: 'user',
  model: {
    name: 'Antonio',
    lastName: 'Cobos',
  }
})
```

At the right moment you `dispatch` the changes to the `user store`. The subscription hook will be called and you'll get the following output logged at the console:

```
{
  name: 'Antonio',
  lastName: 'Cobos',
}
```

As you can see, subscriptions are pretty simple to use and you don't need to be subscribing to all of your stores' changes, you can subscribe to specific a store changes right whenever you need them.

# Time Traveling

Time traveling is supported out of the box for you. We expose a simple API that will let you handle time traveling in a simple way.

Let's say you want to travel backgrounds in your store, then you simply:

```
typeStore.travelBackwards('user');
```

Or let's say you want to travel forwards after you just traveled backwards, simply:

```
typeStore.travelForwards('user');
```

Let's dive a little into the Time Traveling API. It's simple, we expose to methods: `travelBackwards` and `travelForwards`.

Both of the methods require one single argument: the store `identifier` of the store you want to make time travel with.

Let's take a look at this with a little example:

```
// Describe the store
store.describeStore({
  identifier: 'user',
  model: {
    name: types.string,
    lastName: types.string,
  }
});

// Create a subscriber for the user store
store.subscribe('user', model => {
  console.log('Store Changes: ', model);
})

// Dispatch a new change at the user store
store.dispatch({
  identifier: 'user',
  model: {
    name: 'Alex',
    lastName: 'Casillas',
  }
})

// Dispatch another change at the user store
store.dispatch({
  identifier: 'user',
  model: {
    name: 'Antonio',
    lastName: 'Cobos',
  }
})

// Call the Travel Backwards method
store.travelBackwards('user');
// Call the Travel Forwards method
store.travelForwards('user');
```

When executing the example above you'll have the following output:

```
// First Dispatch
Store Changes: { name: 'Alex', lastName: 'Casillas' }
// Second Dispatch
Store Changes: { name: 'Antonio', lastName: 'Cobos' }
// Travel Backwards
Store Changes: { name: 'Alex', lastName: 'Casillas' }
// Travel Forwards
Store Changes: { name: 'Antonio', lastName: 'Cobos' }
```

If you have noticed, the same `subscription` you've created for listening to changes when `dispatch` is called, will also work for Time Traveling out of the box.

# Types

**TypeStore** is a typed state management library and therefore, comes bundled with basic types plus some advanced types.

All of the types are to be imported from the `types` namespace.

## Basic Types

The basic types of **TypeStore** are the following and self explanatory

* types.string
* types.number
* types.boolean
* types.null
* types.undefined
* types.date

## Advanced Types

The advanced types of **TypeStore** are currently a work in progress but will contain some of the following types for your use:

* types.array
* types.frozen
* types.literal
* types.enumeration

# Roadmap

We have a roadmap for new implementations and this are our intentions:

* Specific State Time Traveling via `travelTo(index: number)` exposed API method.
* Advanced types in the following order:
  1.  types.array
  2.  types.frozen
  3.  types.literal
  4.  types.enumeration
* Lifecycle hooks
  * Before Create via `beforeCreate` model property.
  * After Create via `afterCreate` model property.

# Thanks!

[Michel Weststrate](https://twitter.com/mweststrate)'s incredible work on [MobX](https://github.com/mobxjs/mobx) and [MobX-State-Tree](https://github.com/mobxjs/mobx-state-tree) that has been a great inspiration since their early stages.

[Dan Abramov](https://twitter.com/dan_abramov)'s work on [Redux](https://github.com/reactjs/redux) that also has been a great inspiration while trying to mix it with [MobX-State-Tree](https://github.com/mobxjs/mobx-state-tree)

And also lots of thanks to you for reading this lines and took some time to read though the docs and maybe gave a try to this project.
