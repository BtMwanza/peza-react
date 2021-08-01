import React from "react";
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
import Sidebar from "./SideBar";
import {
  filterList,
  searchList,
  fetchData,
  setVendorID,
  setCurrentProduct,
} from "./../../redux";
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
      <div className="container">
        {/*  Navbar */}
        <MDBNavbar expand="lg" light bgColor="light" className="mt-3 mb-5">
          {/* Navbar brand */}
          <span className="navbar-brand">Categories:</span>

          {/* Collapse button */}
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          {/* Collapsible content */}
          <MDBCollapse navbar show={showBasic}>
            {/* Links */}
            <ul className="navbar-nav mr-auto">
              {categories.map((item, index) => {
                return (
                  <li
                    key={(item) => item.idx.toString()}
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
            {/* Links */}

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

          {/* Collapsible content */}
        </MDBNavbar>
        {/* /.Navbar */}

        <MDBRow>
          <SideBar />

          <section className="col-lg-9">
            <div className="row wow fadeIn">
              {products.map((item, index) => {
                return (
                  <MDBCol className="col-lg-3 col-md-6 col-sm-3 mb-2">
                    <MDBCard
                      className="card shadow hover-zoom"
                      style={{ maxWidth: "160px" }}
                      onClick={() => dispatch(setCurrentProduct(item))}
                    >
                      <div className="reserve-icon-container">
                        <MDBBtn
                          tag="a"
                          color="none"
                          className="reserve-icon"
                          onClick={() => reserveProduct(item)}
                          style={{ color: "#00675b" }}
                        >
                          <FiUnlock size={20} />
                        </MDBBtn>
                      </div>
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
                        <h5 className="title">{item.productName}</h5>
                        <div className="bottom-details">
                          <h6 className="product-price">
                            <strong>K{item.price}</strong>
                          </h6>

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
      </div>
    </main>
  );
}

export default Products;
