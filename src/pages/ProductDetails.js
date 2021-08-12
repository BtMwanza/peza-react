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
  const { currentProduct, products } = useSelector(selectProducts);
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
    <main>
      {/* <MDBRow>
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
              <div className="lead">
                {currentProduct.oldPrice !== undefined ? (
                  <span className="mr-1">
                    <del>$200</del>
                  </span>
                ) : (
                  <span className="mr-1"></span>
                )}
                <h4>K{currentProduct.price}</h4>
              </div>
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
        <hr />
        <MDBRow>
          <h4 className="d-flex my-4 h4 text-center">Similar Products</h4>
          {products.map((item, index) => {
            return (
              <MDBCol className="col-lg-2 col-md-3 col-sm-2 col-xs-2 mb-3">
                <MDBCard
                  className="card shadow hover-zoom"
                  style={{ maxWidth: "160px", backgroundColor: "#e9f7ef" }}
                  onClick={() => dispatch(setCurrentProduct(item))}
                >
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
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            );
          })}
        </MDBRow> */}

      {/* REVIEWS */}
      <MDBRow>
        <MDBCol>
          <section id="section-comments" className="mb-4">
            <div className="text-center font-weight-bold">
              <span>4</span> comments
            </div>

            <div className="media d-block d-md-flex mt-4">
              <img
                className="img-fluid img"
                className={classes.img}
                src="https://mdbootstrap.com/img/Photos/Avatars/img (20).jpg"
                alt="Generic placeholder image"
              />
              <div className="media-body text-center text-md-left ml-md-3 ml-0">
                <p className="font-weight-bold my-0">
                  Miley Steward
                  <a href="" className="pull-right ml-1">
                    <i className="fas fa-reply"></i>
                  </a>
                </p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
                <div className="media d-block d-md-flex mt-4">
                  <img
                    className="img-fluid img"
                    className={classes.img}
                    src="https://mdbootstrap.com/img/Photos/Avatars/img (27).jpg"
                    alt="Generic placeholder image"
                  />
                  <div className="media-body text-center text-md-left ml-md-3 ml-0">
                    <p className="font-weight-bold my-0">
                      Tommy Smith
                      <a href="" className="pull-right ml-1">
                        <i className="fas fa-reply"></i>
                      </a>
                    </p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                  </div>
                </div>
                <div className="form-group mt-4">
                  <label for="quickReplyFormComment">Your comment</label>
                  <textarea
                    className="form-control"
                    id="quickReplyFormComment"
                    rows="5"
                  ></textarea>

                  <div className="text-center my-4">
                    <button className="btn btn-info btn-sm" type="submit">
                      Post
                    </button>
                  </div>
                </div>
                <div className="media d-block d-md-flex mt-3">
                  <img
                    className="img-fluid img"
                    className={classes.img}
                    src="https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg"
                    alt="Generic placeholder image"
                  />
                  <div className="media-body text-center text-md-left ml-md-3 ml-0">
                    <p className="font-weight-bold my-0">
                      Sylvester the Cat
                      <a href="" className="pull-right ml-1">
                        <i className="fas fa-reply"></i>
                      </a>
                    </p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit, sed quia non numquam eius
                    modi tempora incidunt ut labore et dolore magnam aliquam
                    quaerat voluptatem.
                  </div>
                </div>
              </div>
            </div>
            <div className="media d-block d-md-flex mt-3">
              <img
                className="img-fluid img"
                className={classes.img}
                src="https://mdbootstrap.com/img/Photos/Avatars/img (30).jpg"
                alt="Generic placeholder image"
              />
              <div className="media-body text-center text-md-left ml-md-3 ml-0">
                <p className="font-weight-bold my-0">
                  Caroline Horwitz
                  <a href="" className="pull-right ml-1">
                    <i className="fas fa-reply"></i>
                  </a>
                </p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa officia deserunt mollitia
                animi, id est laborum et dolorum fuga.
              </div>
            </div>
          </section>
        </MDBCol>
      </MDBRow>
    </main>
  );
}

export default ProductDetails;
