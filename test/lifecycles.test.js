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

test('it should be able to trigger a dispatch to the model after describing a store', t => {
  const crate = cratebox();
  const afterDescribeModel = { ...quickModel };
  afterDescribeModel.afterDescribe = self => {
    self.dispatch({
      identifier: 'user',
      model: {
        name: 'Alex',
        lastName: 'Casillas',
        age: 28,
      },
    });
  };
  crate.describeStore(afterDescribeModel);
  t.deepEqual(crate.getState('user'), {
    name: 'Alex',
    lastName: 'Casillas',
    age: 28,
  });
});

test.cb(
  'it should be able to resolve an asynchronous data fetching for the model within the afterDescribe lifecycle',
  t => {
    t.plan(1);
    const mockFetch = () =>
      new Promise(resolve =>
        setTimeout(
          () =>
            resolve({
              name: 'Alex',
              lastName: 'Casillas',
              age: 28,
            }),
          10,
        ),
      );
    const crate = cratebox();
    const afterDescribeModel = { ...quickModel };
    afterDescribeModel.afterDescribe = async self => {
      const data = await mockFetch();
      try {
        self.dispatch({
          identifier: 'user',
          model: data,
        });
      } catch (fetchError) {}
      t.deepEqual(crate.getState('user'), {
        name: 'Alex',
        lastName: 'Casillas',
        age: 28,
      });
      t.end();
    };
    crate.describeStore(afterDescribeModel);
  },
);
