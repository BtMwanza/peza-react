import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import firebase from "firebase/app";

import { selectCart } from "./../redux/reducers/CartSlice";
import { fetchCurrentUser } from "./../redux/reducers/AuthSlice";
import useStyles from "./../css/style";
import { fetchData, setAmounts } from "./../redux";
import {
  selectProducts,
  fetchPopularProducts,
  fetchRecentProducts,
  fetchTransactions,
  fetchProducts,
} from "./../redux/reducers/ProductSlice";
import { fetchVendors } from "./../redux/reducers/VendorSlice";
import { Header, Footer, SideBar, Products, Products2 } from "./../components";

function Home() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products, selectedCategory, categories, mainList } =
    useSelector(selectProducts);
  const db = firebase.firestore().collection("PRODUCTS");
  const [data, setData] = React.useState({
    products: [],
  });

  React.useEffect(() => {
    dispatch(fetchRecentProducts());
    dispatch(fetchProducts());
    dispatch(fetchTransactions());
    dispatch(fetchPopularProducts());
    dispatch(fetchVendors());

    const productsListener = db
      .where("isReserved" || "isSold", "!=", true)
      .onSnapshot((snapshot) => {
        const productList = snapshot.docs.map((doc) => {
          const data = {
            productID: doc.id,
            currentQuantity: parseInt(doc.data().currentQuantity),
            vendorID: doc.data().vendor,
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
          };
          return data;
        });
        setData({ ...data, products: productList });
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

    // Stop listening for updates whenever the component unmounts
    return () => {
      productsListener();
      productsAmounts();
    };
  }, []);

  return (
    <div>
      <Container>
        <Products2 />
      </Container>

      <Footer />
    </div>
  );
}

export default Home;
