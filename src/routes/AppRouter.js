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

//
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
      path: "/vendor/:vendorID",
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
      {pages.map((item) => {
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
      })}
    </Switch>
  );
}

export default AppRouter;
