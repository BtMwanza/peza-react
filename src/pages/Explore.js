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

import useStyles from "./../css/style";
import "./../css/App.css";
import { selectCart } from "./../redux/reducers/CartSlice";
import { fetchData, setAmounts } from "./../redux";
import { selectProducts } from "./../redux/reducers/ProductSlice";
import { Header, Footer, SideBar, Products, Products2 } from "./../components";

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
    <Container>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {products.map((item) => (
          <Paper>
            <Typography>{item.productName}</Typography>
            <hr />
            <div className={classes.img_box}>
              <img className={classes.img} src={item.image} />
            </div>
            <Typography>{item.desc}</Typography>
          </Paper>
        ))}
      </Masonry>
    </Container>
  );
}

export default Explore;
