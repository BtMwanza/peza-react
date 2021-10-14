import React from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import GoogleFontLoader from "react-google-font-loader";
import NoSsr from "@material-ui/core/NoSsr";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Chip from "@material-ui/core/Chip";
import { FiShoppingBag, FiLock, FiUnlock } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";

import { selectCart } from "../redux/reducers/CartSlice";
import { selectMerchants } from "../redux/reducers/MerchantSlice";
import { selectAuth } from "../redux/reducers/AuthSlice";
import { selectProducts } from "../redux/reducers/ProductSlice";
import Operations from "../components/functions/operations";
import useStyles from "../css/style";
import { Footer, Reviews } from "../components";
import TEMP_AVATAR from "./../assets/img/tempAvatar.jpg";

function MerchantInfo() {
  const { productId } = useParams();
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentMerchantID = useSelector((state) => state.merchants.merchantID);
  const { products } = useSelector(selectProducts);
  const { currentMerchant, merchants } = useSelector(selectMerchants);
  const { currentUser, isLoggedIn } = useSelector(selectAuth);
  const [reviews, setReviews] = React.useState([]);
  const [review, setReview] = React.useState("");
  const reviewer = firebase.auth().currentUser;
  const db = firebase.firestore().collection("PRODUCTS");
  const event = new Date();
  const reviewRef = firebase
    .firestore()
    .collection("REVIEWS")
    .doc(currentMerchantID);
  const numberOfProducts = getNumber();
  const numberSold = productsSold();
  const prodsInStock = inStock();
  const noText = "No Infomation";
  let merchantName = Operations.shared.getMerchantName(
    currentMerchantID,
    merchants
  );

  function getNumber() {
    const items = products.filter(
      ({ merchantID }) => merchantID === currentMerchantID
    );
    return items.length;
  }

  function productsSold() {
    const soldItems = products.filter(
      ({ merchantID, isSold }) =>
        merchantID === currentMerchantID && isSold === true
    );
    return soldItems.length;
  }

  function inStock() {
    let stock = parseInt(numberOfProducts) - parseInt(numberSold);
    return stock;
  }
  // store review in Firestore
  const handleSend = async (review) => {
    const text = review;
    var now = moment(new Date().getTime()).format("lll");
    try {
      reviewRef.collection("REVIEWS").add({
        text,
        createdAt: now,
        user: {
          _id: reviewer.uid,
          email: reviewer.email,
          avatar: reviewer.photoURL,
          displayName: reviewer.displayName,
        },
      });

      await reviewRef.set(
        {
          latestReviews: {
            text,
            createdAt: moment(new Date().getTime()).format("lll"),
            name: merchantName,
            merchantID: currentMerchantID,
            reviewer_id: reviewer.uid,
            reviewer_name: reviewer.displayName,
            reviewer_avatar: reviewer.photoURL,
          },
        },
        { merge: true }
      );
      setReview("");
    } catch (error) {
      alert(error.message);
    }
  };

  // Get reviews
  React.useEffect(() => {
    const reviewsListener = reviewRef
      .collection("REVIEWS")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const reviews = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: moment(new Date().getTime()).format("lll"),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              _id: firebaseData.user._id,
              displayName: firebaseData.user.displayName,
              avatar: firebaseData.user.photoURL,
            };
          }
          return data;
        });
        setReviews(reviews);
      });

    // Stop listening for updates whenever the component unmounts
    return () => reviewsListener();
  }, []);

  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Raleway", weights: [200, 700] }]} />
      </NoSsr>
      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" className="text-center">
              Merchant Information
            </Typography>
            <hr />
          </Grid>
          {currentMerchant.map((item) => {
            const {
              key,
              displayName,
              email,
              phoneNumber,
              avatar,
              address,
              aboutUs,
              delivery,
              deliveryPrices,
            } = item;
            return (
              <>
                <Grid item xs={12} md>
                  {avatar !== null ? (
                    <div className={classes.detailsImage}>
                      <img
                        className={classes.detailsImgFit}
                        alt={displayName}
                        src={TEMP_AVATAR}
                      />
                    </div>
                  ) : (
                    <div className={classes.detailsImage}>
                      <img
                        className={classes.detailsImgFit}
                        alt={displayName}
                        src={avatar}
                      />
                    </div>
                  )}
                </Grid>

                <Grid item xs={12} md>
                  <Typography variant="subtitle1">Name</Typography>
                  <Typography variant="subtitle2">{displayName}</Typography>

                  <hr />
                  <Typography variant="subtitle1">Email</Typography>
                  <Typography variant="subtitle2">{email}</Typography>

                  <hr />
                  <Typography variant="subtitle1">Phone</Typography>
                  <Typography variant="subtitle2">{phoneNumber}</Typography>

                  <hr />
                  <Typography variant="subtitle1">About us</Typography>
                  <Typography variant="subtitle2">{aboutUs}</Typography>

                  <hr />
                  <Typography variant="subtitle1">Address</Typography>
                  <Typography variant="subtitle2">{address}</Typography>
                </Grid>
              </>
            );
          })}

          <Grid item xs={12} md={3}>
            <Paper className={classes.paper2}>
              <Grid
                container
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
              >
                <Typography>Products</Typography>
                <Typography variant="subtitle2">{numberOfProducts}</Typography>
              </Grid>
              <Grid
                container
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
              >
                <Typography>Sold</Typography>
                <Typography variant="subtitle2">{numberSold}</Typography>
              </Grid>
              <Grid
                container
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
              >
                <Typography>In Stock</Typography>
                <Typography variant="subtitle2">{prodsInStock}</Typography>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <hr />
          </Grid>

          {/* REVIEWS */}
          <Grid container item xs={12}>
            <Grid xs={12} className="text-center">
              <Typography variant="h6" className="my-4 h3">
                Reviews
              </Typography>
            </Grid>

            <Grid item xs={12} style={{ marginBottom: 30 }}>
              {isLoggedIn && (
                <Formik
                  initialValues={{ review: "" }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      handleSend(values.review);
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <Form>
                      <div class="form mb-3">
                        <TextField
                          label="Add your review here..."
                          fullWidth
                          multiline
                          maxRows={5}
                          type="text"
                          name="review"
                          helperText={
                            errors.review && touched.review && errors.review
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.review}
                        />
                      </div>

                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={
                          values.review === "" ? !isSubmitting : isSubmitting
                        }
                        onClick={() => {
                          handleSend(values.review);
                        }}
                        style={{ background: "#00675b", marginBottom: 10 }}
                      >
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              )}
            </Grid>

            <Grid xs={12} style={{ marginLeft: 10, marginRight: 10 }}>
              <Reviews reviews={reviews} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default MerchantInfo;
