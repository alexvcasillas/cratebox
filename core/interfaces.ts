import { baseType, arrayType } from './types/interfaces';

export interface IObjectModel {
  [key: string]: any;
}

export interface IStoreModel {
  identifier: string;
  model: IObjectModel;
}

export interface IObjectDescription {
  [key: string]: baseType | arrayType;
}

export interface IStoreDescription {
  identifier: string;
  model: IObjectDescription;
}
