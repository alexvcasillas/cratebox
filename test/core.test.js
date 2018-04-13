const { cratebox, types } = require('../dist/cratebox');

test('it should describe a store', () => {
  cratebox.describeStore({
    identifier: 'user',
    model: {
      name: types.string,
      lastName: types.string,
      age: types.number
    }
  });
  expect(cratebox.descriptions.has('user')).toBe(true);
});

test('it should describe another store', () => {
  cratebox.describeStore({
    identifier: 'posts',
    model: {
      title: types.string,
      description: types.string,
      author: types.string
    }
  });
  expect(cratebox.descriptions.has('user')).toBe(true);
  expect(cratebox.descriptions.has('posts')).toBe(true);
  expect(cratebox.descriptions.size).toBe(2);
});

test('it should dispatch a change to a store', () => {
  cratebox.dispatch({
    identifier: 'user',
    model: {
      name: 'Alex',
      lastName: 'Casillas',
      age: 28
    }
  });
  expect(cratebox.getState('user')).toEqual({ name: 'Alex', lastName: 'Casillas', age: 28 });
});

test('it should dispatch a change to specific properties', () => {
  cratebox.dispatch({
    identifier: 'user',
    model: {
      name: 'Antonio',
      lastName: 'Cobos'
    }
  });
  expect(cratebox.getState('user')).toEqual({ name: 'Antonio', lastName: 'Cobos', age: 28 });
});

test('it should travel backwards in time', () => {
  cratebox.travelBackwards('user');
  expect(cratebox.getState('user')).toEqual({ name: 'Alex', lastName: 'Casillas', age: 28 });
});

test('it should travel forwards in time', () => {
  cratebox.travelForwards('user');
  expect(cratebox.getState('user')).toEqual({ name: 'Antonio', lastName: 'Cobos', age: 28 });
});

test('it should get subscribed changes to the store', () => {
  expect.assertions(1);
  cratebox.subscribe('user', model => {
    expect(model).toEqual({ name: 'Michel', lastName: 'Weststrate', age: 30 });
  });
  cratebox.dispatch({
    identifier: 'user',
    model: {
      name: 'Michel',
      lastName: 'Weststrate',
      age: 30
    }
  });
});
