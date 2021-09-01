import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import useStyles from "./../css/style";
import "./../css/App.css";
import { BUTTONS } from "./../shared";
import Operations from "../components/functions/operations";

function SignUp() {
  const classes = useStyles();
  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6} sm={12}>
          <Paper className={classes.paper2}>
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
                <Form onSubmit={handleSubmit}>
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

                  <Button
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
                    {BUTTONS.login}
                  </Button>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;
