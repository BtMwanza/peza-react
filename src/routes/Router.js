import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ProminentAppBar } from "./../components";
import {
  Home,
  ProductDetails,
  Cart,
  Checkout,
  Profile,
  ReservedProduct,
  SignIn,
  SignUp,
  VendorInfo,
  Explore,
  Auth,
  FourZeroFour,
} from "./../pages";

function NavigationContainer() {
  return (
    <div>
      <BrowserRouter>
        <ProminentAppBar />

        <Switch>
          <Route path="/" hash="Home" exact component={Home} />
          <Route
            path="/product/:productId"
            name="P"
            exact
            component={ProductDetails}
          />
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/reserved_products" exact component={ReservedProduct} />
          <Route path="/sign_in" exact component={SignIn} />
          <Route path="/sign_up" exact component={SignUp} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/vendor" exact component={VendorInfo} />
          <Route path="/explore" exact component={Explore} />

          <Route path="*" component={FourZeroFour} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default NavigationContainer;
