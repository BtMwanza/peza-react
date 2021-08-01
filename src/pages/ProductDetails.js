import React from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  MDBBadge,
} from "mdb-react-ui-kit";

import { selectCart } from "./../redux/reducers/CartSlice";
import { fetchVendor } from "./../redux/reducers/VendorSlice";
import { fetchCurrentUser } from "./../redux/reducers/AuthSlice";
import { selectProducts } from "./../redux/reducers/ProductSlice";
import Operations from "./../components/functions/operations";
import useStyles from "./../css/style";
import {
  addItem,
  deleteItem,
  setVendorID,
  setCurrentProduct,
} from "./../redux";
import { Header, Footer, SideBar, Products } from "./../components";

function ProductDetails() {
  const { productId } = useParams();
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentProduct } = useSelector(selectProducts);
  const [reserved, setReserved] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const [review, setReview] = React.useState("");
  const reviewer = firebase.auth().currentUser;
  const screenID = currentProduct.productID;
  const db = firebase.firestore().collection("PRODUCTS");
  const reserveDB = firebase.firestore().collection("RESERVED");
  const event = new Date();
  const reviewRef = firebase.firestore().collection("REVIEWS").doc(screenID);
  const [data, setData] = React.useState({
    products: [],
  });

  function reserveProduct() {
    if (reserved === false) {
      db.doc(currentProduct.productID).set(
        { isReserved: true },
        { merge: true }
      );
      reserveDB.doc(currentProduct.productID).set({
        productID: currentProduct.productID,
        image: currentProduct.image,
        price: currentProduct.price,
        productName: currentProduct.productName,
        isReserved: true,
        startDate: Date.now(),
        expiryDate: event.setHours(72),
      });
    } else {
      db.doc(currentProduct.productID).set(
        { isReserved: false },
        { merge: true }
      );
      reserveDB.doc(currentProduct.productID).delete();
    }
  }

  return (
    <main className="mt-5 pt-0">
      <MDBContainer className="container dark-grey-text mt-5">
        <MDBRow>
          <MDBCol className="d-flex justify-content-center">
            <h2>{currentProduct.productName}</h2>
          </MDBCol>
        </MDBRow>
        <MDBRow className="row wow fadeIn">
          <MDBCol className="col-md-6 mb-4">
            <MDBCardImage
              src={currentProduct.image}
              className="img-fluid"
              alt=""
            />
          </MDBCol>
          <MDBCol className="col-md-6 mb-4">
            <MDBCol className="p-4">
              <MDBCol className="mb-4">
                <MDBBadge color="info" className="badge purple ms-1">
                  {currentProduct.category}
                </MDBBadge>

                <MDBBadge color="primary" className="badge blue ms-1">
                  View Vendor
                </MDBBadge>
              </MDBCol>
              <p className="lead">
                {currentProduct.oldPrice !== undefined ? (
                  <span className="mr-1">
                    <del>$200</del>
                  </span>
                ) : (
                  <span className="mr-1"></span>
                )}
                <h4>K{currentProduct.price}</h4>
              </p>
              <p className="lead font-weight-bold">Description</p>
              <p>{currentProduct.desc}</p>
              <MDBCol className="d-flex justify-content-between">
                <MDBBtn
                  className="btn btn-primary btn-md my-0 p ms-1"
                  type="submit"
                  onClick={() => {
                    Operations.shared.toggleCart(
                      currentProduct,
                      cart,
                      dispatch
                    );
                  }}
                >
                  <i className="fas fa-shopping-cart ml-1"></i>
                </MDBBtn>
                <MDBBtn
                  className="btn btn-secondary btn-md my-0 p"
                  type="submit"
                  onClick={() =>
                    Operations.shared.reserveProduct(currentProduct, reserved)
                  }
                >
                  {currentProduct.isReserved === false ? (
                    <i className="fas fa-unlock ml-1"></i>
                  ) : (
                    <i className="fas fa-lock ml-1"></i>
                  )}
                </MDBBtn>
              </MDBCol>
            </MDBCol>
          </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow className="row d-flex justify-content-center wow fadeIn">
          <MDBCol className="col-md-6 text-center">
            <h4 className="my-4 h4">Additional information</h4>
            <p>{currentProduct.extraInfo}</p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </main>
  );
}

export default ProductDetails;
