import { reduxBatch } from "@manaflair/redux-batch";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { appReducer, AppState } from "@openblocks-ee/redux/reducers";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "@openblocks-ee/redux/sagas";
import StoreRegistry from "redux/store/storeRegistry";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  appReducer,
  composeWithDevTools(reduxBatch, applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
StoreRegistry.registerStore(store);

export const reduxStore = store;
export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
