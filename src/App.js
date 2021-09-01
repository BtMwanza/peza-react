import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import firebase from "firebase";

import Fire from "./lib/firebaseConfig";
import { store, persistor } from "./redux/Store";
import AppRouter from "./routes/AppRouter";
import AuthRouter from "./routes/AuthRouter";
import { ProminentAppBar } from "./components";

function App() {
  const [appUser, setAppUser] = React.useState(false);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setAppUser(user);
    console.log("USER: ", user);
  }

  React.useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    // Stop listening for updates whenever the component unmounts
    return () => {
      subscriber();
    };
  }, []);

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
