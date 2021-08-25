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
import { FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";

import { selectCart } from "./../redux/reducers/CartSlice";
import { fetchMerchant } from "./../redux/reducers/MerchantSlice";
import { fetchCurrentUser, selectAuth } from "./../redux/reducers/AuthSlice";
import Operations from "./../components/functions/operations";
import useStyles from "./../css/style";
import "./../css/App.css";
import { setMerchantID, setCurrentProduct } from "./../redux";
import { Footer, Products, Reviews } from "./../components";
import FlutterwaveBtn from "./../lib/flutterwave";

function Checkout() {
  const classes = useStyles();
  const cart = useSelector(selectCart);
  const total = Operations.shared.getTotal(cart);
  const delivery = 0;
  return (
    <>
      <Container className={classes.container}>
        <NoSsr>
          <GoogleFontLoader fonts={[{ font: "Ubuntu", weights: [400, 700] }]} />
        </NoSsr>
        <Grid container spacing={0}>
          {/* Column 1 */}
          <Grid item xs className="checkout-left">
            <Grid xs={12}>
              <Typography variant="h6" className="text-center">
                Summary
              </Typography>
            </Grid>

            <Grid className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 checkout-left">
              <Typography>Subtotal</Typography>
              <Typography>K{total}</Typography>
            </Grid>
            <Grid className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 checkout-left">
              <Typography>Delivery</Typography>
              <Typography>K{delivery.toFixed(2)}</Typography>
            </Grid>
            <Grid className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 checkout-left">
              <Typography>{cart.length} Items in cart</Typography>
              <Typography>
                {moment(new Date().getTime()).format("ll")}
              </Typography>
            </Grid>
            <hr />
            {cart.map((item) => {
              const { productName, productID, price } = item;
              return (
                <Grid
                  key={productID}
                  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 checkout-left"
                >
                  <Typography variant="subtitle2">{productName}</Typography>
                  <Typography variant="subtitle2">
                    K{price.toFixed(2)}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>

          {/* Column 2 */}
          <Grid alignItems xs>
            <Grid xs={12}>
              <Typography variant="h6" className="text-center">
                Billing
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Paper className={classes.paper2}>
                <Formik
                  initialValues={{
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    address: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
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
                    <Form onSubmit={handleSubmit}>
                      <div class="form mb-3">
                        <TextField
                          label="Full name"
                          id="fullName"
                          size="small"
                          fullWidth
                          type="name"
                          name="fullName"
                          helperText={
                            errors.fullName &&
                            touched.fullName &&
                            errors.fullName
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fullName}
                        />
                      </div>

                      <div class="form mb-3">
                        <TextField
                          label="Email"
                          id="email"
                          size="small"
                          fullWidth
                          type="email"
                          name="email"
                          helperText={
                            errors.email && touched.email && errors.email
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                      </div>

                      <div class="form mb-3">
                        <TextField
                          label="phoneNumber"
                          id="phoneNumber"
                          size="small"
                          fullWidth
                          type="phoneNumber"
                          name="phoneNumber"
                          helperText={
                            errors.phoneNumber &&
                            touched.phoneNumber &&
                            errors.phoneNumber
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                        />
                      </div>

                      <div class="form mb-3">
                        <TextField
                          label="Address"
                          id="address"
                          size="small"
                          fullWidth
                          type="address"
                          name="address"
                          helperText={
                            errors.address && touched.address && errors.address
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                        />
                      </div>

                      {/* <Button
                        type="submit"
                        class="btn btn-primary btn-block mb-4"
                        disabled={!isSubmitting}
                        onClick={() => {
                          Operations.shared.signIn(
                            values.email,
                            values.phoneNumber
                          );
                        }}
                      >
                        Sign in
                      </Button> */}
                      <FlutterwaveBtn />
                    </Form>
                  )}
                </Formik>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Checkout;
