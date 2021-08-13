import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Masonry from "react-masonry-css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import { FiLock, FiUnlock, FiShoppingBag, FiCreditCard } from "react-icons/fi";

import useStyles from "./../css/style";
import "./../css/App.css";
import { selectCart } from "./../redux/reducers/CartSlice";
import { fetchData, setAmounts } from "./../redux";
import { selectProducts } from "./../redux/reducers/ProductSlice";
import {
  Header,
  Footer,
  LatestProducts,
  PopularProducts,
  SideBar2,
  Categories,
} from "./../components";

function Explore() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products } = useSelector(selectProducts);
  const [data, setData] = React.useState({
    products: [],
  });
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <div>
      <Header />

      <LatestProducts />
      <PopularProducts />

      <Footer />
    </div>
  );
}

export default Explore;
