import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiLock, FiUnlock, FiShoppingBag, FiCreditCard } from "react-icons/fi";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
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

import { deleteItem, selectCart } from "./../redux/reducers/CartSlice";
import { fetchCurrentUser } from "./../redux/reducers/AuthSlice";
import useStyles from "./../css/style";
import "./../css/App.css";
import Operations from "../components/functions/operations";
import {
  filterList,
  searchList,
  fetchData,
  setVendorID,
  setCurrentProduct,
} from "./../redux";
import { selectProducts } from "./../redux/reducers/ProductSlice";
import { selectSellers } from "./../redux/reducers/VendorSlice";
import { Header, Footer, SideBar, Products } from "./../components";

function ReservedProduct() {
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
  const breakpointColumnsObj = {
    default: 6,
    1100: 3,
    700: 2,
    500: 2,
  };

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

  return (
    <main>
      <Container className="container">
        <MDBRow>
          <section className="col-lg-12">
            <div
              className="row wow fadeIn"
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {products.map((item) => (
                  <Card>
                    <h6 className="text-center">{item.productName}</h6>
                    <hr />
                    <div className={classes.img_box}>
                      <img className={classes.img} src={item.image} />
                    </div>
                    <hr style={{ color: "transparent" }} />
                    <h6 className="text-center">K{item.price.toFixed(2)}</h6>
                    <CardActions
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <IconButton>
                        <FiUnlock color="#00675b" size={20} />
                      </IconButton>
                      <IconButton>
                        <FiCreditCard color="#00675b" size={20} />
                      </IconButton>
                      <IconButton>
                        <FiShoppingBag color="#00675b" size={20} />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </Masonry>
            </div>
          </section>
        </MDBRow>

        {/* <!--Pagination--> */}
        <nav className="d-flex justify-content-center wow fadeIn">
          <ul className="pagination pg-blue">
            {/* <!--Arrow left--> */}
            <li className="page-item disabled">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>

            <li className="page-item active">
              <a className="page-link" href="#">
                1<span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                5
              </a>
            </li>

            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
        {/* <!--Pagination--> */}
      </Container>
    </main>
  );
}

export default ReservedProduct;
