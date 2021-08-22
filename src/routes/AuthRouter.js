import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ProminentAppBar } from "../components";
import { SignIn, SignUp, Auth } from "../pages";

function AuthRouter() {
  return (
    <Switch>
      <Route path="/sign_in" exact component={SignIn} />
      <Route path="/sign_up" exact component={SignUp} />
      <Route path="/auth" exact component={Auth} />
    </Switch>
  );
}

export default AuthRouter;
