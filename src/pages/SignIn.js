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
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import firebase from "firebase/app";
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
  MDBIcon,
  MDBCollapse,
  MDBNavbarToggler,
  MDBNavbar,
  MDBRange,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import useStyles from "./../css/style";
import "./../css/App.css";
import Operations from "../components/functions/operations";
import Fire from "./../lib/firebaseConfig";

function SignIn() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "email") {
      setData({ ...data, email: value });
    } else if (name === "password") {
      setData({ ...data, password: value });
    }
  };

  return (
    <div class="tab-content">
      <div
        class="tab-pane fade show active"
        id="pills-login"
        role="tabpanel"
        aria-labelledby="tab-login"
      >
        <form>
          <div class="text-center mb-3">
            <p>Sign in with:</p>
            <button
              type="button"
              class="btn btn-primary btn-floating mx-1"
              onClick={() => Fire.shared.googleSignIn(data.email)}
            >
              <i class="fab fa-google"></i>
            </button>
          </div>

          <p class="text-center">or:</p>

          <div class="form-outline mb-4">
            <input
              type="email"
              name="email"
              id="loginName"
              class="form-control"
              onChange={(event) => onChangeHandler(event)}
            />
            <label class="form-label" for="loginName">
              Email or username
            </label>
          </div>

          <div class="form-outline mb-4">
            <input
              type="password"
              name="password"
              id="loginPassword"
              class="form-control"
              onChange={(event) => onChangeHandler(event)}
            />
            <label class="form-label" for="loginPassword">
              Password
            </label>
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
                  {" "}
                  Remember me{" "}
                </label>
              </div>
            </div>

            <div class="col-md-6 d-flex justify-content-center">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-block mb-4"
            onClick={() => Operations.shared.signIn(data.email, data.password)}
          >
            Sign in
          </button>

          <div class="text-center">
            <p>
              Not a member? <a href="#!">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
