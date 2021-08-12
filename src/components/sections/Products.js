import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
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
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBCollapse,
  MDBNavbarToggler,
  MDBNavbar,
} from "mdb-react-ui-kit";

import { selectCart } from "./../../redux/reducers/CartSlice";
import { fetchVendor } from "./../../redux/reducers/VendorSlice";
import { fetchCurrentUser } from "./../../redux/reducers/AuthSlice";
import { selectProducts } from "./../../redux/reducers/ProductSlice";
import Operations from "../functions/operations";
import useStyles from "./../../css/style";
import "./../../css/App.css";
import SideBar from "./SideBar";
import Categories from "./Categories";
import {
  filterList,
  searchList,
  setVendorID,
  setCurrentProduct,
  setSimilarProducts,
} from "./../../redux";
import Pagination from "./Pagination";

function Products() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const db = firebase.firestore().collection("PRODUCTS");
  const [showBasic, setShowBasic] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productPerPage] = React.useState(18);
  const [text, setText] = React.useState("");
  const {
    products,
    selectedCategory,
    categories,
    mainList,
    searchText,
    commerceProducts,
  } = useSelector(selectProducts);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = commerceProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <div>
        <MDBNavbar expand="lg" light bgColor="light" className="mt-3 mb-5">
          <span className="navbar-brand">Categories:</span>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <ul className="navbar-nav mr-auto">
              {categories.map((item, index) => {
                return (
                  <li
                    className="nav-item"
                    style={{
                      opacity: index === selectedCategory ? 1 : 0.5,
                      fontWeight: 500,
                      fontSize: 13,
                    }}
                  >
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => {
                        dispatch(filterList(index));
                        setShowBasic(!showBasic);
                      }}
                    >
                      {item.category}
                    </a>
                  </li>
                );
              })}
            </ul>

            <form className="form-inline">
              <div className="md-form my-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  name="searchInput"
                  placeholder="Search"
                  aria-label="Search"
                  value={text}
                  onChange={(event) => onChangeHandler(event)}
                />
              </div>
            </form>
          </MDBCollapse>
        </MDBNavbar>

        <MDBRow>
          <SideBar />

          <section className="col-lg-9">
            <div className="row wow fadeIn">
              {currentProducts.map((item, index) => {
                const { name, media, price, id, categories } = item;
                return (
                  <MDBCol className="col-lg-3 col-md-4 col-sm-6 col-xs-6 mb-3">
                    <MDBCard
                      key={item}
                      className="card shadow hover-zoom"
                      style={{ maxWidth: "160px", backgroundColor: "#e9f7ef" }}
                      onClick={() => {
                        dispatch(setCurrentProduct(item));
                        dispatch(setSimilarProducts(categories.name));
                        /* dispatch(setVendorID(vendorID));
                        dispatch(fetchVendor(vendorID)); */
                      }}
                    >
                      <Link to={`/product/${item.productID}`}>
                        <div className={classes.img_box}>
                          <MDBCardImage
                            src={media.source}
                            className="img-fluid img"
                            className={classes.img}
                            alt=""
                          />
                        </div>
                      </Link>

                      <MDBCardBody>
                        <Typography variant="subtitle2" className="title">
                          {name}
                        </Typography>
                        <div className="bottom-details">
                          <div className="product-price">
                            <Typography variant="subtitle2">
                              {price.formatted_with_symbol}
                            </Typography>
                          </div>

                          <MDBBtn
                            className="shopping-cart"
                            tag="a"
                            color="none"
                            style={{ color: "#00675b" }}
                            onClick={() =>
                              Operations.shared.toggleCart(item, cart, dispatch)
                            }
                          >
                            <FiShoppingBag size={20} />
                          </MDBBtn>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                );
              })}
            </div>
          </section>
        </MDBRow>

        <Pagination
          productsPerPage={productPerPage}
          totalProducts={commerceProducts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
}

export default Products;
