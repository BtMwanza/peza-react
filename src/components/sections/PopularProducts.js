import React from "react";
import Masonry from "react-masonry-css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useSelector, useDispatch } from "react-redux";
import { FiLock, FiUnlock, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
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

import { selectCart } from "./../../redux/reducers/CartSlice";
import { fetchVendor } from "./../../redux/reducers/VendorSlice";
import { fetchCurrentUser } from "./../../redux/reducers/AuthSlice";
import { selectProducts } from "./../../redux/reducers/ProductSlice";
import Operations from "../functions/operations";
import useStyles from "./../../css/style";
import "./../../css/App.css";
import SideBar from "./SideBar";
import {
  filterList,
  searchList,
  fetchData,
  setVendorID,
  setCurrentProduct,
  setSimilarProducts,
} from "./../../redux";
import Pagination from "./Pagination";

function PopularProducts() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showBasic, setShowBasic] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productPerPage] = React.useState(18);
  var count = 0;
  const event = new Date();
  const [text, setText] = React.useState("");
  const {
    products,
    selectedCategory,
    categories,
    mainList,
    searchText,
    popular,
  } = useSelector(selectProducts);
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="mb-4">
      <Typography variant="h4" component="h4" className="text-center mb-4">
        POPULAR PRODUCTS
      </Typography>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {popular.map((item) => (
          <Paper key={item.product.productID}>
            <Typography className="text-center">
              {item.product.productName}
            </Typography>
            <hr />
            <div className={classes.img_box}>
              <img className={classes.img} src={item.product.image} />
            </div>
            <Typography>{item.desc}</Typography>
          </Paper>
        ))}
      </Masonry>
    </div>
  );
}

export default PopularProducts;
