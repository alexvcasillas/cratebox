const store = require('./core/index.js').store;
const types = require('./core/index.js').types;

const makeid = require('./utils').makeid;

// Describe a new user store
store.describeStore({
  identifier: 'user',
  model: {
    name: types.string,
    lastName: types.string,
    age: types.number,
    dateOfBirth: types.date,
    admin: types.boolean,
  },
});

// Describe a new post store
store.describeStore({
  identifier: 'post',
  model: {
    title: types.string,
    content: types.string,
    author: types.string,
    publishDate: types.date,
    published: types.boolean,
  },
});

// Subscribe to user store changes
store.subscribe('user', model => {
  console.log('Store User Subscription: ', model);
  console.log('----');
});

// Subscribe to post store changes
store.subscribe('post', model => {
  console.log('Store Post Subscription: ', model);
  console.log('----');
});

// Dispatch a new action to the user store
store.dispatch({
  identifier: 'user',
  model: {
    name: 'Alex',
    lastName: 'Casillas',
    age: 27,
    dateOfBirth: new Date('03-23-1990'),
    admin: true,
  },
});
// Dispatch a new action to the user store
store.dispatch({
  identifier: 'user',
  model: {
    name: 'Antonio',
    age: 27,
    dateOfBirth: new Date('03-23-1990'),
    admin: true,
  },
});

// Dispatch a new action to the post store
store.dispatch({
  identifier: 'post',
  model: {
    title: 'Brand new post',
    content: 'Creating a State Management library like a boss.',
    author: 'Alex Casillas',
    published: false,
  },
});

// Display the global state of the store
console.log('Global State: ', store.getGlobalState());

// console.log('Initializing test interval !!');
// const testInterval = setInterval(function() {
//   console.log('Dispatching a new action to post store');
//   // Dispatch a new action to the post store
//   store.dispatch({
//     identifier: 'post',
//     model: {
//       title: `Post - ${makeid()}`,
//       content: 'Creating a State Management library like a boss.',
//       author: 'Alex Casillas',
//       publishDate: new Date(),
//       published: Math.floor(Math.random() * 10) + 1 > 5 ? true : false,
//     },
//   });
// }, 2000);

// setTimeout(function() {
//   console.log('Clearing test interval !!');
//   clearInterval(testInterval);
// }, 10000);
