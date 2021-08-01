import { combineReducers } from "redux";

import authReducer from "./AuthSlice";
import cartReducer from "./CartSlice";
import productReducer from "./ProductSlice";
import vendorReducer from "./VendorSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  prodSlice: productReducer,
  sellers: vendorReducer,
});

export default rootReducer;
