import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiLock, FiUnlock, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBBtnGroup,
  MDBIcon,
  MDBCollapse,
  MDBNavbarToggler,
  MDBNavbar,
  MDBRange,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import { selectCart } from "../../redux/reducers/CartSlice";
import { fetchVendor } from "../../redux/reducers/VendorSlice";
import { fetchCurrentUser } from "../../redux/reducers/AuthSlice";
import { selectProducts } from "../../redux/reducers/ProductSlice";
import Operations from "../functions/operations";
import useStyles from "../../css/style";
import "./../../css/App.css";
import Sidebar from "./SideBar";
import {
  filterList,
  searchList,
  fetchData,
  setVendorID,
  setCurrentProduct,
} from "../../redux";
import SideBar from "./SideBar";

function Products() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products, selectedCategory, categories, mainList, searchText } =
    useSelector(selectProducts);
  const db = firebase.firestore().collection("PRODUCTS");
  const reserveDB = firebase.firestore().collection("RESERVED");
  const [showBasic, setShowBasic] = React.useState(false);
  var count = 0;
  const event = new Date();
  const [text, setText] = React.useState("");
  const [spacing, setSpacing] = React.useState(2);

  const reserveProduct = (item) => {
    db.doc(item.productID).set({ isReserved: true }, { merge: true });
    reserveDB.doc(item.productID).set({
      productID: item.productID,
      image: item.image,
      price: item.price,
      productName: item.productName,
      isReserved: true,
      startDate: Date.now(),
      expiryDate: event.setHours(72),
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "searchInput") {
      setText(value);
      dispatch(searchList(value));
      console.log("TEXT: ", value);
    }
  };

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <div className={classes.root2}>
      <Grid container>
        <Grid item xs={12} className="products">
          {products.map((item) => (
            <Card className="product-card">
              <div className={classes.img_box}>
                <img className={classes.img} src={item.image} />
              </div>
              <hr />
              <CardContent>
                <Typography className="title">{item.productName}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Products;
