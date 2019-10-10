export type StoreModel = {
  identifier: string;
  model: Model;
  afterDescribe?: Function;
};

export type Proxy<T> = {
  get(): T;
  set(value: T): void;
};

export type Model = {
  [x: string]: any;
};

export interface ViewFunction {
  (self: any): ViewFunctions;
}
export interface ActionFunction {
  (self: any): ActionFunctions;
}

export type ViewFunctions = {
  [x: string]: Function;
};

export type ActionFunctions = {
  [x: string]: Function;
  afterCreate: Function;
  beforeCreate: Function;
};

export type StoreObject = {
  identifier: string;
  model: Model;
  views?: ViewFunction;
  actions?: ActionFunction;
};
