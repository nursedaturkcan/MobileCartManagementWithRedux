import { legacy_createStore } from "redux";

import cartItemsReducers from "./reducers/cartItemReducer";
const store=legacy_createStore(cartItemsReducers);
export default store;