export type StoreModel = {
  identifier: string;
  model: Model;
  afterDescribe?: Function;
};

export type Model = {
  [x: string]: any;
};
