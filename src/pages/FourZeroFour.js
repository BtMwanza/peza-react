import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import IMAGE404 from "./../assets/img/404.png";
import useStyles from "./../css/style";
import "./../css/App.css";

function FourZeroFour() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          justifyContent="center"
          alignItems="center"
        >
          <img src={IMAGE404} height={250} width={250} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default FourZeroFour;
