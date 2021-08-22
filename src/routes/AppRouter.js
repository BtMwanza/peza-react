import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ProminentAppBar } from "../components";
import {
  Home,
  ProductDetails,
  Cart,
  Checkout,
  Profile,
  ReservedProduct,
  VendorInfo,
  Explore,
  FourZeroFour,
  SignIn,
  SignUp,
  Auth,
} from "../pages";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" name="Home" exact component={Home} />
      <Route path="/product/:productId" exact component={ProductDetails} />
      <Route path="/cart" name="My Cart" exact component={Cart} />
      <Route path="/checkout" name="Checkout" exact component={Checkout} />
      <Route path="/profile" name="My Account" exact component={Profile} />
      <Route
        path="/reserved_products"
        name="Reserved Products"
        exact
        component={ReservedProduct}
      />
      <Route
        path="/vendor/:displayName"
        name="Merchant"
        exact
        component={VendorInfo}
      />
      <Route path="/explore" name="Explore" exact component={Explore} />

      <Route path="/sign_in" exact component={SignIn} />
      <Route path="/sign_up" exact component={SignUp} />
      <Route path="/auth" exact component={Auth} />

      <Route path="*" component={FourZeroFour} />
    </Switch>
  );
}

export default AppRouter;
