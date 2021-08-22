import { combineReducers } from "redux";

import authReducer from "./AuthSlice";
import cartReducer from "./CartSlice";
import productReducer from "./ProductSlice";
import merchantReducer from "./MerchantSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  prodSlice: productReducer,
  merchants: merchantReducer,
});

export default rootReducer;
