# Typestore

TypeStore is an Opinionated State Management library for no particular UI library.

# Contents

* [Installation](#installation)
* [Getting Started](#getting-started)
* [Describing a Store](#describing-a-store)
* [Dispatching Changes](#dispatching-changes)

# Installation

NPM: `npm install typestore`

Yarn: `yarn add typestore`

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

You also have to take note that properties that _are not described_ at the `describeStore` function, won't affect your state if you try to dispatch properties not defined previously. For example:

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
