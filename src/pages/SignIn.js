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
import Operations from "../components/functions/operations";
import Fire from "./../lib/firebaseConfig";

function SignIn() {
  const classes = useStyles();

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6} sm={12}>
          <Paper className={classes.paper2}>
            <Formik
              initialValues={{ email: "", password: "" }}
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
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div class="text-center mb-3">
                    <p>Sign in with:</p>
                    <button
                      type="button"
                      class="btn btn-primary btn-floating mx-1"
                      onClick={() => Fire.shared.googleSignIn(values.email)}
                    >
                      <i class="fab fa-google"></i>
                    </button>
                  </div>

                  <p class="text-center">or:</p>

                  <div class="form mb-3">
                    <TextField
                      label="Email"
                      id="email"
                      size="small"
                      fullWidth
                      type="email"
                      name="email"
                      helperText={errors.email && touched.email && errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>

                  <div class="form mb-3">
                    <TextField
                      label="Password"
                      id="password"
                      size="small"
                      fullWidth
                      type="password"
                      name="password"
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>

                  <div class="row mb-4">
                    <div class="col-md-6 d-flex justify-content-center">
                      <div class="form-check mb-3 mb-md-0">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="loginCheck"
                          checked
                        />
                        <label class="form-check-label" for="loginCheck">
                          Remember me
                        </label>
                      </div>
                    </div>

                    <div class="col-md-6 d-flex justify-content-center">
                      <a href="#!">Forgot password?</a>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    class="btn btn-primary btn-block mb-4"
                    disabled={isSubmitting}
                    onClick={() => {
                      Operations.shared.signIn(values.email, values.password);
                    }}
                  >
                    Sign in
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

export default SignIn;
