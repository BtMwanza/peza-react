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
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import firebase from "firebase/app";
import { Formik, Form, Field, ErrorMessage } from "formik";

import useStyles from "./../css/style";
import "./../css/App.css";
import Operations from "../components/functions/operations";
import Fire from "./../lib/firebaseConfig";

function SignUp() {
  const [data, setData] = React.useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    password: "",
    comfirmPassword: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userName") {
      setData({ ...data, displayName: value });
    } else if (name === "email") {
      setData({ ...data, email: value });
    } else if (name === "phoneNumber") {
      setData({ ...data, phoneNumber: value });
    } else if (name === "password") {
      setData({ ...data, password: value });
    } else if (name === "repeatPassword") {
      setData({ ...data, comfirmPassword: value });
    }
  };

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6} sm={12}>
          <Formik
            initialValues={{
              email: "",
              username: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
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
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div class="text-center mb-3">
                  <p>Sign up with:</p>
                  <button
                    type="button"
                    class="btn btn-primary btn-floating mx-1"
                  >
                    <i class="fab fa-google"></i>
                  </button>
                </div>

                <p class="text-center">or:</p>

                <div class="form-outline mb-3">
                  <TextField
                    label="Email"
                    id="filled-size-small"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && errors.email}
                </div>

                <div class="form-outline mb-3">
                  <TextField
                    label="User name"
                    id="filled-size-small"
                    size="small"
                    fullWidth
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  {errors.username && touched.username && errors.username}
                </div>

                <div class="form-outline mb-3">
                  <TextField
                    label="Phone number"
                    id="filled-size-small"
                    size="small"
                    fullWidth
                    type="number"
                    name="phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                  />
                  {errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber}
                </div>

                <div class="form-outline mb-3">
                  <TextField
                    label="Password"
                    id="filled-size-small"
                    size="small"
                    fullWidth
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />

                  {errors.password && touched.password && errors.password}
                </div>

                <div class="form-outline mb-3">
                  <TextField
                    label="Confirm Password"
                    id="filled-size-small"
                    size="small"
                    fullWidth
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />

                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </div>

                <div class="form-check d-flex justify-content-center mb-4">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="registerCheck"
                    checked
                    aria-describedby="registerCheckHelpText"
                  />
                  <label class="form-check-label" for="registerCheck">
                    I have read and agree to the terms
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  class="btn btn-primary btn-block mb-3"
                  onClick={() =>
                    Operations.shared.signUp(
                      values.username,
                      values.email,
                      values.phoneNumber,
                      values.password
                    )
                  }
                >
                  Sign in
                </button>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;
