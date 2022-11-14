import { Store } from "redux";

export default class StoreRegistry {
  private static _store: Store;
  static registerStore(store: Store) {
    this._store = store;
  }
  static getStore(): Store {
    return this._store;
  }
}
