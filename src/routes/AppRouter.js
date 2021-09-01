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
  const pages = [
    {
      component: Home,
      path: "/",
      name: "Home",
    },
    {
      component: ProductDetails,
      path: "/product/:productID/:productName",
      name: "Product Details",
    },
    {
      component: Cart,
      path: "/cart",
      name: "My Cart",
    },
    {
      component: Checkout,
      path: "/checkout",
      name: "Checkout",
    },
    {
      component: Profile,
      path: "/account",
      name: "My Account",
    },
    {
      component: ReservedProduct,
      path: "/reserved_products",
      name: "Product Details",
    },
    {
      component: VendorInfo,
      path: "/vendor/:displayName",
      name: "Vendor Information",
    },
    {
      component: ProductDetails,
      path: "/product/:productID",
      name: "Product Details",
    },
    {
      component: Explore,
      path: "/explore",
      name: "Explore",
    },
    {
      component: SignIn,
      path: "/sign_in",
      name: "Sign In",
    },
    {
      component: SignUp,
      path: "/sign_up",
      name: "Sign Up",
    },
    {
      component: Auth,
      path: "/authentication",
      name: "Authentication",
    },
    {
      component: FourZeroFour,
      path: "*",
      name: "Page Not Found",
    },
  ];

  return (
    <Switch>
       {/*pages.map((item) => {
        const { component, path, name } = item;
        return (
          <Route
            key={item}
            path={path}
            pageName={name}
            exact
            component={component}
          />
        );
      })*/}
       <Route path="/" exact render={(props) => (<Home pageName="Home" {...props}/>)} />
      <Route path="/product/:productID" exact render={(props) => (<ProductDetails pageName="Product Details" {...props}/>)} />
      <Route path="/cart" exact render={(props) => (<Cart pageName="My Cart" {...props}/>)} />
      <Route path="/checkout" exact render={(props) => (<Checkout pageName="Checkout" {...props}/>)} />
      <Route path="/profile" exact render={(props) => (<Profile pageName="My Account" {...props}/>)} />
      <Route
        path="/reserved_products"
        exact
        render={(props) => (<ReservedProduct pageName="Reserved Product" {...props}/>)}
      />
      <Route
        path="/vendor/:displayName"
        name="Merchant"
        exact
        render={(props) => (<VendorInfo pageName="Merchant" {...props}/>)}
      />
      <Route path="/explore" exact render={(props) => (<Explore pageName="Explore" {...props}/>)} />

      <Route path="/sign_in" exact component={SignIn} />
      <Route path="/sign_up" exact component={SignUp} />
      <Route path="/auth" exact component={Auth} />

      <Route path="*" render={(props) => (<FourZeroFour pageName="404" {...props}/>)} /> 
    </Switch>
  );
}

export default AppRouter;
