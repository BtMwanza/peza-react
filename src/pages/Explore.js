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
      {/* <Header /> */}

      {/* <LatestProducts />
        <PopularProducts /> */}
      <div className={classes.root2}>
        <Grid className={classes.paper2}>
          <Grid container spacing={5}>
            <Grid item xs={12} spacing={2}>
              <Categories />
            </Grid>

            <Grid item xs={12} md={3} sm={6}>
              <Paper>
                <SideBar2 />
              </Paper>
            </Grid>

            <Grid container item xs={12} sm={9} md={9} spacing={3}>
              {products.map((item) => {
                const { image, productName, price, category, year } = item;
                return (
                  <Grid item xs={6} md={3} sm={6} lg={3}>
                    <Paper className="card-background shadow hover-zoom">
                      <Grid
                        item
                        xs
                        direction="column"
                        style={{
                          backgroundColor: "#d1f2eb",
                          minHeight: 210,
                        }}
                      >
                        <div className={classes.image2}>
                          <img
                            className={classes.imgFit}
                            alt="complex"
                            src={image}
                          />
                        </div>
                        {year !== "" ? (
                          <Chip label={year} size="small" color="secondary" />
                        ) : (
                          <div></div>
                        )}
                      </Grid>

                      <Grid item xs container direction="column">
                        <Grid item xs className={classes.detailsGrid}>
                          <Typography variant="subtitle2" className="title">
                            {productName}
                          </Typography>
                          <Typography variant="caption">{category}</Typography>
                          <Typography variant="subtitle2" gutterBottom>
                            K{price}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          style={{
                            backgroundColor: "#bfc9ca",
                          }}
                        >
                          {/* <CardActions style={{}}>
                            <IconButton>
                              <FiUnlock color="#00675b" size={20} />
                            </IconButton>
                            <IconButton>
                              <FiCreditCard color="#00675b" size={20} />
                            </IconButton>
                            <IconButton>
                              <FiShoppingBag color="#00675b" size={20} />
                            </IconButton>
                          </CardActions> */}
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
