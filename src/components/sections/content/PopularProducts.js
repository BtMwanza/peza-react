import React from "react";
import Masonry from "react-masonry-css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectProducts } from "../../../redux/reducers/ProductSlice";
import useStyles from "../../../css/style";
import "../../../css/App.css";
import { setCurrentProduct, setSimilarProducts } from "../../../redux";

function PopularProducts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { popular } = useSelector(selectProducts);
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" component="h4" className="text-center mb-4">
            POPULAR PRODUCTS
          </Typography>
        </Grid>
      </Grid>
      <div className="mb-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {popular.map((item) => {
            const { product } = item;
            return (
              <Paper className="shadow hover-zoom" key={product.productID}>
                <Grid>
                  <Typography
                    variant="subtitle2"
                    className="text-center"
                    gutterBottom
                  >
                    {product.productName}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs
                  direction="column"
                  style={{
                    backgroundColor: "#d1f2eb",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className={classes.img_box}>
                    <img className={classes.img} src={product.image} />
                  </div>
                </Grid>
              </Paper>
            );
          })}
        </Masonry>
      </div>
    </Container>
  );
}

export default PopularProducts;
