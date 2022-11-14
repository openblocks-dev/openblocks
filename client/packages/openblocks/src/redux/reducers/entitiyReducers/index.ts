import { combineReducers } from "redux";
import pluginReducer from "redux/reducers/entitiyReducers/pluginReducer";
import datasourceReducer from "redux/reducers/entitiyReducers/datasourceReducer";
import { queryLibraryReducer } from "./queryLibraryReducer";

const entityReducer = combineReducers({
  datasource: datasourceReducer,
  plugins: pluginReducer,
  queryLibrary: queryLibraryReducer,
});
export default entityReducer;
