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

test('it should travel backwards in time', t => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Alex',
      lastName: 'Casillas',
      age: 28,
    },
  });
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Antonio',
      lastName: 'Cobos',
      age: 33,
    },
  });
  crate.travelBackwards('user');
  t.deepEqual(crate.getState('user'), {
    name: 'Alex',
    lastName: 'Casillas',
    age: 28,
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
      age: 28,
    },
  });
  crate.dispatch({
    identifier: 'user',
    model: {
      name: 'Antonio',
      lastName: 'Cobos',
      age: 33,
    },
  });
  crate.travelBackwards('user');
  crate.travelForwards('user');
  t.deepEqual(crate.getState('user'), {
    name: 'Antonio',
    lastName: 'Cobos',
    age: 33,
  });
});
