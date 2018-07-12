import { StoreModel, Model } from "./store-model";
import { SubscriptionModel } from "./subscription-model";

export type CrateboxModel = {
  describeStore(storeModel: StoreModel): void;
  getStoreDescriptions(): Map<string, Model>;
  getStoreDescription(identifier: string): Model;
  getGlobalState(): Map<string, Model>;
  getState(identifier: string): Model | null;
  getStoreSubscriptions(identifier: string): SubscriptionModel[];
  dispatch(dispatchObject: StoreModel): void;
  subscribe(store: string, listener: Function): Function;
  travelForwards(identifier: string): void;
  travelBackwards(identifier: string): void;
  travelTo(identifier: string, index: number): void;
};
