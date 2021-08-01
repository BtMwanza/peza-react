import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import firebase from "firebase/app";
import Fire from "./lib/firebaseConfig";

import { store, persistor } from "./redux/Store";
import NavigationContainer from "./routes/Router";

function App() {
  const [user, setUser] = React.useState("");

  function authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  }

  React.useEffect(() => {
    authListener();
    return () => {};
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
