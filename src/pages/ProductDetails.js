import React from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import { FiShoppingBag, FiLock, FiUnlock } from "react-icons/fi";
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
    <Container>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Paper className={classes.paper2}>
            <Typography variant="h5" className="d-flex justify-content-center">
              {currentProduct.productName}
            </Typography>
          </Paper>
        </Grid>

        <Grid container item xs spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            direction="column"
            style={{
              backgroundColor: "#d1f2eb",
            }}
          >
            <div className={classes.detailsImage}>
              <img
                className={classes.detailsImgFit}
                alt={currentProduct.productName}
                src={currentProduct.image}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Grid item>
              <Chip
                label={currentProduct.category}
                size="small"
                color="secondary"
              />
              <Chip label="View vendor" size="small" color="secondary" />
            </Grid>
            <Typography variant="subtitle2" gutterBottom>
              {currentProduct.oldPrice !== undefined ? (
                <span className="mr-1">
                  <del>$200</del>
                </span>
              ) : (
                <span className="mr-1"></span>
              )}
            </Typography>
            <Typography variant="subtitle2">K{currentProduct.price}</Typography>
            <Typography>Description</Typography>
            <Typography gutterBottom>{currentProduct.desc}</Typography>

            <Grid className="d-flex justify-content-between">
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
              >
                <Button>
                  <FiShoppingBag
                    size={20}
                    onClick={() => {
                      Operations.shared.toggleCart(
                        currentProduct,
                        cart,
                        dispatch
                      );
                    }}
                  />
                </Button>

                <Button
                  onClick={() =>
                    Operations.shared.reserveProduct(currentProduct, reserved)
                  }
                >
                  {currentProduct.isReserved === undefined || false ? (
                    <FiLock size={20} />
                  ) : (
                    <FiLock size={20} />
                  )}
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr />
      <Grid item xs={12} className="text-center">
        <Typography variant="h6" className="my-4 h3">
          Additional information{" "}
        </Typography>
        <Typography variant="body5"> {currentProduct.extraInfo}</Typography>
      </Grid>
      <main>
        <MDBRow className="row d-flex justify-content-center wow fadeIn">
          <MDBCol>
            <h4></h4>
            <p></p>
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
                    <div className={classes.image2}>
                      <img
                        className={classes.imgFit}
                        alt="complex"
                        src={item.image}
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
        </MDBRow>

        {/* REVIEWS */}
      </main>
    </Container>
  );
}

export default ProductDetails;
