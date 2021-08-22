import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import useStyles from "./../css/style";
import "./../css/App.css";
import { selectCart } from "./../redux/reducers/CartSlice";
import { selectProducts } from "./../redux/reducers/ProductSlice";
import {
  Header,
  Footer,
  LatestProducts,
  PopularProducts,
} from "./../components";

function Explore() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div>
      <Header />

      <Container>
        <LatestProducts />
        <PopularProducts />
      </Container>
      <Footer />
    </div>
  );
}

export default Explore;
