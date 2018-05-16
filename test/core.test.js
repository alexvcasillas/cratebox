import test from 'ava';
const { cratebox, types } = require('../dist/cratebox');

const quickModel = {
  identifier: 'user',
  model: {
    name: types.string,
    lastName: types.string,
    age: types.number
  }
};

test('it should describe a store', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  t.truthy(crate.getStoreDescription('user'));
  t.is(crate.getStoreDescriptions().size, 1);
});

test('it tries to get the state without any previously dispatched changes', t => {
  const crate = cratebox();
  t.is(crate.getState('user'), null);
});

test('it should dispatch a change to a store', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Alex',
      lastName: 'Casillas',
      age: 28
    }
  });
  t.deepEqual(crate.getState('user'), {
    name: 'Alex',
    lastName: 'Casillas',
    age: 28
  });
});

test('it should dispatch a change to specific properties', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Alex',
      lastName: 'Casillas',
      age: 28
    }
  });
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Antonio',
      lastName: 'Cobos'
    }
  });
  t.deepEqual(crate.getState('user'), {
    name: 'Antonio',
    lastName: 'Cobos',
    age: 28
  });
});

test('it should get subscribed changes to the store', t => {
  t.plan(1);
  const crate = cratebox();
  crate.describeStore(quickModel);
  crate.subscribe('user', model => {
    t.deepEqual(model, {
      name: 'Michel',
      lastName: 'Weststrate',
      age: 30
    });
  });
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Michel',
      lastName: 'Weststrate',
      age: 30
    }
  });
});

test('it should travel backwards in time', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Alex',
      lastName: 'Casillas',
      age: 28
    }
  });
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Antonio',
      lastName: 'Cobos',
      age: 33
    }
  });
  crate.travelBackwards('user');
  t.deepEqual(crate.getState('user'), {
    name: 'Alex',
    lastName: 'Casillas',
    age: 28
  });
});

test('it should travel backwards and then forwards in time', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Alex',
      lastName: 'Casillas',
      age: 28
    }
  });
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Antonio',
      lastName: 'Cobos',
      age: 33
    }
  });
  crate.travelBackwards('user');
  crate.travelForwards('user');
  t.deepEqual(crate.getState('user'), {
    name: 'Antonio',
    lastName: 'Cobos',
    age: 33
  });
});

test('it should remove overflowing properties', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Alex',
      lastName: 'Casillas',
      age: 28,
      admin: true
    }
  });
  t.deepEqual(crate.getState('user'), {
    name: 'Alex',
    lastName: 'Casillas',
    age: 28
  });
});

test('it should complain when describing a store without a store model object', t => {
  const crate = cratebox();
  const error = t.throws(() => crate.describeStore(), Error);
  t.is(error.message, `You can't define a store without a store model object`);
});

test('it should complain when describing a store without identifier', t => {
  const crate = cratebox();
  const error = t.throws(() => crate.describeStore({}), Error);
  t.is(error.message, `You can't describe a store without an identifier`);
});

test('it should complain when describing a store without model', t => {
  const crate = cratebox();
  const error = t.throws(
    () => crate.describeStore({ identifier: 'user' }),
    Error
  );
  t.is(error.message, `You can't describe a store without a model`);
});

test('it should complain when dispatching changes without dispatch object', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  const error = t.throws(() => crate.dispatch(), Error);
  t.is(
    error.message,
    `You can't dispatch changes without a dispatch object: { identifier: string, model: object }`
  );
});

test('it should complain when dispatching without an identifier', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  const error = t.throws(() => crate.dispatch({}), Error);
  t.is(error.message, `You need a store identifier to dispatch changes to`);
});

test('it should complain when dispatching without model', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  const error = t.throws(() => crate.dispatch({ identifier: 'user' }), Error);
  t.is(
    error.message,
    `You need a model with the changes you would like to apply`
  );
});
