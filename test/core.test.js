const { cratebox, types } = require('../dist/cratebox');

const quickModel = {
  identifier: 'user',
  model: {
    name: types.string,
    lastName: types.string,
    age: types.number
  }
};

test('it should describe a store', () => {
  const crate = cratebox();
  crate.describeStore(quickModel);
  expect(crate.getStoreDescription('user')).not.toBe(null);
  expect(crate.getStoreDescriptions().size).toBe(1);
});

test('it tries to get the state without any previously dispatched changes', () => {
  const crate = cratebox();
  expect(crate.getState('user')).toBe(null);
});

test('it should dispatch a change to a store', () => {
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
  expect(crate.getState('user')).toEqual({
    name: 'Alex',
    lastName: 'Casillas',
    age: 28
  });
});

test('it should dispatch a change to specific properties', () => {
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
  expect(crate.getState('user')).toEqual({
    name: 'Antonio',
    lastName: 'Cobos',
    age: 28
  });
});

test('it should get subscribed changes to the store', () => {
  expect.assertions(1);
  const crate = cratebox();
  crate.describeStore(quickModel);
  crate.subscribe('user', model => {
    expect(model).toEqual({
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

test('it should travel backwards in time', () => {
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
  expect(crate.getState('user')).toEqual({
    name: 'Alex',
    lastName: 'Casillas',
    age: 28
  });
});

test('it should travel backwards and then forwards in time', () => {
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
  expect(crate.getState('user')).toEqual({
    name: 'Antonio',
    lastName: 'Cobos',
    age: 33
  });
});
