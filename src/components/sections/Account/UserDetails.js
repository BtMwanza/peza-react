import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";

import useStyles from "../../../css/style";
import "./../../../css/App.css";
import { BUTTONS } from "./../../../shared";
import Operations from "./../../functions/operations";
import { selectAuth } from "./../../../redux/reducers/AuthSlice";
import Fire from "./../../../lib/firebaseConfig";

function UserDetails(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;
  const { currentUser } = useSelector(selectAuth);
  const user = firebase.auth().currentUser;

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container
      className={classes.container}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            My Details
          </Typography>

          <Typography variant="subtitle1">Personal Information</Typography>
          <hr />
        </Grid>

        {currentUser.map((item) => {
          const { key, displayName, email, avatar, phoneNumber } = item;
          return (
            <Grid key={key} container item xs={12}>
              <Grid item xs={12} md={6}>
                <div className={classes.detailsImage}>
                  <img
                    className={classes.detailsImgFit}
                    alt={displayName}
                    src={avatar}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Formik
                  initialValues={{
                    username: displayName,
                    phoneNumber: phoneNumber,
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
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
                      <div class="form-outline mb-3">
                        <TextField
                          label="User name"
                          id="username"
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
                          id="phoneNumber"
                          size="small"
                          fullWidth
                          type="text"
                          name="phoneNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                        />
                        {errors.phoneNumber &&
                          touched.phoneNumber &&
                          errors.phoneNumber}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        class="btn btn-primary mb-3"
                        style={{ backgroundColor: "#00675b" }}
                        onClick={() =>
                          Operations.shared.onChangeUserInfo(
                            values.username,
                            values.phoneNumber
                          )
                        }
                      >
                        {BUTTONS.save}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          );
        })}

        {/* Email information */}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Email Information</Typography>
          <hr />
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              To change your email address, you will have to enter your password
              too, for authentication
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Formik
              initialValues={{
                email: "",
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
                  <div class="form-outline mb-3">
                    <TextField
                      label="Email"
                      id="email"
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
                      label="Password"
                      id="password"
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
                      id="confirmPassword"
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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    class="btn btn-primary mb-3"
                    style={{ backgroundColor: "#00675b" }}
                    onClick={() =>
                      Operations.shared.onChangePassword(
                        values.password,
                        values.confirmPassword
                      )
                    }
                  >
                    {BUTTONS.save}
                  </Button>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>

        {/* Password information */}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Password Information</Typography>
          <hr />
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">
              You can change your password here
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
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
                  <div class="form-outline mb-3">
                    <TextField
                      label="Password"
                      id="password"
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
                      id="confirmPassword"
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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    class="btn btn-primary mb-3"
                    style={{ backgroundColor: "#00675b" }}
                    onClick={() =>
                      Operations.shared.onChangePassword(
                        values.password,
                        values.confirmPassword
                      )
                    }
                  >
                    {BUTTONS.save}
                  </Button>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserDetails;
