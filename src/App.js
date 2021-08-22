import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";

import Fire from "./lib/firebaseConfig";
import { store, persistor } from "./redux/Store";
import AppRouter from "./routes/AppRouter";
import AuthRouter from "./routes/AuthRouter";
import { ProminentAppBar } from "./components";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ProminentAppBar />
          <AppRouter />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
