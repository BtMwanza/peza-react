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
  MDBBtn,
  MDBBtnGroup,
  MDBIcon,
  MDBCheckbox,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import { SignIn, SignUp } from "./../pages";

function Auth() {
  const [basicActive, setBasicActive] = React.useState("login");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  return (
    <Container>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <MDBTabs
            pills
            className="mb-12"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleBasicClick("login")}
                active={basicActive === "login"}
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleBasicClick("register")}
                active={basicActive === "register"}
              >
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </Grid>

        <Grid
          item
          xs
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <MDBTabsContent>
            <MDBTabsPane show={basicActive === "login"}>
              <SignIn />
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === "register"}>
              <SignUp />
            </MDBTabsPane>
          </MDBTabsContent>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Auth;
