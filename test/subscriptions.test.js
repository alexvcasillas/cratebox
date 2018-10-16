import test from 'ava';
const { cratebox, types } = require('../dist/cratebox');

const quickModel = {
  identifier: 'user',
  model: {
    name: types.string,
    lastName: types.string,
    age: types.number,
  },
};

test('it should trigger a subscription at dispatch', t => {
  t.plan(1);
  const crate = cratebox();
  crate.describeStore({
    identifier: 'todos',
    model: {
      todos: types.array(
        types.frozen({
          id: types.number,
          title: types.string,
          description: types.string,
          completed: types.boolean,
        }),
      ),
    },
  });
  let timesCalled = 0;
  crate.subscribe('todos', model => {
    timesCalled++;
    if (timesCalled === 2) t.true(true);
  });
  crate.dispatch({
    identifier: 'todos',
    model: {
      todos: [
        { id: 1, title: 'Hello', description: 'World', completed: true },
        { id: 2, title: 'Hola', description: 'Mundo', completed: false },
      ],
    },
  });
  crate.dispatch({
    identifier: 'todos',
    model: {
      todos: [
        { id: 1, title: 'Hello', description: 'World', completed: true },
        { id: 2, title: 'Hola', description: 'Mundo', completed: true },
      ],
    },
  });
});

test('it should return the unsubscribe function when setting a subscription', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  const first_unsubscribe = crate.subscribe('user', model => {});
  const second_unsubscribe = crate.subscribe('user', model => {});
  t.true(typeof first_unsubscribe === 'function' && typeof second_unsubscribe === 'function');
});

test('it should return the amount of subscriptions added to a specific store', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  const first_unsubscribe = crate.subscribe('user', model => {});
  const second_unsubscribe = crate.subscribe('user', model => {});
  t.true(crate.getStoreSubscriptions('user').length === 2);
});

test('it should remove a subscription of the subscriptions to a specific store', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  const first_unsubscribe = crate.subscribe('user', model => {});
  const second_unsubscribe = crate.subscribe('user', model => {});
  second_unsubscribe();
  t.true(crate.getStoreSubscriptions('user').length === 1);
});
