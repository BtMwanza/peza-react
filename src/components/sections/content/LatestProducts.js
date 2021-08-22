import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

import { selectCart } from "./../../../redux/reducers/CartSlice";
import { selectProducts } from "./../../../redux/reducers/ProductSlice";
import useStyles from "./../../../css/style";
import "./../../../css/App.css";
import { setCurrentProduct, setSimilarProducts } from "./../../../redux";

function LatestProducts() {
  const cart = useSelector(selectCart);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { recentProducts } = useSelector(selectProducts);

  return (
    <Container>
      <Grid
        container
        spacing={4}
        style={{ marginBottom: 20 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h4"
            className="h2 text-center mb-4"
          >
            RECENT PRODUCTS
          </Typography>
        </Grid>

        {recentProducts.map((item, index) => {
          const { image, productName, price, category, year } = item;
          return (
            <Grid item xs={12} md={3} sm={12} lg={3}>
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
                    <img className={classes.imgFit} alt="complex" src={image} />
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
                  ></Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default LatestProducts;
