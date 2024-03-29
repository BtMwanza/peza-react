import React from "react";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStyles from "./../css/style";
import { fetchData, setAmounts, setUser, setAuthState } from "./../redux";
import {
  fetchPopularProducts,
  fetchRecentProducts,
  fetchTransactions,
} from "./../redux/reducers/ProductSlice";
import { fetchMerchants } from "./../redux/reducers/MerchantSlice";
import { Footer, Products } from "./../components";

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const db = firebase.firestore().collection("PRODUCTS");
  const [isLoading, setIsLoading] = React.useState(true);
  const userID = getUserID();
  function onAuthStateChanged(user) {
    if (user !== null) {
      dispatch(setAuthState(true));
    }
    console.log("USER: ", user);
  }

  function getUserID() {
    if (firebase.auth().currentUser !== null) {
      return firebase.auth().currentUser.uid;
    } else {
      return "";
    }
  }

  React.useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    dispatch(fetchRecentProducts());
    dispatch(fetchTransactions());
    dispatch(fetchPopularProducts());
    dispatch(fetchMerchants());
    getUserID();
    console.log("GET USER: ", userID);

    const productsListener = db
      .where("isReserved" || "isSold", "!=", true)
      .onSnapshot((snapshot) => {
        const productList = snapshot.docs.map((doc) => {
          const data = {
            productID: doc.id,
            currentQuantity: parseInt(doc.data().currentQuantity),
            merchantID: doc.data().vendor,
            productName: doc.data().productName,
            image: doc.data().image,
            price: doc.data().price,
            desc: doc.data().desc,
            category: doc.data().category,
            createdAt: doc.data().createdAt,
            isSold: doc.data().isSold,
            isReserved: doc.data().isReserved,
            productCode: doc.data().productCode,
            brand: doc.data().brand,
            vin: doc.data().VIN,
            year: doc.data().year,
            make: doc.data().make,
            model: doc.data().model,
            extraInfo: doc.data().extraInfo,
            isAddedToCart: false,
          };
          return data;
        });
        dispatch(fetchData(productList));
      });

    const productsAmounts = db
      .where("isReserved" || "isSold", "!=", true)
      .onSnapshot((snapshot) => {
        const productList = snapshot.docs.map((doc) => {
          const data = {
            price: doc.data().price,
          };
          return data;
        });
        dispatch(setAmounts(productList));
      });

    const userListener = firebase
      .firestore()
      .collection("USERS")
      .where("userID", "==", userID)
      .onSnapshot((snapshot) => {
        console.log("ID: ", userID);
        const fbUser = snapshot.docs.map((doc) => {
          const data = {
            key: doc.data().userID,
            displayName: doc.data().displayName,
            email: doc.data().email,
            avatar: doc.data().avatar,
            phoneNumber: doc.data().phoneNumber,
          };
          return data;
        });
        dispatch(setUser(fbUser));
        setIsLoading(false);
      });

    // Stop listening for updates whenever the component unmounts
    return () => {
      subscriber();
      productsListener();
      productsAmounts();
      userListener();
    };
  }, []);

  if (isLoading === true) {
    return (
      <Container className={classes.container}>
        <div className={classes.initialRoot}>
          <CircularProgress />
        </div>
      </Container>
    );
  } else {
    return (
      <div>
        <Container className={classes.container}>
          <Products />
        </Container>

        <Footer />
      </div>
    );
  }
}

export default Home;
