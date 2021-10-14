import React from "react";
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

import { selectCart } from "./../redux/reducers/CartSlice";
import { selectMerchants } from "./../redux/reducers/MerchantSlice";
import { selectAuth } from "./../redux/reducers/AuthSlice";
import { selectProducts } from "./../redux/reducers/ProductSlice";
import Operations from "./../components/functions/operations";
import useStyles from "./../css/style";
import { setMerchantID } from "./../redux";
import { Footer, Reviews } from "./../components";

function ProductDetails(props) {
  const { history } = props;
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentProduct } = useSelector(selectProducts);
  const { merchants } = useSelector(selectMerchants);
  const { currentUser, isLoggedIn } = useSelector(selectAuth);
  const [reserved, setReserved] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const [review, setReview] = React.useState("");
  const reviewer = firebase.auth().currentUser;
  const screenID = currentProduct.productID;
  const db = firebase.firestore().collection("PRODUCTS");
  const reserveDB = firebase.firestore().collection("RESERVED");
  const event = new Date();
  const reviewRef = firebase.firestore().collection("REVIEWS").doc(screenID);
  let merchantName = Operations.shared.getMerchantName(
    currentProduct.merchantID,
    merchants
  );

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
            name: currentProduct.productName,
            productID: screenID,
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
    <section>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Raleway", weights: [200, 700] }]} />
      </NoSsr>
      <Container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Paper className={classes.paper2} elevation={0}>
              <Typography
                variant="h5"
                className="d-flex justify-content-center"
              >
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
              <Grid item xs={12}>
                <Chip
                  label={currentProduct.category}
                  size="small"
                  color="primary"
                  style={{ marginRight: 2 }}
                />
                {currentProduct !== undefined ? (
                  <span></span>
                ) : (
                  <Chip
                    label={currentProduct.make}
                    size="small"
                    color="primary"
                    style={{ marginRight: 2 }}
                  />
                )}
                {currentProduct !== undefined ? (
                  <span></span>
                ) : (
                  <Chip
                    label={currentProduct.model}
                    size="small"
                    color="primary"
                    style={{ marginRight: 2 }}
                  />
                )}

                <Chip
                  label={merchantName}
                  size="small"
                  color="secondary"
                  style={{ marginRight: 2 }}
                  onClick={() => {
                    dispatch(setMerchantID(currentProduct.merchantID));
                    history.push(`/merchant/${currentProduct.merchantID}`);
                  }}
                />
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
              <Typography variant="subtitle2">
                K{currentProduct.price}
              </Typography>
              <Typography style={{ fontFamily: "Raleway", fontWeight: "bold" }}>
                Description
              </Typography>
              <Typography gutterBottom>{currentProduct.desc}</Typography>

              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  className="my-1"
                  style={{ fontFamily: "Raleway", fontWeight: "bold" }}
                >
                  Additional information
                </Typography>
                <Typography gutterBottom>{currentProduct.extraInfo}</Typography>
              </Grid>

              <Grid item xs={12}>
                {currentProduct.make === "" ? (
                  <span></span>
                ) : (
                  <Chip
                    label={currentProduct.make}
                    size="small"
                    color="primary"
                    style={{ marginRight: 2 }}
                  />
                )}
                {currentProduct.model === "" ? (
                  <span></span>
                ) : (
                  <Chip
                    label={currentProduct.model}
                    size="small"
                    color="primary"
                    style={{ marginRight: 2 }}
                  />
                )}
              </Grid>
              <hr />

              <Grid item className="d-flex justify-content-between">
                <ButtonGroup
                  variant="text"
                  color="primary"
                  aria-label="text primary button group"
                >
                  <Button
                    onClick={() => {
                      Operations.shared.toggleCart(
                        currentProduct,
                        cart,
                        dispatch
                      );
                    }}
                  >
                    Add to cart
                    <FiShoppingBag size={20} />
                  </Button>

                  {currentProduct.isReserved !== undefined || false ? (
                    <Button
                      disabled={currentUser === [] ? true : false}
                      onClick={() =>
                        Operations.shared.reserveProduct(
                          currentProduct,
                          reserved
                        )
                      }
                    >
                      Reserve item
                      <FiUnlock size={20} />
                    </Button>
                  ) : (
                    <Button
                      disabled={currentUser === [] ? true : false}
                      onClick={() =>
                        Operations.shared.reserveProduct(
                          currentProduct,
                          reserved
                        )
                      }
                    >
                      Unreserve item
                      <FiLock size={20} />
                    </Button>
                  )}
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <hr />

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
      </Container>
      <Footer />
    </section>
  );
}

export default ProductDetails;
