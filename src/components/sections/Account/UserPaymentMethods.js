import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

import useStyles from "./../../../css/style";
import "./../../../css/App.css";

function UserPaymentMethods(props) {
  const { children, value, index, ...other } = props;
  return (
    <Container
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Grid container>
        <Grid item>
          <Typography variant="h5">My Payment Details</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserPaymentMethods;
