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
    <div class="tab-content">
      <div
        class="tab-pane fade show active"
        id="pills-register"
        role="tabpanel"
        aria-labelledby="tab-register"
      >
        <form>
          <div class="text-center mb-3">
            <p>Sign up with:</p>
            <button type="button" class="btn btn-primary btn-floating mx-1">
              <i class="fab fa-google"></i>
            </button>
          </div>

          <p class="text-center">or:</p>

          <div class="form-outline mb-4">
            <input
              type="text"
              name="userName"
              id="registerName"
              class="form-control"
              onChange={(event) => onChangeHandler(event)}
            />
            <label class="form-label" for="registerUserName">
              User name
            </label>
          </div>

          <div class="form-outline mb-4">
            <input
              type="email"
              name="email"
              id="registerEmail"
              class="form-control"
              onChange={(event) => onChangeHandler(event)}
            />
            <label class="form-label" for="registerEmail">
              Email
            </label>
          </div>

          <div class="form-outline mb-4">
            <input
              type="number"
              name="phoneNumber"
              id="registerPhoneNumber"
              class="form-control"
              onChange={(event) => onChangeHandler(event)}
            />
            <label class="form-label" for="registerPhoneNumber">
              Phone number
            </label>
          </div>

          <div class="form-outline mb-4">
            <input
              type="password"
              name="password"
              id="registerPassword"
              class="form-control"
              onChange={(event) => onChangeHandler(event)}
            />
            <label class="form-label" for="registerPassword">
              Password
            </label>
          </div>

          <div class="form-outline mb-4">
            <input
              type="password"
              name="repeatPassword"
              id="registerRepeatPassword"
              class="form-control"
              onChange={(event) => onChangeHandler(event)}
            />
            <label class="form-label" for="registerRepeatPassword">
              Comfirm password
            </label>
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
            class="btn btn-primary btn-block mb-3"
            onClick={() =>
              Operations.shared.signUp(
                data.displayName,
                data.email,
                data.phoneNumber,
                data.password
              )
            }
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
