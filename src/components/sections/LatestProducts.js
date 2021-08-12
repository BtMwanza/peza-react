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
import {
  filterList,
  searchList,
  fetchData,
  setVendorID,
  setCurrentProduct,
  setSimilarProducts,
} from "./../../redux";
import Pagination from "./Pagination";

function LatestProducts() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const db = firebase.firestore().collection("PRODUCTS");
  const reserveDB = firebase.firestore().collection("RESERVED");
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
    recentProducts,
  } = useSelector(selectProducts);

  return (
    <div>
      <Typography variant="h4" component="h4" className="h2 text-center mb-4">
        RECENT PRODUCTS
      </Typography>
      <div className="col-lg-12">
        <div className="row wow fadeIn">
          {recentProducts.map((item, index) => {
            return (
              <MDBCol className="col-lg-2 col-md-3 col-sm-2 col-xs-2 mb-3">
                <MDBCard
                  key={item.productID}
                  className="card shadow hover-zoom"
                  style={{ maxWidth: "160px", backgroundColor: "#e9f7ef" }}
                  onClick={() => {
                    dispatch(setCurrentProduct(item));
                    dispatch(setSimilarProducts(item.category));
                  }}
                >
                  {/* <div className="reserve-icon-container">
                        <MDBBtn
                          tag="a"
                          color="none"
                          className="reserve-icon"
                          onClick={() => reserveProduct(item)}
                          style={{ color: "#00675b" }}
                        >
                          <FiUnlock size={20} />
                        </MDBBtn>
                      </div> */}
                  <Link to={`/product/${item.productID}`}>
                    <div className={classes.img_box}>
                      <MDBCardImage
                        src={item.image}
                        className="img-fluid img"
                        className={classes.img}
                        alt=""
                      />
                    </div>
                  </Link>

                  <MDBCardBody>
                    <h5 className="title text-center">{item.productName}</h5>

                    <Typography className="text-center">
                      <strong>K{item.price}</strong>
                    </Typography>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LatestProducts;
