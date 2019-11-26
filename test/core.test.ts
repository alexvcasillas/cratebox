import { createStore } from '../src';

type UserState = {
  name: string,
  lastName: string,
};

type UserViews = {
  fullName: string;
};

type UserActions = {
  changeName: (name: string) => void;
  changeLastName: (lastName: string) => void;
};

type Store = {
  state: UserState,
  views?: UserViews,
  actions?: UserActions,
}

function initNewStore(): Store {
  
  const userState: UserState = {
    name: 'Alex',
    lastName: 'Casillas',
  };

  const userViews = (state: UserState): UserViews => ({
    fullName: `${state.name} ${state.lastName}`,
  });

  const userActions = (state: UserState): UserActions => ({
    changeName(name: string) {
      state.name = name;
    },
    changeLastName(lastName: string) {
      state.lastName = lastName;
    }
  })

  const store = createStore(userState, userViews, userActions);
  return store;
}


describe('Core features', () => {
  it('should create a user store', () => {
    const userStore = initNewStore();
    expect(userStore.state.name).toBe("Alex");
    expect(userStore.state.lastName).toBe("Casillas");
  });
  it('should return views as expected', () => {
    const userStore = initNewStore();
    expect(userStore.views && userStore.views.fullName).toBe("Alex Casillas");
  });
  it('should update state when dispatching an action', () => {
    const userStore = initNewStore();
    userStore.actions && userStore.actions.changeName("John");
    expect(userStore.state.name).toBe("John");
  });
  it('should throw when trying to manually update the state', () => {
    const userStore = initNewStore();
    expect(() => {
      userStore.state.name = "John";
    }).toThrow("Cannot manually update the [name] property. Dispatch and action instead.");
  });
});
